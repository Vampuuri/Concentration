const possibleValues = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

export function generateValues(numberOfPairs) {
    var values = [];

    while (values.length < numberOfPairs) {
        var character = possibleValues.charAt(Math.floor(Math.random()*possibleValues.length))

        if (!itemIsInArray(values, character)) {
            values.push(character)
        }
    }

    console.log(values)

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