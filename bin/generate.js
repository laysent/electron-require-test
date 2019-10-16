const path = require('path');
const fs = require('fs');

function getList(total) {
  return Array.from({ length: total }, (_, i) => i);
}

function getCode(num) {
  return [
    `export default function num_${num}() {`,
      `return ${num};`,
    '}',
  ].join('\n');
}

function getIndexCode(total) {
  const list = getList(total);

  return [
    list.map(num => `import num_${num} from './${num}.js';`),
    '',
    'export default function main() {',
      'var total = 0;',
      list.map(num => `total += num_${num}()`),
      'return total;',
    '}',
  ]
  .reduce((prev, curr) => prev.concat(curr), [])
  .join('\n');
}

const src = path.resolve(__dirname, '../src');
const generated = path.resolve(src, 'generated');
const TOTAL = process.env.TOTAL || 100;

function cleanGeneratedCode() {
  fs
    .readdirSync(generated)
    .filter(filename => filename.indexOf('.js') > 0)
    .forEach(filename => fs.unlinkSync(path.resolve(generated, filename)));
}

function createGeneratedCode() {
  getList(TOTAL)
  .forEach(num => {
    const code = getCode(num);
    const filepath = path.resolve(generated, `${num}.js`);
    fs.writeFileSync(filepath, code, 'utf8');
  });
}

function createIndexCode() {
  const index = getIndexCode(TOTAL);
  const indexpath = path.resolve(generated, 'index.js');
  fs.writeFileSync(indexpath, index, 'utf8');
}

cleanGeneratedCode();
createGeneratedCode();
createIndexCode();
