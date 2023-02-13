var visualisation;

function openMainPage() {
    stopVis();
    document.getElementById('settings').style.display = '';
    document.getElementById('visualization').style.display = 'none';
}

function refreash() {
    let size = itemHeight.length;
    for (let i = 0; i < size; i++) {
        let itemId = 'item-' + i;
        let item = document.getElementById(itemId);
        item.remove();
    }
}

function openVisPage() {
    document.getElementById('settings').style.display = 'none';
    document.getElementById('visualization').style.display = '';
    clearSwaps();
    stopVis();
    refreash();
    itemWidth = 90 / amount;
    for (let i = 0; i < amount; i++) {
        itemHeight[i] = Math.random() * 100;
        let item = document.createElement('div');
        let itemIdStr = "item-" + i;
        item.classList = "item ";
        item.id = itemIdStr;
        item.style.width = itemWidth + '%';
        item.style.height = itemHeight[i] + '%';
        conteiner.append(item);
    }
}

function stopVis() {
    index1 = [];
    index2 = [];
    clearInterval(visualisation);
}

function runVis() {
    let pairAmount = index1.length;
    let pairNum = 0;
    visualisation = setInterval(function() {
        if (pairNum >= pairAmount) {
            let item1 = document.getElementById('item-' + index1[pairNum - 1]);
            let item2 = document.getElementById('item-' + index2[pairNum - 1]);
            item1.style.boxShadow = "none";
            item2.style.boxShadow = "none";
            showSwaps();
            stopVis();
        } else {
            let temp = itemHeight[index1[pairNum]];
            itemHeight[index1[pairNum]] = itemHeight[index2[pairNum]];
            itemHeight[index2[pairNum]] = temp;
            let item1 = document.getElementById('item-' + index1[pairNum]);
            let item2 = document.getElementById('item-' + index2[pairNum]);
            item1.style.boxShadow = "0 0 30px 3px rgba(0, 0, 0, 0.88) inset";
            item2.style.boxShadow = "0 0 30px 3px rgba(0, 0, 0, 0.88) inset";
            let prevPair = (pairNum > 0) ? pairNum - 1 : 0;
            let prevItem1 = document.getElementById('item-' + index1[prevPair]);
            let prevItem2 = document.getElementById('item-' + index2[prevPair]);
            prevItem1.style.boxShadow = "none";
            prevItem2.style.boxShadow = "none";
            item1.style.height = itemHeight[index1[pairNum]] + '%';
            item2.style.height = itemHeight[index2[pairNum]] + '%';
            ++pairNum;
        }
    }, TIME_FOR_PAIR);
}

function showSwaps() {
    let item = document.getElementById('swaps');
    item.innerHTML = 'total_swaps ' + index1.length;
    let curOpacity = 0;
    let swapsVis = setInterval(function() {
        if (curOpacity === 100) {
            clearInterval(swapsVis);
        } else {
            item.style.opacity = ++curOpacity + '%';
        }
    }, 20);
}

function clearSwaps() {
    let item = document.getElementById('swaps');
    item.style.opacity = 0;
}


function bubbleSortVis() {
    openVisPage();
    bubbleSort();
    runVis();
}

function insertionSortVis() {
    openVisPage();
    insertionSort();
    runVis();
}

function selectionSortVis() {
    openVisPage();
    selectionSort();
    runVis();
}

function cocktailSortVis() {
    openVisPage();
    cocktailSort();
    runVis();
}

function quickSortVis() {
    openVisPage();
    let array = [];
    let size = itemHeight.length;
    for (let i = 0; i < size; i++) {
        array[i] = itemHeight[i];
    }
    quickSort(array, 0, array.length - 1);
    runVis();
}