import requests
import json
from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from fastapi.responses import FileResponse
from datetime import datetime
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
from bson import ObjectId
import bson
from typing import List
from GetCustomJson import GetCustomJson
app = FastAPI()
from utils.utils import *
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
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

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

def get_states_name():
    collection = db['states_collection']
    documents = list(collection.find({}, {'link': 1}))

    return documents

# Fastapi code
# @app.get("/generate-bot-json")
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
    

@app.post("/save-state/")
async def save_state(item: ClassItem):
    try:
        collection = db.states_collection

        # Inserting the item into the collection
        data = {"class_name": item.text,'link':lower_and_replace_spaces(item.text)}
        collection.insert_one(data)
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@app.get("/get-states/")
async def get_states():
    try:
        collection = db.states_collection
        # Retrieving all items from the collection
        items = list(collection.find({}, {"_id": 0}))  # Excluding the '_id' field
        # print(itemsi)
        return items
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))