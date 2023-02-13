const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let item = 5;

function binarySearch(array, item) {
    let start = 0;
    let end = array.length;
    let mid;
    while (start <= end) {
        mid = Math.floor((start + end) / 2);
        if (array[mid] == item) {
            return mid
        }
        if (array[mid] > item) {
            end = mid - 1;
        }
        if (array[mid] < item) {
            start = mid + 1;
        }
    }
    return null;
}

console.log('binarySearch - ' + binarySearch(array, item));