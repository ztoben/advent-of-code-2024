import { select } from '@inquirer/prompts';
import { readdirSync } from 'node:fs'

console.log('❄ ❄ ❄ ❄ ❄ ❄ Advent of Code 2024 ❄ ❄ ❄ ❄ ❄ ❄')

const days = readdirSync('./solutions');
const solutions = [];
for (const day of days) {
  const solutionFiles = readdirSync(`./solutions/${day}`);
  for (const solutionFile of solutionFiles) {
    if (!solutionFile.endsWith('.ts')) {
      continue;
    }

    solutions.push(`${day}/${solutionFile}`);
  }
}
solutions.sort();

const solution = await select({
  message: 'Select a solution to run',
  choices: solutions.map((solution, index) => ({ name: solution.split('/')[1].split('.')[0], value: solution }))
})

const { default: solutionFunction } = await import(`./solutions/${solution}`)
let output = solutionFunction()
if (output instanceof Promise) {
  output = await output
}

console.log(output)
