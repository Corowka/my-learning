let array = [21, 1, 3, 7, 3, 6, 9, 67, 94, 77, 11, 52, 45, 64, 145];

function selectionSort(array) {
    let end = array.length;
    for (let i = 0; i < end - 1; i++) {
        let min = i;
        for (let j = i + 1; j < end; j++) {
            if (array[j] < array[min]) {
                min = j;
            }
        }
        let temp = array[i];
        array[i] = array[min];
        array[min] = temp;
    }
}

selectionSort(array);
arrayPrint(array);