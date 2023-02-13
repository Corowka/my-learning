let array = [21, 1, 3, 7, 3, 6, 9, 67, 94, 77, 11, 52, 45, 64, 145];

function insertionSort(array) {
    let size = array.length;
    for (let i = 0; i < size - 1; i++) {
        for (let j = i; j > 0 && array[j - 1] > array[j]; j--) {
            let temp = array[j];
            array[j] = array[j - 1];
            array[j - 1] = temp;
        }
    }
}

insertionSort(array);
arrayPrint(array);