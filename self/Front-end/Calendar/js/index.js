function init() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let is_leap_year = (year / 4 == 0 &&
        year / 100 != 0) ? true : false;
    let max = maxDays(month, is_leap_year);




    console.log(
        day + ':' +
        nameMonth(month) + ':' +
        year + ' ' +
        is_leap_year + ' ' +
        max
    );
}

init();

function nameMonth(month) {
    switch (month) {
        case 0:
            return "Январь";
        case 1:
            return "Февраль";
        case 2:
            return "Май";
        case 3:
            return "Апрель";
        case 4:
            return "Март";
        case 5:
            return "Июнь";
        case 6:
            return "Июль";
        case 7:
            return "Август";
        case 8:
            return "Сентябрь";
        case 9:
            return "Октябрь";
        case 10:
            return "Ноябрь";
        default:
            return "Декабрь";
    }
}

function maxDays(month, is_leap_year) {
    switch (month) {
        case 1:
            return ((is_leap_year) ? 29 : 28);
        case 3 || 5 || 8 || 10:
            return 30;
        default:
            return 31;
    }
}

function createCalendar(day, month, year, max) {
    for (let i = 0; i < max; i++) {
        let item = document.getElementsByClassName("days")
    }
}