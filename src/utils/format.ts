export const formatDateTime = (dateTime: Date | null) => {
    if(!dateTime) return ''

    // Creating a Date object with the provided date string
    var date = new Date(dateTime);
  
    // Extracting the relevant parts of the date
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2); // Adds a leading zero if necessary
    var day = ("0" + date.getDate()).slice(-2); // Adds a leading zero if necessary

    var hours = ("0" + date.getHours()).slice(-2); // Adds a leading zero if necessary
    var minutes = ("0" + date.getMinutes()).slice(-2); // Adds a leading zero if necessary
    var seconds = ("0" + date.getSeconds()).slice(-2); // Adds a leading zero if necessary

    // Constructing the date string
    var formattedDate = day + "/" + month + "/" + year + " " + hours + ":" + minutes;

    // Returning the formatted date
    return formattedDate;
}