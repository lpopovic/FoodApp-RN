import Moment from "moment";

function abbrNum(number, decPlaces) {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10, decPlaces);

    // Enumerate number abbreviations
    var abbrev = ["K", "M", "N", "T"];

    // Go through the array backwards, so we do the largest first
    for (var i = abbrev.length - 1; i >= 0; i--) {

        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10, (i + 1) * 3);

        // If the number is bigger or equal do the abbreviation
        if (size <= number) {
            // Here, we multiply by decPlaces, round, and then divide by decPlaces.
            // This gives us nice rounding to a particular decimal place.
            number = Math.round(number * decPlaces / size) / decPlaces;

            // Handle special case where we round up to the next abbreviation
            if ((number == 1000) && (i < abbrev.length - 1)) {
                number = 1;
                i++;
            }

            // Add the letter for the abbreviation
            number += abbrev[i];

            // We are done... stop
            break;
        }
    }

    return number;
}


function avgPriceTag(avgPriceTag) {
    switch (Number(avgPriceTag).toFixed(0)) {
        case '2':
            return "$$"
        case '3':
            return "$$$"
        case '4':
            return "$$$$"
        case '5':
            return "$$$$$"
        default:
            return "-"
    }
}

function openDays(openDays) {
    
    let currentDay;
    currentDay = openDays.find(item => { return item.day === Moment().day()})
    let from = Moment(currentDay.from).local().format('HH:mm')
    let to = Moment(currentDay.to).local().format('HH:mm')

    return `${from}-${to}`
}

export { abbrNum, avgPriceTag, openDays };