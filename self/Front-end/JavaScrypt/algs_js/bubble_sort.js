let array = [21, 1, 3, 7, 3, 6, 9, 67, 94, 77, 11, 52, 45, 64, 145];

function bubbleSort(array) {
    let size = array.length;
    for (let i = 0; i < size - 1; i++) {
        for (let j = 0; j < size - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
}

bubbleSort(array);
arrayPrint(array);