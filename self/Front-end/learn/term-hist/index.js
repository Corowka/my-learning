import sharp from "sharp";
import chalk from "chalk";

const path = "C:/Users/kopan/Downloads/kandinsky-download-1722802200983.png";

// sharp(path)
//   .raw()
//   .ensureAlpha()
//   .toBuffer({ resolveWithObject: true })
//   .then(({ data, info }) => {
//     const colors = new Map();
//     const n = 32;

//     for (let i = 0; i < data.length; i += 4) {
//       const color = JSON.stringify([
//         (Math.round(data[i] / n) + 0.5) * n,
//         (Math.round(data[i + 1] / n) + 0.5) * n,
//         (Math.round(data[i + 2] / n) + 0.5) * n,
//       ]);
//       if (colors.has(color)) {
//         colors.set(color, colors.get(color) + 1);
//       } else {
//         colors.set(color, 0);
//       }
//     }

//     const hist = Array.from(colors).sort((a, b) => b[1] - a[1]);
//     const histCount = hist.reduce((n, p) => n + p[1], 0);
//     const s = 150;
//     const histCut = hist.slice(0, s);
//     const histCutCount = histCut.reduce((n, p) => n + p[1], 0);

//     const out = "█▄";

//     const palettes = [];
//     const height = 250;
//     for (let i = 0; i < histCut.length; i++) {
//       const pair = histCut[i];
//       const color = JSON.parse(pair[0]);
//       const per = Math.round((pair[1] / histCutCount) * height);
//       palettes.push({ color: chalk.rgb(...color), count: per });
//     }

//     const maxCount = Math.trunc(
//       palettes.reduce((m, p) => Math.max(Math.ceil(p.count / out.length), m), 0)
//     );

//     const canvas = [];
//     for (let palette of palettes) {
//       let column = [];
//       for (let i = 0; i < height; i += out.length) {
//         const left = palette.count - Math.floor(i / out.length) * out.length;
//         if (left > out.length && left > 0) {
//           column.push(palette.color(out[0]));
//         } else if (left < out.length && left > 0) {
//           column.push(palette.color(out[out.length - (left % out.length)]));
//         } else {
//           column.push(palette.color(" "));
//         }
//       }
//       canvas.push(column);
//     }

//     for (let i = 0; i < maxCount; i++) {
//       let str = "";
//       for (let j = 0; j < s; j++) {
//         str += canvas[j][maxCount - i];
//       }
//       console.log(str);
//     }

//     console.log(`${Math.round((histCutCount / histCount) * 10000) / 100}%`);
//   });

const width = 100;

sharp(path)
  .raw()
  .ensureAlpha()
  .then((metadata) => {
    const newWidth = width;
    const newHeight = Math.round((width / metadata.width) * metadata.height);
  })
  .resize(newWidth, newWidth)
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    console.log(data);
  });
