from collections import defaultdict
import sys


class Graph():
    def __init__(self, size):
        self.edges = defaultdict(list)                              #dictionary of all connected nodes e.g. {'X': ['A', 'B', 'C', 'E'], ...}
        self.weights = {}                                           #dictionary of edges and weights e.g. {('X', 'A'): 7, ('X', 'B'): 2, ...}
        self.size = size
        self.dist = []
        for i in range(size):
            self.dist.append(sys.maxsize)
        self.previous = []
        for i in range(size):
            self.previous.append(None)
        
    
    def add_edge(self, from_node, to_node, weight):                 #bidirectional
        self.edges[from_node].append(to_node)
        self.edges[to_node].append(from_node)
        self.weights[(from_node, to_node)] = weight
        self.weights[(to_node, from_node)] = weight


    def findSmallestNode(self): 
        smallest = self.dist[self.getIndex(self.Q[0])]
        result = self.getIndex(self.Q[0])
        for i in range(len(self.dist)):
            if self.dist[i] < smallest:
                node = self.unpoppedQ[i]
                if node in self.Q:
                    smallest = self.dist[i]
                    result = self.getIndex(node)
        return result
            

    def getIndex(self, neighbour):
        for i in range(len(self.unpoppedQ)):
            if neighbour == self.unpoppedQ[i]:
                return i


    def getPopPosition(self, uNode):
        result = 0
        for i in range(len(self.Q)):
            if self.Q[i] == uNode:
                return i
        return result


    def getUnvisitedNodes(self, uNode):
        resultList = []
        allNeighbours = self.edges[uNode]
        for neighbour in allNeighbours:
            if neighbour in self.Q:
                resultList.append(neighbour)
        return resultList          

    def Better(self,start,end): #starting val and the val its lookig for
        self.dic={} #dicionary that holds the index for each node and its weight
        self.Q=[] #List that holds all nodes
        lowNode=[] #lists that holds all paths 
        for i in self.edges:
            if i==start:
                self.dic[i]=[0,None]#sets that weight of the starting node 0 and previous data to None
                lowNode.append([i,0]) 
            else:
                self.dic[i]=[10000000,None] #sets all other nodes weight to 100000 and previous data to None
                lowNode.append([i,10000000]) #adds path to low Node
            self.Q.append(i)
        self.unpoppedQ = self.Q[0:]
        while self.Q:

            lowestNode=["AAAAA",10000000000000000000]  # sets the lowest node to a real high nomber and a node that doesnt exist
            for i in range(0,len(lowNode)):
                
                if lowNode[i][1]<lowestNode[1]: #if low node data is greater then lowest node lowset node is redefiend
                    lowestNode=lowNode[i]
                    lowestNode.append(i)
                    
    
            
            u=lowestNode[0]   #sets u to the node with the lowest val
            if self.dic[u][0]==10000000: #if the val of the dic is the number set to higher break
                break 
            if u==end: #if u is at end break
                break
            self.Q.pop(lowestNode[2]) #remove the last element of the lsit
            
            lowNode.remove(lowNode[lowestNode[2]]) #removes the node from the list
            for v in self.edges[u]: #for each edge that is conneted set alt to weight of u+ weight of the conneted node
                alt=self.dic[u][0]+self.weights[u,v]
                if alt<self.dic[v][0]: #if alt is lower then the weight of node v 
                    self.dic[v][0]=alt #sets weight of node v to alt 
                    self.dic[v][1]=u #set prev node to u
        s=[]
        cost=0
        u=end
        while self.dic[u][1]!=None:  #calculates smallest path
             s.append(u)
            
            cost=cost+self.dic[u][0]
            u=self.dic[u][1]
        s.append(start)
        s.reverse()
        print(s)
        print(cost)


graph = Graph(8)


edges = [
    ('O', 'A', 2),
    ('O', 'B', 5),
    ('O', 'C', 4),
    ('A', 'B', 2),
    ('A', 'D', 7),
    ('A', 'F', 12),
    ('B', 'C', 1),
    ('B', 'D', 4),
    ('B', 'E', 3),
    ('C', 'E', 4),
    ('D', 'E', 1),
    ('D', 'T', 5),
    ('E', 'T', 7),
    ('F', 'T', 3),
]
    

for edge in edges:
    graph.add_edge(*edge)
graph.Better("O","T")

#print(graph.dijsktra('O', 'T'))

