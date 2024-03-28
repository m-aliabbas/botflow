import requests
import json
from fastapi import FastAPI, HTTPException, Response, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from fastapi.responses import FileResponse
from datetime import datetime
from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from bson import ObjectId
import bson
from typing import List
from GetCustomJson import GetCustomJson
app = FastAPI()
from utils.utils import *
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional
from fastapi.encoders import jsonable_encoder
import pymongo
import uuid

mongo_url = 'mongodb://localhost:27017'
db_name = 'botflow_tool'
client = MongoClient(mongo_url)
db = client[db_name]

# Enable CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not bson.objectid.ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls) -> dict:
        schema = super().__get_pydantic_json_schema__()
        schema.update({
            # modifications
        })
        return schema

class Flow(BaseModel):
    flowId: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    nodes: list
    edges: list

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: lambda oid: str(oid),
        }

class ClassItem(BaseModel):
    text: str


class StateNode(BaseModel):
    text: str
    selectedState: str
    clientId: str

def get_states_name():
    collection = db['states_collection']
    documents = list(collection.find({}, {'link': 1}))

    return documents

def generate_bot_json():
    bot_json = {}

    def process_api_request(url, label_prefix):
        response = requests.get(url)
        if response.status_code == 200:
            text = response.json()
            nodes = text.get('nodes',[])
            print(nodes)
            if len(nodes) > 1:
                get_custom_json = GetCustomJson()
                return get_custom_json.forward(data=text, label_prefix=label_prefix)
            else:
                return {}
        else:
            raise HTTPException(status_code=response.status_code, detail=f"Failed to retrieve data from {url}")

    try:
        state_lists = get_states_name()

        for state_item in state_lists:
            print(state_item)
            bot_json.update(process_api_request(f'http://localhost:8000/get_state_flow/{state_item["link"]}', 'disp_'))

            print(bot_json)

        # Specify the file path where you want to save the JSON data
        file_path = 'bot_flow.json'

        # Write the data to the JSON file
        with open(file_path, 'w') as json_file:
            json.dump(bot_json, json_file, indent=4)

        return {"message": f"Data has been written to {file_path}"}

    except HTTPException as e:
        raise e

    
@app.get("/download-bot-json")
def download_bot_json():
    generate_bot_json()
    file_path = 'bot_flow.json'
    return FileResponse(file_path, filename=f"botflow.json")

@app.post("/hello-flow")
async def hello_flow(flow: Flow):
    collection = db['hello_flows']
    filter = {'flowId': None}
    print(filter)
    # updated_flow = {"$set": {"nodes": flow.nodes, "edges": flow.edges}}
    updated_flow = {'nodes': flow.nodes, 'edges': flow.edges}
    result = collection.replace_one(filter, updated_flow, upsert=True)
    print(result)
    return {"message": "Flow saved successfully", "result": str(result.upserted_id)}

@app.get("/get-hello-flow")
async def get_hello_flow():
    collection = db['hello_flows']
    try:
        result = collection.find_one()
        if result:
            # Convert ObjectId to string (or you can simply not include it in the response)
            result['_id'] = str(result['_id'])
        return result if result else {}
        # return result if result else {}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))    

@app.post('/save_state_flow/{state}')
async def save_state_flow(state:str,flow:Flow):
    collection = db['states_collection']
    filter = {'link': state}
    print(filter)
    updated_flow = {"$set": {"nodes": flow.nodes, "edges": flow.edges}}
    result = collection.update_one(filter, updated_flow, upsert=True)
    print(result)
    return {"message": "Flow saved successfully", "result": str(result.upserted_id)}

@app.get("/get_state_flow/{state}")
async def get_stat_flow(state:str):
    collection = db['states_collection']
    try:
        filter = {'link':state}
        result = collection.find_one(filter=filter)
        if result:
            # Convert ObjectId to string (or you can simply not include it in the response)
            result['_id'] = str(result['_id'])
        return result if result else {}
        # return result if result else {}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def get_stat_flow_1(state:str):
    collection = db['states_collection']
    try:
        filter = {'link':state}
        result = collection.find_one(filter=filter)
        if result:
            # Convert ObjectId to string (or you can simply not include it in the response)
            result['_id'] = str(result['_id'])
            temp1 = result.pop('_id', None) 
            print(temp1)
        
        return result if result else {'edges':[],'nodes':[]}
        # return result if result else {}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/save-pred_classes/")
async def save_text(item: ClassItem):
    try:
        collection = db.predicted_classes
        # Inserting the item into the collection
        collection.insert_one({"class_name": item.text})
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/get-pred_classes/")
async def get_items():
    try:
        collection = db.predicted_classes 
        # Retrieving all items from the collection
        items = list(collection.find({}, {"_id": 0}))  # Excluding the '_id' field
        # print(items)
        return items
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/save-disposition/")
async def save_disposition(item: ClassItem):
    try:
        collection = db.dispositions
        # Inserting the item into the collection
        collection.insert_one({"class_name": item.text})
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/get-dispositions/")
async def get_disposition():
    try:
        collection = db.dispositions
        # Retrieving all items from the collection
        items = list(collection.find({}, {"_id": 0}))  # Excluding the '_id' field
        # print(itemsi)
        return items
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
def update_node_data(nodes,label):
    nodes[1]['data']['label'] = label
    return nodes

@app.post("/save-state/")
async def save_state(item: StateNode):
    try:
        # print(item)
        collection = db.states_collection
        print(item.selectedState)
        data_ret = get_stat_flow_1(lower_and_replace_spaces(item.selectedState))
        print(data_ret)
        edges = data_ret.get('edges',[])
        nodes = data_ret.get('nodes',[])
        # if len(nodes) > 2:
        #     nodes = update_node_data(nodes=nodes,label=item.text)
        # Inserting the item into the collection
        data = {"class_name": item.text,'link':lower_and_replace_spaces(item.text),
                "edges":edges,"nodes":nodes,"clientId":item.clientId
                }
        collection.insert_one(data)
        return {"success": True}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/get-states/{clientId}")
async def get_states(clientId: str):
    try:
        collection = db.states_collection
        # Retrieving all items from the collection
        items = list(collection.find({"clientId": clientId}, {"_id": 0}))  # Excluding the '_id' field
        # print(itemsi)
        return items
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# Code for client 

class ClientItem(BaseModel):
    name: str
    user_id: str  # Assuming you want to store the user ID alongside the name.

class Client(BaseModel):
    id: Optional[str] = None
    name: str
    user_id: str

def client_entity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "name": item["name"],
        "user_id": item["user_id"],
    }

@app.post("/save-client/")
async def save_client(item: ClientItem):
    try:
        # Replace spaces in the name with underscores
        item.name = item.name.replace(" ", "_")
        
        collection = db.clients
        # Create a compound unique index on name and user_id to ensure no duplicates for the combination of name and user_id
        collection.create_index([("name", pymongo.ASCENDING), ("user_id", pymongo.ASCENDING)], unique=True)
        # Inserting the item into the collection with a generated unique ID
        result = collection.insert_one(jsonable_encoder(item))
        return {"success": True, "id": str(result.inserted_id)}
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(status_code=400, detail="Client with the given name and user ID already exists")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/get-clients/{user_id}", response_model=List[Client])
async def get_clients(user_id: str):
    try:
        collection = db.clients
        # Using find to get all documents matching the user_id
        items_cursor = collection.find({"user_id": user_id})
        items = list(items_cursor)  # Converting cursor to list
        if items:
            return [client_entity(item) for item in items]  # Ensure client_entity can handle each document
        else:
            # Directly return an empty list if no clients are found, instead of raising an error
            return []
    except Exception as e:
        # Keep this block for other unexpected errors
        raise HTTPException(status_code=500, detail=str(e))
# Code for login
    
# Pydantic models
class UserInDB(BaseModel):
    username: str
    hashed_password: str

class UserIn(BaseModel):
    username: str
    password: str


# FastAPI and security setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

SECRET_KEY = "a_very_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Utility functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def authenticate_user(username: str, password: str):
    user = db.users.find_one({"username": username})
    if not user or not verify_password(password, user['hashed_password']):
        return False
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# API endpoints
@app.post("/register")
async def register(user: UserIn):
    user_in_db = db.users.find_one({"username": user.username})
    if user_in_db:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = get_password_hash(user.password)
    user_id = str(uuid.uuid4())  # Generate a unique UUID
    db.users.insert_one({"username": user.username, "hashed_password": hashed_password, "user_id": user_id})
    return {"message": "User registered successfully.", "user_id": user_id}

@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["username"]}, expires_delta=access_token_expires
    )
    user_id = user.get("user_id", "No user ID found")  # Fetch the user's UUID
    return {"access_token": access_token, "token_type": "bearer", "user_id": user_id}