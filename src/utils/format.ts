import moment from 'moment-timezone';

moment.tz.setDefault('America/Sao_Paulo');

export const momentDate = (date?: Date | string) => {
    if(date) {
        return moment(date)
    }
    return moment()
}

export const formatDateTime = (dateTime: Date | null) => {
    if(!dateTime) return ''

    // Creating a Date object with the provided date string
    var date = moment(dateTime).format('DD/MM/YYYY - HH:mm');
    return date
  
    // Extracting the relevant parts of the date
    // var year = dateTime.getFullYear();
    // var month = ("0" + (dateTime.getMonth() + 1)).slice(-2); // Adds a leading zero if necessary
    // var day = ("0" + dateTime.getDay()).slice(-2); // Adds a leading zero if necessary

    // var hours = ("0" + dateTime.getHours()).slice(-2); // Adds a leading zero if necessary
    // var minutes = ("0" + dateTime.getMinutes()).slice(-2); // Adds a leading zero if necessary
    // var seconds = ("0" + dateTime.getSeconds()).slice(-2); // Adds a leading zero if necessary

    // Constructing the date string
    // var formattedDate = day + "/" + month + "/" + year + " - " + hours + ":" + minutes;

    // Returning the formatted date
    // return formattedDate;
}

export const formatTime = (dateTime: Date | null) => {
    if(!dateTime) return ''

    var date = moment(dateTime).format('HH:mm');
    return date

    // Creating a Date object with the provided date string
    // var date = new Date(dateTime);

    // var hours = ("0" + dateTime.getHours()).slice(-2); // Adds a leading zero if necessary
    // var minutes = ("0" + dateTime.getMinutes()).slice(-2); // Adds a leading zero if necessary

    // // Constructing the date string
    // var formattedDate = hours + ":" + minutes;

    // // Returning the formatted date
    // return formattedDate;
}