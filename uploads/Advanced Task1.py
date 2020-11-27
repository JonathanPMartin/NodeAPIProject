import math

""" Node class
"""

class Node:
    def __init__(self, data = None):
        self.data = data
        self.left = None
        self.right = None

""" BST class with insert and display methods. display pretty prints the tree
"""

class BinaryTree:
    def __init__(self):
        self.root = None

    def insert(self, data):
        if self.root is None:
            self.root = Node(data)
        else:
            self._insert(data, self.root)

    def _insert(self, data, cur_node):
        if data < cur_node.data:
            if cur_node.left is None:
                cur_node.left = Node(data)
            else:
                self._insert(data, cur_node.left)
        elif data > cur_node.data:
            if cur_node.right is None:
                cur_node.right = Node(data)
            else:
                self._insert(data, cur_node.right)
        else:
            print("Value already present in tree")






    def display(self, cur_node):
        lines, _, _, _ = self._display(cur_node)
        for line in lines:
            print(line)

    def _display(self, cur_node):
        """Returns list of strings, width, height, and horizontal coordinate of the root."""
        # No child.
        if cur_node.right is None and cur_node.left is None:
            line = '%s' % cur_node.data
            width = len(line)
            height = 1
            middle = width // 2
            return [line], width, height, middle

        # Only left child.
        if cur_node.right is None:
            lines, n, p, x = self._display(cur_node.left)
            s = '%s' % cur_node.data
            u = len(s)
            first_line = (x + 1) * ' ' + (n - x - 1) * '_' + s
            second_line = x * ' ' + '/' + (n - x - 1 + u) * ' '
            shifted_lines = [line + u * ' ' for line in lines]
            return [first_line, second_line] + shifted_lines, n + u, p + 2, n + u // 2

        # Only right child.
        if cur_node.left is None:
            lines, n, p, x = self._display(cur_node.right)
            s = '%s' % cur_node.data
            u = len(s)
            first_line = s + x * '_' + (n - x) * ' '
            second_line = (u + x) * ' ' + '\\' + (n - x - 1) * ' '
            shifted_lines = [u * ' ' + line for line in lines]
            return [first_line, second_line] + shifted_lines, n + u, p + 2, u // 2

        # Two children.
        left, n, p, x = self._display(cur_node.left)
        right, m, q, y = self._display(cur_node.right)
        s = '%s' % cur_node.data
        u = len(s)
        first_line = (x + 1) * ' ' + (n - x - 1) * '_' + s + y * '_' + (m - y) * ' '
        second_line = x * ' ' + '/' + (n - x - 1 + u + y) * ' ' + '\\' + (m - y - 1) * ' '
        if p < q:
            left += [n * ' '] * (q - p)
        elif q < p:
            right += [m * ' '] * (p - q)
        zipped_lines = zip(left, right)
        lines = [first_line, second_line] + [a + u * ' ' + b for a, b in zipped_lines]
        return lines, n + m + u, max(p, q) + 2, n + u // 2
    def find_i(self,target):      #standard task 1 part1  works by iterating over cur_node 
        cur_node=self.root
        while cur_node!=None:  #when cur_node is empty it stops
            if cur_node.data==target:
                return True  #found data
            elif cur_node.data>target: #if the data is larger then target look left node
                cur_node=cur_node.left 
            else:
                cur_node=cur_node.right #if the data is smaller then target look at right nood
        return False

    def find_r(self,target): #standard task1 part2 works by recursively calling _find)r
        if self.root: #checks to see self.root exists
            if self._find_r(target,self.root): #returns true if target it is the cur_node
                return True
            return False #returns false if the target is not in the system
        else:
            return None #runs if there is no data in tree
    def _find_r(self,target,cur_node):
        if cur_node==None:
            return False #if there is no data target is not in tree
        if target==cur_node.data: #target is in tree and is found
            return True
        elif (target >cur_node.data): #targert might be in tree and is higher then current node
            return self._find_r(target,cur_node.right) #call itself to look at right of current node
        elif (target<cur_node.data):#targert might be in tree and is lower then current node
            return self._find_r(target,cur_node.left)#call itself to look at left of current node


   #Advanced task 1
    def remove(self,target):
        
        if self.root==None: #there is no data in tree
           
            return False
        elif self.root.data==target: #the top node in tree is the target
           
            if (self.root.left ==None)and(self.root.right==None): #if has no chidren set  tree to empty
                self.root=None
            elif(self.root.left ==None)and(self.root.right!=None):#if has only chilren on right set tree to right children
                self.root=self.root.right
            elif(self.root.right==None)and(self.root.left!=None):#if has only chilren on left set tree to left children
                self.root=self.root.left
            elif(self.root.right!=None)and(self.root.left!=None): #if tree has children on the left and right do 
                delNodeParent=self.root #sets to top tree
                delNode=self.root.right #sets to right of top of tree 
                while delNode.left: #while right of node has a child on the left
                    delNodeParent=delNode #set node as right of iteslef
                    delNode=delNode.left s#sets node to left of node
                    self.root.data=delNode.data #redefiens tree to eqaul the data of its right child
                    if delNode.right: #if there is a node on right of delnode
                        if delNodeParent.data>delNode.data: #if the parent greater then node set the parent left child to the curent nodes right
                            delNodeParent.left=delNode.right 
                        elif delNodeParent.data<delNode.data:#if the Parent less then node set the parent right child to the current nodes right
                            delNodeParent.right=delNode.right
                    else: #if there is no data in either the left or right child of node's children
                        if delNode.data<delNodeParent.data: #deletes left node if parent is greater then current node
                            delNodeParent.left=None
                        else:
                            delNodeParent.right=None #deletes right node if parent is les then current node
       
        parent=None
        node=self.root
        x=0
        while (node)and(node.data!=target): #checks to insure tree exists and can be ran
            x=x+1
            parent=node
            if target<node.data:
                node=node.left
            elif target>node.data:
                node=node.right
        
            
        if self.find_i(target) == False:#case 1 target not found returns false
            return False
           
        elif (node.left==None)and(node.right==None):#case2:target has no children sets 
            if target<parent.data: #if target is less then left child del left child
                    parent.left=None
            else:                 #del right child if not
                parent.right=None
            return True
        elif (node.left!=None)and(node.right==None):#target has left child only
            if target<parent.data:
                parent.left=node.left #sets parent node's left to the curent nodes left if target is less then parent data
            else:         
                parent.right=node.left #otherwise sets parent node's right to current nodes left
            return True
        elif(node.right!=None)and(node.left==None):#target has right child only 
            if target<parent.data:
                parent.left=node.right #sets parent node's left to the curent nodes right if target is less then parent data
            else:
                parent.right=node.right #otherwise sets parent node's right to current nodes right
            return True
        else:#target has left and right children
            delNodeParent=node
            delNode=node.right
            while delNode.left:    #while the current node has a left child
                delNodeParent=delNode #sets to right of current node
                delNode=delNode.left #sets to left of current node
            node.data=delNode.data #sets to current node
            if delNodeParent.data>delNode.data: #if parent node is larger then right child node sets parent node left child to child node's right
                delNodeParent.left=delNode.right 
            elif delNodeParent.data<delNode.data: #else if  parent node is smaller then right child node sets parent node right child to child node's right
                delNodeParent.right=delNode.right
            else:                                #else check to see if child node data is less then parent nodes data if so set the left child of the parent node to None else set the right child of the parent node to none
                if delNode.data<delNodeParent.data:
                    delNodeParent.left=None
                else:
                    delNodeParent.right=None
                        
                    

                    
                
                            
                
        
bst = BinaryTree()
bst.insert(4)
bst.insert(2)
bst.insert(6)
bst.insert(1)
bst.insert(3)
bst.insert(5)
bst.insert(7)
##bst.insert(8)
##bst.insert(9)
##bst.insert(10)
##bst.insert(11)
##bst.insert(12)
##bst.insert(13)
##bst.insert(14)
##bst.insert(15)
##bst.insert(100)
##bst.insert(200)


bst.display(bst.root)
#print(bst.find_i(8))
#print(bst.find_r(8))
bst.remove(6)
bst.display(bst.root)

