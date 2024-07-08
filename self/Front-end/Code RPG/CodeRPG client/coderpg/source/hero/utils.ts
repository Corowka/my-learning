// const stats = {
//   attackSpeed: 1000,
//   physicalDamage: 1000,
//   magicDamage: 1000,
//   armor: 1000,
//   magicResist: 1000,
//   health: 1000,
//   evasion: 1000,
// };

// const y = (x) => {
//   return (2 - ((x - 7) / 7) ** 2) * 1000;
// };

// const getStats = (stats, rarity) => {
//   const total = y(rarity)
//   let vecLength = 0;
//   for (let value of Object.values(stats)) {vecLength += value ** 2;}
//   vecLength = Math.sqrt(vecLength);
//   const statsArr = [
//     stats.attackSpeed, stats.physicalDamage, stats.magicDamage,
//     stats.armor, stats.magicResist, stats.health, stats.evasion,
//   ];
//   const statsArrNorm = statsArr.map((s, i) => (s / vecLength) * Object.values(stats)[i]);
//   const sumOfNormValues = statsArrNorm.reduce((acc, curr) => acc + curr, 0);
//   const adjustmentFactor = total / sumOfNormValues;
//   const normalizedAdjusted = statsArrNorm.map(value => Math.round(value * adjustmentFactor));
//   const newStats = {};
//   Object.keys(stats).forEach((key, i) => { newStats[key] = normalizedAdjusted[i]; });
//   return newStats;
// };

// console.log(getStats({
//   attackSpeed: 0.5,
//   physicalDamage: 1.1,
//   magicDamage: 4,
//   armor: 1.3,
//   magicResist: 1.5,
//   health: 2,
//   evasion: 0.3,
// }, 4));
