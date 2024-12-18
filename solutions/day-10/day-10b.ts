export default async function () {
    const inputFile = Bun.file('solutions/day-10/input.txt');
    const inputText = await inputFile.text().then(text => text.trim());
    const input = inputText.split('\n').map(row => row.split(''));

    const trailHeads: Map<string, string[]>[] = findAllValidTrails(input);

    let totalScore = 0;

    trailHeads.forEach(trailHead => {
        trailHead.forEach((ends, start) => {
            ends.forEach(end => {
                const [startRow, startCol] = start.split(',').map(Number);
                const [endRow, endCol] = end.split(',').map(Number);
                const score = findNumberOfPaths(input, [startRow, startCol], [endRow, endCol]);
                totalScore += score;
            });
        });
    });

    return totalScore;
}

function findAllValidTrails(inputs: string[][]): Map<string, string[]>[] {
    const validTrailHeads = [];

    for (let row = 0; row < inputs.length; row++) {
        for (let col = 0; col < inputs[row].length; col++) {
            if (inputs[row][col] === '0') {
                const trailHeads = findTrails(inputs, row, col);
                validTrailHeads.push(trailHeads);
            }
        }
    }

    return validTrailHeads;
}

function findTrails(inputs: string[][], row: number, col: number): Map<string, string[]> {
    const trailHeads = new Map<string, string[]>();

    const visited: boolean[][] = Array.from({length: inputs.length}, () => Array.from({length: inputs[0].length}, () => false));
    const queue: [number, number][] = [[row, col]];
    const start = `${row},${col}`;
    const ends: string[] = [];

    while (queue.length) {
        const [currentRow, currentCol] = queue.shift() as [number, number];

        if (visited[currentRow][currentCol]) {
            continue;
        }

        visited[currentRow][currentCol] = true;

        if (inputs[currentRow][currentCol] === '9') {
            ends.push(`${currentRow},${currentCol}`);
            continue;
        }

        const neighbors = getValidNeighbors(inputs, currentRow, currentCol);
        if (neighbors.length === 0) {
            continue;
        }

        queue.push(...neighbors);
    }

    if (ends.length > 0) {
        trailHeads.set(start, ends);
    }

    return trailHeads;
}

function getValidNeighbors(inputs: string[][], row: number, col: number): [number, number][] {
    const neighbors: [number, number][] = [];

    const currentVal = parseInt(inputs[row][col]);
    const validValue = currentVal + 1;

    if (row - 1 >= 0 && parseInt(inputs[row - 1][col]) === validValue) {
        neighbors.push([row - 1, col]);
    }

    if (row + 1 < inputs.length && parseInt(inputs[row + 1][col]) === validValue) {
        neighbors.push([row + 1, col]);
    }

    if (col - 1 >= 0 && parseInt(inputs[row][col - 1]) === validValue) {
        neighbors.push([row, col - 1]);
    }

    if (col + 1 < inputs[0].length && parseInt(inputs[row][col + 1]) === validValue) {
        neighbors.push([row, col + 1]);
    }

    return neighbors;
}

function findNumberOfPaths(inputs: string[][], pointA: [number, number], pointB: [number, number]): number {
    const queue: [number, number][] = [pointA];
    let paths = 0;

    while (queue.length) {
        const [currentRow, currentCol] = queue.shift() as [number, number];
        if (currentRow === pointB[0] && currentCol === pointB[1]) {
            paths++;
            continue;
        }

        const neighbors = getValidNeighbors(inputs, currentRow, currentCol);
        if (neighbors.length === 0) {
            continue;
        }

        queue.push(...neighbors);
    }

    return paths;
}
