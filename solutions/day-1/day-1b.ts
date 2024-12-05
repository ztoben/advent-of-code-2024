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

    let similarity = 0;
    for (let i = 0; i < list1.length; i++) {
        const value = list1[i];

        let timesFound = 0;

        for (let j = 0; j < list2.length; j++) {
            if (list2[j] === value) {
                timesFound++;
            }
        }

        similarity += value * timesFound;
    }

    return similarity;
}
