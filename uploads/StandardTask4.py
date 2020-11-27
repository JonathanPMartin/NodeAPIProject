def InsersitonSort(List): #inseriton sort works by seeing if a data point is higer then a key if so it replaces it 
    for i in range(1,len(List)):   #has a big O notation of O(n^2)
        key=List[i]
        j=i-1
        while((List[j]>key)and(j>=0)):
            List[j+1]=List[j]
            j=j-1
        List[j+1]=key
    print(List)

def BubbleSort(List): #works by seeing if data is greater then the data after it if so it replaces it
    for i in range(1,len(List)):     #has a big O notation of O(n) on avrage
        for j in range(0,len(List)-1):
            if List[j]>List[j+1]:
                tem=List[j]
                List[j]=List[j+1]
                List[j+1]=tem
    print(List)


def MergeSort(List): #works by dividing the list into a left list and a right list and  sorting them by comparing the elemetns of one to another
                      #has a big O noation of O(n*Log n) on avrage
    if len(List)>1:
        m = len(List)//2 #m is the middle most value
        leftList = List[:m]#takes the all elements left of m
        rightList = List[m:] #takes all values right of m
        leftList = MergeSort(leftList) #sorts left list
        rightList = MergeSort(rightList) #sorts right list

        List =[] #redefiends List to empty in order to add the sorted elements latter

        while len(leftList)>0 and len(rightList)>0: 
            if leftList[0]<rightList[0]:
                List.append(leftList[0])
                leftList.pop(0)
            else:
                List.append(rightList[0])
                rightList.pop(0)

        for i in range(0,len(leftList)):
            List.append(leftList[i])
        for i in range(0,len(rightList)):
            List.append(rightList[i])
                
    return List

def part(List,low,high): #partition used by quick sort works by looking for the list element lower then the piviot once found it redfines the index and sets the value that the index represnt in the list to the new data 
    index=(low-1)
    piv=List[high]
    for i in range(low,high):
        if List[i]<piv:
            index=index+1
            tem=List[index]
            List[index]=List[i]
            List[i]=tem
    tem=List[index+1]
    List[index+1]=List[high]
    List[high]=tem
    return(index+1)
def QuickSort(List,low,high): #works by checking that the low is still less then the high and if it is to partision the data and call the function twice more once for low once for high 
    if low<high:                #has a big ) noation of O(n log n) on avrage
        partition=part(List,low,high)
        QuickSort(List,low,partition-1)
        QuickSort(List,partition+1,high)

def SelectionSort(List): #works by looping over the list and finding its data and for each peace of data looping over the list to find all data after it. if a data in the second loop is greater then the one in the first they switch places.
    for i in range(0,len(List)-1):#has a big 0 complexity of O(n2) on avarge 
        for j in range(i+1,len(List)):
            if List[i]>List[j]:
                tem=List[i]
                List[i]=List[j]
                List[j]=tem
        
dummyList=[8, 32, 18, 53, 21, 23, 3, 81, 38, 14, 61, 7, 56, 31, 50, 44, 16, 17, 42, 57, 95, 55, 100, 78, 9, 68, 24, 75, 69, 96, 28, 84, 82, 2, 36, 94, 80, 15, 39, 99, 43, 25, 10, 87, 63, 41, 72, 65, 35, 12, 60, 33, 79, 90, 5, 51, 54, 74, 37, 40, 11, 93, 59, 98, 27, 49, 89, 83, 77, 86, 91, 97, 46, 1, 6, 76, 45, 73, 52, 88, 70, 13, 47, 85, 4, 34, 22, 20, 92, 62, 19, 64, 71, 66, 30, 26, 29, 58, 48, 67]
#InsersitonSort(dummyList)
#BubbleSort(dummyList)
#print(MergeSort(dummyList))
#QuickSort(dummyList,0,len(dummyList)-1)

#SelectionSort(dummyList)
#print(dummyList)
