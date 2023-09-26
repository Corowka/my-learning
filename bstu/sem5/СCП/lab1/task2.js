const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

function randInt(a, b) {
    return Math.round(a + Math.random() * (0.5 + b - a));
}

const dates = Array.from({ length: 10 }, () => 
    `${randInt(1, 31)}/${randInt(1, 12)}/${randInt(1970, 2023)}` 
)

console.log(dates)

dates.map((date, i, dates) => {
    const d = date.split('/');
    dates[i] = d[0] + ' ' +  monthList[d[1]] + ' ' + d[2];
})

console.log(dates)