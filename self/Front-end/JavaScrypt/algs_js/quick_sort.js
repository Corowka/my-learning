let array = [21, 1, 3, 7, 3, 6, 9, 67, 94, 77, 11, 52, 45, 64, 145];
var count = 0;

function quickSort(zarray, leftBorder, rightBorder) {
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
            let temp = array[leftMarker];
            array[leftMarker] = array[rightMarker];
            array[rightMarker] = temp;
        }
        leftMarker++;
        rightMarker--;
    } while (leftMarker <= rightMarker);
    if (leftBorder < rightMarker) {
        quickSort(array, leftBorder, rightMarker);
    }
    if (leftMarker < rightBorder) {
        quickSort(array, leftMarker, rightBorder);
    }
}

quickSort(array, 0, array.length - 1);
arrayPrint(array);