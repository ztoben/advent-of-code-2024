export default async function () {
    const inputFile = Bun.file('solutions/day-11/input.txt');
    const inputText = await inputFile.text().then(text => text.trim());
    const input = inputText.split(' ');

    const pebbleCount = getPebbleCount(input, 25);

    return pebbleCount;
}

function getPebbleCount(stones: string[], timesToBlink: number): number {
    if (timesToBlink === 0) {
        return stones.length;
    }

    const newStones: string[] = [];

    for (const stone of stones) {
        if (stone === '0') {
            newStones.push('1');
        } else if (stone.length % 2 === 0) {
            const half = stone.length / 2;
            newStones.push(parseInt(stone.slice(0, half)).toString());
            newStones.push(parseInt(stone.slice(half)).toString());
        } else {
            newStones.push((parseInt(stone) * 2024).toString());
        }
    }

    return getPebbleCount(newStones, timesToBlink - 1);
}
