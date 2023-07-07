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

export function calculateAge(dateOfBirth: Date): string {
    const currentDate: Date = new Date();
    const currentYear: number = currentDate.getFullYear();
    const birthYear: number = dateOfBirth.getFullYear();
    const currentMonth: number = currentDate.getMonth();
    const birthMonth: number = dateOfBirth.getMonth();
    const currentDay: number = currentDate.getDate();
    const birthDay: number = dateOfBirth.getDate();
  
    let age: string;
  
    // Calculate the difference in years and months
    const yearDiff: number = currentYear - birthYear;
    const monthDiff: number = currentMonth - birthMonth;
  
    if (yearDiff === 0 && monthDiff === 0) {
      age = "menos de 1 mês";
    } else if (yearDiff === 0) {
      age = `${monthDiff} meses`;
    } else if (yearDiff === 1 && monthDiff < 0) {
      age = `${12 - birthMonth + currentMonth} meses`;
    } else if (yearDiff === 1 && monthDiff === 0 && currentDay < birthDay) {
      age = `${12 - birthMonth + currentMonth} meses`;
    } else if (yearDiff === 1) {
      age = "1 ano";
    // } else if (yearDiff > 1 && monthDiff < 0) {
    //   age = `${yearDiff - 1} anos e ${12 - birthMonth + currentMonth} meses`;
    // } else if (yearDiff > 1 && monthDiff === 0 && currentDay < birthDay) {
    //   age = `${yearDiff - 1} anos e ${12 - birthMonth + currentMonth} meses`;
    } else {
      age = `${yearDiff} anos`;
    }
  
    return age;
  }