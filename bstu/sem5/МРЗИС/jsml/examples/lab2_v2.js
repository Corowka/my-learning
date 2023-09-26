const plotly = require('plotly')('kopanchuke', '7ynuvUPn0RvSS624ADNe');
const OC_SVM = require('../models/OC_SVM.js');

const cx = 0;
const cy = 0;
const r = 1;
const n = 2;
const angles = Array.from({ length: n }, () => Math.random() * 2 * Math.PI);
// const x = angles.map((a) => cx + 2 * (Math.random() - 0.5) * r + Math.sin(a));
// const y = angles.map((a) => cy + 2 * (Math.random() - 0.5) * r + Math.cos(a));

const x = [1, 2, 0, 1];
const y = [2, 1, 1, 0];

const data = {
    x, y,
    xaxis: "x2",
    yaxis: "y2",
    mode: "markers",
    type: "scatter"
};

d = x.map((x, index) => [x, y[index]]);

const model = new OC_SVM();
model.fit(d);

// const layout = {
//     yaxis2: {
//         domain: [0, 0],
//         anchor: "x2"
//     },
//     xaxis2: {
//         domain: [0, 0],
//         anchor: "y2"
//     }
// };

// const graphOptions = { layout: layout, filename: "OC_CVM-test", fileopt: "overwrite" };
// plotly.plot(data, graphOptions, function (err, msg) {
//     console.log(msg);
// });
