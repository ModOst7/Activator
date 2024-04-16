def binary_search(list, item):
    low = 0
    high = len(list) - 1

    while low <= high:
        mid = int((low + high) / 2)
        print(low, high, mid)
        guess = list[mid]
        if guess == item:
            return {"index": mid, "value": guess, "status": True}
        if guess > item:
            high = mid - 1
        else:
            low = mid + 1
    return {"index": None, "value": None, "status": False}


def findSmallest(arr):
    smallest = arr[0]
    smallest_index = 0
    for i in range(1, len(arr)):
        if arr[i] < smallest:
            smallest = arr[i]
            smallest_index = i
    return {"index": smallest_index, "value": smallest}


def selectionSort(arr: list):
    print(arr)
    arr = arr.copy()
    new_array = []
    for i in range(len(arr)):
        smallest = findSmallest(arr)
        new_array.append(arr.pop(smallest["index"]))
    print(arr)
    return new_array
