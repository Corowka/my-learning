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

const random = Array.from({length: 12}, () =>  
    Math.round(Math.random() * 1000) / 10
)

for (let i = 0; i < 12; i++) {
    console.log(`${monthList[i]} --> ${random[i]}`)
}