import sys                                                      #needed for maxsize
  
class Graph(): 
  
    def __init__(self, vertices):                               #implements graph as adjacency matrix
        self.V = vertices                                       #number of vertices
        self.graph = [[0 for column in range(vertices)]         #adjacency matrix with no edges (all connections set to zero)
                    for row in range(vertices)] 
  
    def printMST(self, parent): 
        print ("Edge \t Weight")
        for i in range(1, self.V): 
            print (parent[i], "-", i, "\t", self.graph[i][ parent[i] ])
  
                                                                #from reached nodes find the unreached node with the minimum cost
    def minKey(self, key, mstSet): 
        min = sys.maxsize                                       #set min to infinity (use maxsize which is next best thing!)
        for v in range(self.V):                                 #count through number of vertices
            if key[v] < min and mstSet[v] == False:             #if vertex is less than min and unreached
                min = key[v]                                    #assign to min 
                min_index = v                                   #min_index is position of min in key
        return min_index                                        #return min_index
  
                                                                #find MST 
    def primMST(self): 
        key = [sys.maxsize] * self.V                            #initialise key to list of values all set to infinity; same length as self.V              
        parent = [None] * self.V                                #list for constructed MST 
        key[0] = 0                                              #set first element of key to zero (this is where we start)                                                                                   
        mstSet = [False] * self.V                               #mstSet is list of booleans set to False
        parent[0] = -1                                          #first element of parent list set to -1                        
  
        for vertex in range(self.V):                            #go through all vertices
            u = self.minKey(key, mstSet)                        #call minKey; minKey returns u (index of unreached node) 
            mstSet[u] = True                                    #mstSet at index of node is set to True                                                                                                
            for v in range(0,self.V):                             #go through all vertices
                if (((self.graph[u][v]>0) and (mstSet[v]==False)) and (key[v]>self.graph[u][v])): #checks to see if the data is greater then 0 that the boolen is false and the key is greater then the data
                    key[v]=self.graph[u][v] #in witch case of v it sets the key to the data  and sets the parent v to u
                    parent[v]=u 

                
                
                
                                 
  
        self.printMST(parent)                                                                 
  
g = Graph(5) 
g.graph = [ [0, 2, 0, 6, 0], 
            [2, 0, 3, 8, 5], 
            [0, 3, 0, 0, 7], 
            [6, 8, 0, 0, 9], 
            [0, 5, 7, 9, 0]] 
  
g.primMST(); 
