export default async function () {
    const inputFile = Bun.file('solutions/day-5/input.txt');
    const inputText = await inputFile.text();
    const inputs = inputText.split('\n').filter(Boolean);

    const rulesFile = Bun.file('solutions/day-5/rules.txt');
    const rulesText = await rulesFile.text()
    const rules = rulesText.split('\n').filter(Boolean);

    const validInputs = [];
    let total = 0;

    for (let i = 0; i < inputs.length; i++) {
        const input: string[] = inputs[i].split(',');
        let isValid = true;

        for (let j = 0; j < rules.length; j++) {
            const rule = rules[j];
            const [num1, num2] = rule.split('|');
            if (input.includes(num1) && input.includes(num2)) {
                if (input.indexOf(num1) > input.indexOf(num2)) {
                    isValid = false;
                    break;
                }
            }
        }

        if (isValid) {
            validInputs.push(input);
        }
    }

    validInputs.forEach(input => {
        const center = Math.floor(input.length / 2);
        total += parseInt(input[center]);
    })

    return total;
}
