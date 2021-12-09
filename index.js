#!/usr/bin/env node

const asciichart = require('asciichart');

async function readStdin() {
  const toPlot = [];
  return await new Promise((resolve, reject) => {
    process.stdin
      .on('error', err => reject(err))
      .on('data', chunk => toPlot.push(...chunk.toString().split('\n').map(v => +v).filter(v => !isNaN(v))))
      .on('end', () => resolve(toPlot));
  });
}
async function main() {
  try {
    const toPlot = await readStdin();
    console.log(asciichart.plot(toPlot, {height: 42}))
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

main();
