class Adacdny_matrix(): #defines classs 
    def __init__(self):
        self.vertex=[] #when called creates empty list
    def AddVertex(self,data):
        if len(self.vertex)>0: #cheks to see if the list is still empty if so will ad data to list else will check to see if the data is already in the list
            for i in range(len(self.vertex)):
                if self.vertex[i][0]==data:
                    return False
            self.vertex.append([data])
        else:
            self.vertex.append([data])
    def CompletVertex(self): #all vertexs have been entered to the list and this is called to create a blank Adacdny_matrix
        x=len(self.vertex)
        z=0
        for i in range(x):
            for j in range(x):
                self.vertex[i].append(z)
    def AddEdge(self,Vertex,Edge): #adds an Edge between two Vertexs as long as it doesnt already exist
        x=len(self.vertex)
        for i in range(x):
            if self.vertex[i][0]==Vertex:
                if self.vertex[i][Edge]==1:
                    return False
                else:
                    self.vertex[i][Edge]=1
    def RemoveEdge(self,Vertex,Edge): #removes an Edge between two Vertexs if it exists
        x=len(self.vertex)
        for i in range(x):
            if self.vertex[i][0]==Vertex:
                if self.vertex[i][Edge]==0:
                    return False
                else:
                    self.vertex[i][Edge]=0
                
    def DisplayMetrix(self): #displays the metrix by taking  the first element of lists that represents each vertex(the first element is the name of the vertex itself) and displays it in a easy to read format
        x="  "
        z=len(self.vertex)
        for i in range(1,z+1):
            x=x+"|"+str(i)+"| "
        print(x)
        for i in range(z):
            x=""
            x=x+str(self.vertex[i][0])+"|"+" "
            
            for j in range(1,z+1):
                x=x+str(self.vertex[i][j])+"   "
            print(x)
        
metrix=Adacdny_matrix()
metrix.AddVertex(1)
metrix.AddVertex(2)
metrix.AddVertex(3)
metrix.AddVertex(4)
metrix.AddVertex(5)
metrix.AddVertex(6)
metrix.CompletVertex()
metrix.AddEdge(1,2)
metrix.AddEdge(1,3)
metrix.AddEdge(1,6)
metrix.AddEdge(2,3)
metrix.AddEdge(2,5)
metrix.RemoveEdge(1,2)
metrix.DisplayMetrix()
