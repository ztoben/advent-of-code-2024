export default async function () {
    const inputFile = Bun.file('solutions/day-7/input.txt');
    const inputText = await inputFile.text();
    const inputs = inputText.split('\n').filter(Boolean)

    let total = 0;

    inputs.forEach((input: string) => {
        if (hasSolution(input)) {
            total += getInputValue(input);
        }
    });

    return total;
}

const USABLE_OPERATORS = ['+', '*'];

function hasSolution(input: string, operators: string[] = []): boolean {
    const [value, rawInputs] = input.split(':');
    const inputValues = rawInputs.split(' ').filter(Boolean);
    const newOperators = [...operators];

    if (newOperators.length === inputValues.length - 1) {
        const mashedInputsAndOperators: string[] = [];
        for (let i = 0; i < inputValues.length; i++) {
            mashedInputsAndOperators.push(inputValues[i]);
            if (i < newOperators.length) {
                mashedInputsAndOperators.push(newOperators[i]);
            }
        }

        return evaluateInput(mashedInputsAndOperators.join(' ')) === value;
    }

    for (let i = 0; i < USABLE_OPERATORS.length; i++) {
        newOperators.push(USABLE_OPERATORS[i]);
        if (hasSolution(input, newOperators)) {
            return true;
        }
        newOperators.pop();
    }

    return false;
}

function evaluateInput(input: string): string {
    const instructions = input.split(' ');
    let total = 0;

    let currentOperator = '+';
    for (const instruction of instructions) {
        if (USABLE_OPERATORS.includes(instruction)) {
            currentOperator = instruction;
        } else {
            if (currentOperator === '+') {
                total += parseInt(instruction);
            } else if (currentOperator === '*') {
                total *= parseInt(instruction);
            }
        }
    }

    return total.toString();
}

function getInputValue(input: string): number {
    const [value] = input.split(':');

    return parseInt(value);
}
