var differentCardSymbols = 24;

/**
 * Generates an suffled array of paired integers between 0-23.
 * 
 * The integers refer to symbol pictures (../assets/cardimages/)
 * 
 * @param {*} numberOfPairs 
 */
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

/**
 * Returns the amount of rows and cols according to the amount of card pairs.
 * 
 * @param {*} numberOfPairs 
 */
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

/**
 * Finds out if searched value is in an array.
 * 
 * @param {*} array 
 * @param {*} searched 
 */
function itemIsInArray(array, searched) {
    for (item of array) {
        if (item === searched) {
            return true;
        }
    }

    return false;
}

/**
 * Suffles and returns an array.
 * 
 * @param {*} arr 
 */
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