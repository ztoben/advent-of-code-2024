export default async function () {
    const inputFile = Bun.file('solutions/day-3/input.txt');
    const input = await inputFile.text();

    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    const matches = input.match(regex) || [];

    let total = 0;
    for (const match of matches) {
        const values = match.match(/\d{1,3}/g);

        if (values === null) {
            continue;
        }

        const [a, b] = values.map(value => parseInt(value, 10));
        total += a * b;
    }

    return total;
}
