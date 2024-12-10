export default async function () {
    const inputFile = Bun.file('solutions/day-8/input.txt');
    const inputText = await inputFile.text();
    const inputs = inputText.split('\n').filter(Boolean)

    const listOfAntinodes: {x: number, y: number}[] = getAntinodes(inputs);

    const map = inputs.map(row => row.split(''));
    listOfAntinodes.forEach(point => {
        map[point.y][point.x] = '#';
    });

    map.forEach(row => {
        console.log(row.join(''));
    });

    return map.reduce((sum, row) => {
        return sum + row.filter(cell => cell === '#').length;
    }, 0);
}

function getAntinodes(inputs: string[]): {x: number, y: number}[] {
    const signals = inputs.join('').split('').filter(signal => signal !== '.');
    const signalsToSearch = [...new Set(signals)].filter(signal => signals.filter(s => s === signal).length >= 2);
    const antinodes: {x: number, y: number}[] = [];

    signalsToSearch.forEach(signal => {
        const lines = getAllLinesForSignal(inputs, signal);

        lines.forEach(line => {
            const [point1, point2] = line;

            const dx = point2.x - point1.x;
            const dy = point2.y - point1.y;

            const newPoint1 = {x: point1.x - dx, y: point1.y - dy};
            const newPoint2 = {x: point2.x + dx, y: point2.y + dy};

            if (newPoint1.x >= 0 && newPoint1.y >= 0 && newPoint1.y < inputs.length && newPoint1.x < inputs[newPoint1.y].length) {
                antinodes.push(newPoint1);
            }

            if (newPoint2.x >= 0 && newPoint2.y >= 0 && newPoint2.y < inputs.length && newPoint2.x < inputs[newPoint2.y].length) {
                antinodes.push(newPoint2);
            }
        });
    });

    return antinodes;
}

function getAllLinesForSignal(inputs: string[], signal: string): {x: number, y: number}[][] {
    const signalPositions: {x: number, y: number}[] = [];

    for (let i = 0; i < inputs.length; i++) {
        const row = inputs[i];
        for (let j = 0; j < row.length; j++) {
            if (row[j] === signal) {
                signalPositions.push({x: j, y: i});
            }
        }
    }

    return getAllLinesForPoints(signalPositions);
}

function getAllLinesForPoints(points: {x: number, y: number}[]): {x: number, y: number}[][] {
    const lines: {x: number, y: number}[][] = [];

    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            lines.push([points[i], points[j]]);
        }
    }

    return [...new Set(lines.map(line => {
        return line.sort((a, b) => {
            if (a.x === b.x) {
                return a.y - b.y;
            }
            return a.x - b.x;
        });
    }))]
}
