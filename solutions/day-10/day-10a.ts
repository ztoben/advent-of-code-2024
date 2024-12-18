export default async function () {
    const inputFile = Bun.file('solutions/day-10/input.txt');
    const inputText = await inputFile.text().then(text => text.trim());

    const trailHeadScores: number[] = findAllTrailHeadScores(inputText.split('\n').map(row => row.split('')));

    const total = trailHeadScores.reduce((acc, score) => acc + score, 0);

    return total;
}

function findAllTrailHeadScores(inputs: string[][]): number[] {
    const trailHeadScores: number[] = [];

    for (let row = 0; row < inputs.length; row++) {
        for (let col = 0; col < inputs[row].length; col++) {
            if (inputs[row][col] === '0') {
                const trailHeadScore = findTrailHeadScore(inputs, row, col);
                trailHeadScores.push(trailHeadScore);
            }
        }
    }

    return trailHeadScores;
}

function findTrailHeadScore(inputs: string[][], row: number, col: number): number {
    let trailHeadScore = 0;

    const visited: boolean[][] = Array.from({length: inputs.length}, () => Array.from({length: inputs[0].length}, () => false));
    const queue: [number, number][] = [[row, col]];

    while (queue.length) {
        const [currentRow, currentCol] = queue.shift() as [number, number];

        if (visited[currentRow][currentCol]) {
            continue;
        }

        visited[currentRow][currentCol] = true;

        if (inputs[currentRow][currentCol] === '9') {
            trailHeadScore += 1;
            continue;
        }

        const neighbors = getValidNeighbors(inputs, currentRow, currentCol);
        if (neighbors.length === 0) {
            continue;
        }

        queue.push(...neighbors);
    }

    return trailHeadScore;

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
