function swapAndSave(array, fst, snd) {
    let temp = array[fst];
    array[fst] = array[snd];
    array[snd] = temp;
    index1.push(fst);
    index2.push(snd);
}

function bubbleSort() {
    let array = [];
    let size = itemHeight.length;
    for (let i = 0; i < size; i++) {
        array[i] = itemHeight[i];
    }
    for (let i = 0; i < size - 1; i++) {
        for (let j = 0; j < size - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                swapAndSave(array, j, j + 1);
            }
        }
    }
}

function insertionSort() {
    let array = [];
    let size = itemHeight.length;
    for (let i = 0; i < size; i++) {
        array[i] = itemHeight[i];
    }
    for (let i = 0; i < size; i++) {
        for (let j = i; j > 0 && array[j - 1] > array[j]; j--) {
            swapAndSave(array, j, j - 1);
        }
    }
}

function selectionSort() {
    let array = [];
    let size = itemHeight.length;
    for (let i = 0; i < size; i++) {
        array[i] = itemHeight[i];
    }
    let end = array.length;
    for (let i = 0; i < end - 1; i++) {
        let min = i;
        for (let j = i + 1; j < end; j++) {
            if (array[j] < array[min]) {
                min = j;
            }
        }
        swapAndSave(array, i, min);
    }
}

function quickSort(array, leftBorder, rightBorder) {
    let leftMarker = leftBorder;
    let rightMarker = rightBorder;
    let pivot = array[Math.floor((leftMarker + rightMarker) / 2)];
    do {
        while (array[leftMarker] < pivot && leftMarker <= rightBorder) {
            leftMarker++;
        }
        while (array[rightMarker] > pivot && leftBorder <= rightMarker) {
            rightMarker--;
        }
        if (leftMarker <= rightMarker) {
            if (leftMarker < rightMarker) {
                swapAndSave(array, leftMarker, rightMarker);
            }
            leftMarker++;
            rightMarker--;
        }
    } while (leftMarker <= rightMarker);
    if (leftBorder < rightMarker) {
        quickSort(array, leftBorder, rightMarker);
    }
    if (leftMarker < rightBorder) {
        quickSort(array, leftMarker, rightBorder);
    }
}

function cocktailSort() {
    let array = [];
    let size = itemHeight.length;
    for (let i = 0; i < size; i++) {
        array[i] = itemHeight[i];
    }
    let leftMarker = 0;
    let rightMarker = array.length - 1;
    do {
        for (let i = leftMarker; i < rightMarker; i++)
            if (array[i] > array[i + 1]) {
                swapAndSave(array, i, i + 1);
            }
        rightMarker--;
        for (let i = rightMarker; i > leftMarker; i--)
            if (array[i - 1] > array[i]) {
                swapAndSave(array, i - 1, i);
            }
        leftMarker++;
    } while (leftMarker < rightMarker);
}