var differentCardSymbols = 24;

export function generateValues(numberOfPairs) {
    var values = [];

    while (values.length < numberOfPairs) {
        var value = Math.floor(Math.random()*differentCardSymbols);

        if (!itemIsInArray(values, value)) {
            values.push(value)
        }
    }

    values = [...values, ...values];
    values = shuffle(values);

    return values;
}

export function getBoardDimensions(numberOfPairs) {
    rows = 0;
    cols = 0;

    if (numberOfPairs < 6) {
        rows = 2;
        cols = numberOfPairs;
    } else if (numberOfPairs == 6) {
        rows = 3;
        cols = 4;
    } else if (numberOfPairs < 13) {
        rows = 4;
        cols = 6;
    } else {
        rows = 6;
        cols = 6;
    }

    return {rows: rows, cols: cols}
}

function itemIsInArray(array, searched) {
    for (item of array) {
        if (item === searched) {
            return true;
        }
    }

    return false;
}

function shuffle(arr) {
    var i;
    var j;
    var temp;

    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    return arr;
};