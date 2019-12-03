const possibleValues = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function generateValues(numberOfPairs) {
    var values = [];

    while (values.length < numberOfPairs) {
        var character = possibleValues.charAt(Math.floor(Math.random()*possibleValues.length))

        values.push(character)
    }

    console.log(values)

    return values;
}

export function getBoardMapping(numberOfPairs) {
    rows = 0;
    cols = 0;

    return {rows: rows, cols: cols}
}