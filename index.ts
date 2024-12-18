import { select } from '@inquirer/prompts';
import { readdirSync } from 'node:fs'
import { parseArgs } from 'util';

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

solutions.sort((a, b) => {
  const dayA = parseInt(a.split('-')[1]);
  const dayB = parseInt(b.split('-')[1]);

  if (dayA === dayB) {
    return a.localeCompare(b);
  }

  return dayA - dayB;
});

const { values: {day, part} } = parseArgs({
  args: Bun.argv,
  options: {
    day: {
      type: 'string',
    },
    part: {
      type: 'string',
    }
  },
  strict: true,
  allowPositionals: true,
});

let output;

if (day && part) {
  const solution = solutions.find(solution => solution.includes(`day-${day}${part}`))
  if (!solution) {
    console.error(`No solution found for day ${day}, part ${part}`)
    process.exit(1)
  }

  console.log(`Running solution day-${day}${part}:`)

  const { default: solutionFunction } = await import(`./solutions/${solution}`)
  output = solutionFunction()
  if (output instanceof Promise) {
    output = await output
  }

} else {
  console.log('❄ ❄ ❄ ❄ ❄ ❄ Advent of Code 2024 ❄ ❄ ❄ ❄ ❄ ❄')

  const solution = await select({
    message: 'Select a solution to run:',
    choices: solutions.map((solution, index) => ({ name: solution.split('/')[1].split('.')[0], value: solution }))
  })

  const { default: solutionFunction } = await import(`./solutions/${solution}`)
  output = solutionFunction()
  if (output instanceof Promise) {
    output = await output
  }
}

console.log(output)
