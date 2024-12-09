export default async function () {
    const inputFile = Bun.file('solutions/day-5/input.txt');
    const inputText = await inputFile.text();
    const inputs: string[][] = inputText.split('\n').filter(Boolean).map(input => input.split(','));

    const rulesFile = Bun.file('solutions/day-5/rules.txt');
    const rulesText = await rulesFile.text()
    const rules = rulesText.split('\n').filter(Boolean);

    const invalidInputs: string[][] = [];
    let total = 0;

    inputs.forEach((input: string[]) => {
        if (!isValid(input, rules)) {
            invalidInputs.push(input);
        }
    });

    const validInputs: string[][] = invalidInputs.map(input => makeInputValid(input, rules));

    validInputs.forEach((input: string[]) => {
        const center = Math.floor(input.length / 2);
        total += parseInt(input[center]);
    })

    return total;
}

function makeInputValid(input: string[], rules: string[]): string[] {
    let valid = isValid(input, rules);

    if (valid) {
        return input;
    }

    const newInput = [...input];

    for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        const [num1, num2] = rule.split('|');

        if (newInput.includes(num1) && newInput.includes(num2)) {
            if (newInput.indexOf(num1) > newInput.indexOf(num2)) {
                const num1Index = newInput.indexOf(num1);
                const num2Index = newInput.indexOf(num2);

                newInput[num1Index] = num2;
                newInput[num2Index] = num1;

                if (isValid(newInput, rules)) {
                    return newInput;
                }
            }
        }
    }

    return makeInputValid(newInput, rules);
}

function isValid(input: string[], rules: string[]): boolean {
    let isValid = true;

    for (const rule of rules) {
        const [num1, num2] = rule.split('|');
        if (input.includes(num1) && input.includes(num2)) {
            if (input.indexOf(num1) > input.indexOf(num2)) {
                isValid = false;
                break;
            }
        }
    }

    return isValid;
}
