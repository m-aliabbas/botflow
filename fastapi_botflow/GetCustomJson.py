class GetCustomJson:
    def __init__(self) -> None:
        pass

    def get_main_state_info(self,state_nodes):
        temp_dict = {}
        main_key = 'S_' + state_nodes['data']['label'] 
        temp_dict[main_key] = {}
        # temp_dict[main_key]['sec'] = state_nodes['data']['inputValue']
        temp_dict[main_key]['sec'] = state_nodes['data'].get('inputValue', '5') # updated by danish

        # temp_dict[main_key]['fileName'] = state_nodes['data']['fileName']
        temp_dict[main_key]['fileName'] = state_nodes['data'].get('fileName', '') # updated ny danish

        return temp_dict

    def find_state_nodes(self,data):
        """
        Finds and returns all items with type 'stateNode' in the given data.

        :param data: A dictionary containing nodes and edges from the JSON data.
        :return: A list of items with type 'stateNode'.
        """
        state_nodes = []
        i = 0
        for node in data['nodes']:
            
            if node['type'] == 'stateNode':
                node_id = node.get('id',None)
                if node_id:
                    state_nodes.append(node)
                else:
                    pass
            i+=1
        print(state_nodes)
        state_nodes = state_nodes[0]
        
        return self.get_main_state_info(state_nodes)
    
    def update_labels_with_prefix(self,items, prefix):
        """
        Updates the label of each item in the list by adding a custom prefix.

        :param items: A list of items, each with a 'data' dictionary containing a 'label' field.
        :param prefix: A string to be prefixed to each label.
        :return: The list with updated labels.
        """
        for item in items:
            if 'data' in item and 'label' in item['data']:
                item['data']['label'] = prefix + item['data']['label']

        return items

    def find_nodes_with_bottombarid(self,data, className='bottombarnode'):
        """
        Finds and returns all nodes with the specified className in the given data.

        :param data: A dictionary containing nodes and edges from the JSON data.
        :param className: The className to filter the nodes. Default is 'bottombarnode'.
        :return: A list of nodes with the specified className.
        """
        filtered_nodes = []
        for node in data['nodes']:
            if node.get('className') == className:
                filtered_nodes.append(node)
        return filtered_nodes
        
    def map_connections(self,bottom_bar_nodes, edges):
        """
        Maps each bottom bar node to the set of nodes it is connected to.

        :param bottom_bar_nodes: A list of bottom bar nodes.
        :param edges: A list of all edges in the data.
        :return: A dictionary where keys are bottom bar node IDs and values are sets of connected node IDs.
        """
        bottom_bar_node_ids = {node['id'] for node in bottom_bar_nodes}
        connections = {node_id: set() for node_id in bottom_bar_node_ids}

        for edge in edges:
            source = edge.get('source')
            target = edge.get('target')

            if source in bottom_bar_node_ids:
                connections[source].add(target)
            elif target in bottom_bar_node_ids:
                connections[target].add(source)

        return connections
    

    def create_label_based_connection_map(self, nodes, connections, bottom_bar_nodes):
        """
        Creates a dictionary with labels of bottom bar nodes as keys and dictionaries of associated node data as values.

        :param nodes: A list of all nodes (including bottom bar nodes and others).
        :param connections: A dictionary of connections between bottom bar nodes and other nodes.
        :param bottom_bar_nodes: A list of bottom bar nodes.
        :return: A dictionary where keys are labels of bottom bar nodes and values are dictionaries of connected nodes' data.
        """
        node_data_by_id = {node['id']: node for node in nodes if 'id' in node}
        label_based_connections = {}

        bottom_bar_labels = {node['id']: node['data']['label'] for node in bottom_bar_nodes}

        for bottom_bar_node_id, connected_node_ids in connections.items():
            connected_nodes_data = {}
            for node_id in connected_node_ids:
                if node_id in node_data_by_id:
                    node_data = node_data_by_id[node_id]['data']
                    label = node_data['label']
                    connected_nodes_data[label] = {
                        "fileName": node_data.get('fileName', ''),
                        "next_state": bottom_bar_labels[bottom_bar_node_id]
                    }

            label_based_connections[bottom_bar_labels[bottom_bar_node_id]] = connected_nodes_data

        return label_based_connections
        
    def find_disable_state_nodes(self,data):
        """
        Finds and returns all nodes with type 'disableStateNode' in the given data.

        :param data: A dictionary containing nodes and edges from the JSON data.
        :return: A list of nodes with type 'disableStateNode'.
        """
        disable_state_nodes = [node for node in data['nodes'] if node['type'] == 'disableStateNode']
        return disable_state_nodes


    def forward(self, data, label_prefix):
        """
        Processes the node data to map connections from 'stateNode' and 'disableStateNode' types to other nodes.

        :param data: A dictionary containing 'nodes' and 'edges' from the JSON data structure.
                    The 'nodes' list contains various node elements, while 'edges' define the connections between these nodes.
        :return: A dictionary representing the state of each 'stateNode' and 'disableStateNode', 
                along with their connections to other nodes.
        """
        if data == {}:
            return {}
        # Find all nodes with the type 'stateNode'
        state_dict = self.find_state_nodes(data=data)

        # Find all nodes with the className 'bottombarnode'
        nodes_with_bottombarid = self.find_nodes_with_bottombarid(data=data)
        nodes_with_bottombarid = self.update_labels_with_prefix(nodes_with_bottombarid, label_prefix)
        
        # Map connections of bottom bar nodes to other nodes
        connection_with_bottom_bar_id = self.map_connections(nodes_with_bottombarid, data['edges'])

        # Create a connection map with labels of bottom bar nodes and their connected nodes' data
        connection_map1 = self.create_label_based_connection_map(data['nodes'], connection_with_bottom_bar_id, nodes_with_bottombarid)

        # Find all nodes with the type 'disableStateNode'
        dis_state_node = self.find_disable_state_nodes(data=data)
        dis_state_node = self.update_labels_with_prefix(dis_state_node, 'S_')
        # Map connections of disabled state nodes to other nodes
        connection_with_disable_bar_id = self.map_connections(dis_state_node, data['edges'])

        # Create a connection map with labels of disabled state nodes and their connected nodes' data
        connection_map2 = self.create_label_based_connection_map(data['nodes'], connection_with_disable_bar_id, dis_state_node)

        # Merge the connection maps into the state dictionary
        state_key = list(state_dict.keys())[0]
        for label, connections in connection_map1.items():
            for conn_label, conn_data in connections.items():
                state_dict[state_key][conn_label] = conn_data

        for label, connections in connection_map2.items():
            for conn_label, conn_data in connections.items():
                state_dict[state_key][conn_label] = conn_data

        return state_dict