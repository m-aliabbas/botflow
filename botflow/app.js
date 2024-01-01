const fetchFlowFromServer = async () => {
    try {
      const response = await fetch('http://localhost:3001/get-busy-flow');
      const data = await response.json();
  
      // Set the nodes and edges based on the fetched data
      if (data.nodes && data.edges) {
        setNodes(data.nodes);
        setEdges(data.edges);
        
        // Use the callback form of setState to ensure the updated value is used
        setStateNodeAdded((prevValue) => {
          const hasStateNode = data.nodes.some((node) => node.type === 'stateNode');
          console.log('State Node added', hasStateNode);
          return hasStateNode;
        });
      }
    } catch (error) {
      console.error('Error fetching flow:', error);
    }
  };