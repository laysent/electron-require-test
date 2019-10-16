import main from './generated/index.js';

performance.mark('execute');
/**
 * We need to consume the result of `main`,
 * otherwise rollup will removed the code as it's not being used.
 */
console.log(main());
performance.measure('execute', 'execute');
performance.clearMarks('main');
performance.clearMeasures('main');
window.onload = function () {
  const time = performance.now();
  document.querySelector('#load-time').textContent = `Load: ${time.toFixed(2)}ms`;
};
