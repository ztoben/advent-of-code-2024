import { select } from '@inquirer/prompts';
import { readdirSync } from 'node:fs'

console.log('❄ ❄ ❄ ❄ ❄ ❄ Advent of Code 2024 ❄ ❄ ❄ ❄ ❄ ❄')

const solutions = readdirSync('./solutions').sort()

const solution = await select({
  message: 'Select a solution to run',
  choices: solutions.map((solution, index) => ({ name: solution, value: solution })),
})

const { default: solutionFunction } = await import(`./solutions/${solution}`)
const output = solutionFunction()
console.log(output)
