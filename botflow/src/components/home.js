import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap
} from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from './sidebar';
import LeftSidebar from './leftSidebar';
import BottomBar from './bottomBar';
import './index.css';
import { NavLink } from 'react-router-dom';
import FileSelectorNode from './Nodes/PredClass';
import StateNode from './Nodes/StateNode';
import DisableStateNode from './Nodes/DisableStateNode';
import axios from 'axios';
import HomeIcon from '@mui/icons-material/Home';
import SaveIcon from '@mui/icons-material/Save';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBottomPart from './AddBottomPart';
import { useLocation, Link } from 'react-router-dom';
const { server_address } = require('./config');
const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Hello' },
    position: { x: 250, y: 0 },
  },
];
let id = 0;
const getId = () => (Math.random() + 1).toString(36).substring(7);

const Home = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null); // State to track the selected edge

  const [isEditing, setIsEditing] = useState(false);
  const [tempLabel, setTempLabel] = useState('');

  const [isStateNodeAdded, setStateNodeAdded] = useState(false);

  const [baseNodeCounter, setCounterNode] = useState(0); //ALI
  
  const location = useLocation(); // Hook to access location state
  const client_id = location.state?.clientId; // Access clientId passed as state
  let counter = 0; // ALI

  const onInputChange = useCallback((nodeId, inputValue) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, inputValue } } : node
      )
    );
  }, [setNodes]);

  const onFileChange = useCallback((nodeId, selectedFile) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, fileName: selectedFile.name } } : node
      )
    );
  }, [setNodes]);

  const onFileChange1 = useCallback((nodeId, selectedFile) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, fileName: selectedFile.name } } : node
      )
    );
  }, [setNodes]);

  const onCheckChange = useCallback((nodeId, newChecked) => {
    console.log(`Updating node ${nodeId} with checked: ${newChecked}`);
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, checked: newChecked } } : node
      )
    );
    
  }, [setNodes]);


  const onQqCheckChange = useCallback((nodeId, newQqChecked) => {
    console.log(`Updating node ${nodeId} with checked: ${newQqChecked}`);
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, qqChecked: newQqChecked } } : node
      )
    );
    
  }, [setNodes]);




  const nodeTypes = useMemo(() => ({
    stateNode: (props) => <StateNode {...props} onInputChange={onInputChange} onFileChange={onFileChange1} onQqCheckChange={onQqCheckChange} />,
    disableStateNode: DisableStateNode,
    customNode: (props) => <FileSelectorNode {...props} onFileSelect={onFileChange1} />,
    // ... other node types ...
  }), [onInputChange, onFileChange, onCheckChange,onQqCheckChange]); // Include all dependencies here

  const saveFlowToServer = async () => {
    try {
      // Log the nodes data for debugging
      console.log("Nodes Data:", nodes);
      const response = await fetch(server_address + 'save_state_flow/hello', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ client_id, nodes, edges  }),
      });
      const data = await response.json();
      alert('Flow saved successfully!');
    } catch (error) {
      console.error('Error saving flow:', error);
      alert('Error saving flow. Please try again.');
    }
  };
  const handleDownload = async () => {
    try {
      const response = await axios.get(server_address + 'download-bot-json', {
        responseType: 'blob', // Set the response type to blob
      });

      // Create a blob from the response data
      const blob = new Blob([response.data], { type: 'application/json' });

      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'botflow.json';

      // Trigger the download
      link.click();

      // Cleanup: remove the link element
      link.remove();
    } catch (error) {
      console.error('Error downloading JSON file:', error);
    }
  };
  const fetchFlowFromServer = async () => {
    try {
      const response = await fetch(server_address + 'get_state_flow/hello');
      const data = await response.json();
      if (data.nodes && Array.isArray(data.nodes) && data.edges && Array.isArray(data.edges)) {
        const updatedNodes = data.nodes.map(node => {
          let nodeData = node.data || {};
          return {
            ...node,
            data: nodeData
          };
        });
        setNodes(updatedNodes);
        setEdges(data.edges);
        setStateNodeAdded(data.nodes.some(node => node.type === 'stateNode'));
      } else {
        console.error("Invalid data structure received from server");
      }
    } catch (error) {
      console.error('Error fetching flow:', error);
    }
  };

  useEffect(() => {
    fetchFlowFromServer();
  }, []);

  // Function to handle label change
  const handleLabelChange = useCallback((event) => {
    setTempLabel(event.target.value);
  }, []);

  // Function to start editing the label
  const onNodeDoubleClick = useCallback((event, node) => {
    setSelectedNode(node);
    setTempLabel(node.data.label);
    setIsEditing(true);
  }, []);

  // Function to update node label
  const updateNodeLabel = useCallback(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          return { ...node, data: { ...node.data, label: tempLabel } };
        }
        return node;
      })
    );
    setIsEditing(false);
    setSelectedNode(null);
  }, [selectedNode, tempLabel, setNodes]);


  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handle_counter = (counter) => {
    setCounterNode(counter + 1);
  };

  // Add this use effect
  useEffect(() => {
    console.log('isStateNodeAdded changed:', isStateNodeAdded);
  }, [isStateNodeAdded]);
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      const isSidebarNode = event.dataTransfer.getData('sidebarNode'); // New line
      const isBottombarNode = event.dataTransfer.getData('bottomBarNode');
      const className = isSidebarNode ? '' : (isBottombarNode ? 'bottombarnode' : '');
      let selectedNodeType = isSidebarNode ? 'customNode' : (isBottombarNode ? type : 'stateNode');

      if (isStateNodeAdded == true) {
        counter = counter + 2;
      }
      if (selectedNodeType == 'stateNode') {
        counter = counter + 1;
      }
      // console.log('After',counter);

      if (counter > 1 && selectedNodeType == 'stateNode') // add this logic here
      {
        selectedNodeType = 'disableStateNode';
      }

      console.log(selectedNodeType);
      // Here
      if (typeof type === 'undefined' || !type) {
        return;
      }
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type: selectedNodeType,
        position,
        data: { label: `${type} ` },
        className: className
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes, isStateNodeAdded] // a change isStateNodeAdded to be added Here (ALI)
  );

  const onNodeSelect = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const onDelete = useCallback(() => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
      setSelectedNode(null);
    }
    if (selectedEdge) {
      setEdges((eds) => eds.filter((e) => e.id !== selectedEdge.id));
      setSelectedEdge(null);
    }
  }, [selectedNode, setNodes, selectedEdge, setEdges]);

  const onEdgeSelect = useCallback((event, edge) => {
    setSelectedEdge(edge);
  }, []);

  // const onDeleteEdge = useCallback(() => {
  //   if (selectedEdge) {
  //     setEdges((eds) => eds.filter((e) => e.id !== selectedEdge.id));
  //     setSelectedEdge(null);
  //   }
  // }, [selectedEdge, setEdges]);

  return (
    <>
      <div className="dndflow">

        <div>
          <LeftSidebar />

          <div className='button-out'>
            <div className='icon-out'>
       
            <button className="bottom-button"><NavLink className="nav-link" component={Link} to="/botpanel">
          <HomeIcon/>
               </NavLink></button>
            <button onClick={saveFlowToServer} className="bottom-button">
              <SaveIcon/>
            </button>
            <button onClick={handleDownload} className="bottom-button">
            <SimCardDownloadIcon/>
            </button>
            <button onClick={onDelete} className="bottom-button">
              <DeleteIcon/>
            </button>

            </div>
          </div>

        </div>

        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
           
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodeClick={onNodeSelect}
              onEdgeClick={onEdgeSelect} // Handle edge selection
              onNodeDoubleClick={onNodeDoubleClick}
              fitView
              nodeTypes={nodeTypes}
            >
               {/* <MiniMap  nodeStrokeWidth={3} /> */}
              <Controls />
              <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
          </div>

          <div >
            <Sidebar />

            

          </div>

        </ReactFlowProvider>
      </div>

      <div className='bottom-bar'>
      {isEditing ?
        <div className="edit-label-modal">
          <input className='input-lable' value={tempLabel} onChange={handleLabelChange} />
          <button className='update-button' onClick={updateNodeLabel}>Update Label</button>
        </div>
        :
        <></>
        // <div className="edit-label-modal">
        //   <p className='pra'>
        //     Double Click Node To Update!
        //   </p>
        // </div>
      }

        <BottomBar />
      </div>
      {/* <AddBottomPart/> */}
      
    </>
  );
};

export default Home;
