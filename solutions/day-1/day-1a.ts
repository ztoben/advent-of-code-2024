export default async function () {
    const inputFile = Bun.file('solutions/day-1/input.txt');
    const input = await inputFile.text();

    const lines: string[] = input.split('\n');
    const list1: number[] = [];
    const list2: number[] = [];

    lines.forEach(line => {
        const [num1, num2] = line.split('   ');

        if (num1 === undefined || num2 === undefined) {
            return;
        }

        list1.push(parseInt(num1, 10));
        list2.push(parseInt(num2, 10));
    })

    list1.sort((a, b) => a - b);
    list2.sort((a, b) => a - b);

    let sum = 0;
    for (let i = 0; i < list1.length; i++) {
        const value1 = list1[i];
        const value2 = list2[i];

        sum += Math.abs(value1 - value2);
    }

    return sum;
}
