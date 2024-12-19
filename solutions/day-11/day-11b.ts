export default async function () {
    const inputFile = Bun.file('solutions/day-11/input.txt');
    const inputText = await inputFile.text().then(text => text.trim());
    const input = inputText.split(' ');

    return getPebbleCount(input, 75);
}

function getPebbleCount(stones: string[], timesToBlink: number): number {
    let stoneCounts: { [key: number]: number } = {};

    for (const stone of stones) {
        const num = parseInt(stone);
        stoneCounts[num] = (stoneCounts[num] || 0) + 1;
    }

    for (let i = 0; i < timesToBlink; i++) {
        const newStoneCounts: { [key: number]: number } = {};

        for (const stone in stoneCounts) {
            const count = stoneCounts[stone];
            const num = parseInt(stone);

            if (num === 0) {
                newStoneCounts[1] = (newStoneCounts[1] || 0) + count;
            } else if (stone.length % 2 === 0) {
                const half = stone.length / 2;
                const left = parseInt(stone.slice(0, half));
                const right = parseInt(stone.slice(half));
                newStoneCounts[left] = (newStoneCounts[left] || 0) + count;
                newStoneCounts[right] = (newStoneCounts[right] || 0) + count;
            } else {
                const newNum = num * 2024;
                newStoneCounts[newNum] = (newStoneCounts[newNum] || 0) + count;
            }
        }

        stoneCounts = newStoneCounts;
    }

    return Object.values(stoneCounts).reduce((a, b) => a + b, 0);
}
