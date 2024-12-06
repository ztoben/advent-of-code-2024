export default async function () {
    const inputFile = Bun.file('solutions/day-4/input.txt');
    const input = await inputFile.text();

    const lines: string[] = input.split('\n');
    const searchTerm = 'XMAS';
    const startingLetter = searchTerm[0];

    let total = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        for (let j = 0; j < line.length; j++) {
            const letter = line[j];

            if (letter === startingLetter) {
                const found = findWord(searchTerm, i, j, lines);
                total += found;
            }
        }
    }

    return total;
}

function findWord(word: string, i: number, j: number, lines: string[]): number {
    let found = 0;

    // Check horizontally
    const horizontal = lines[i].slice(j, j + word.length);

    if (horizontal === word) {
        found++;
    }

    const reverseHorizontal = lines[i].slice(j - word.length + 1, j + 1).split('').reverse().join('');

    if (reverseHorizontal === word) {
        found++;
    }

    // Check vertically
    let vertical = '';

    for (let k = 0; k < word.length; k++) {
        const line = lines[i + k];

        if (line === undefined) {
            break;
        }

        vertical += line[j];
    }

    if (vertical === word) {
        found++;
    }

    let reverseVertical = '';

    for (let k = 0; k < word.length; k++) {
        const line = lines[i - k];

        if (line === undefined) {
            break;
        }

        reverseVertical += line[j];
    }

    if (reverseVertical === word) {
        found++;
    }

    // Check diagonally in all 4 directions
    let topLeftDiagonal = '';

    for (let k = 0; k < word.length; k++) {
        const line = lines[i - k];

        if (line === undefined) {
            break;
        }

        topLeftDiagonal += line[j - k];
    }

    if (topLeftDiagonal === word) {
        found++;
    }

    let topRightDiagonal = '';

    for (let k = 0; k < word.length; k++) {
        const line = lines[i - k];

        if (line === undefined) {
            break;
        }

        topRightDiagonal += line[j + k];
    }

    if (topRightDiagonal === word) {
        found++;
    }

    let bottomLeftDiagonal = '';

    for (let k = 0; k < word.length; k++) {
        const line = lines[i + k];

        if (line === undefined) {
            break;
        }

        bottomLeftDiagonal += line[j - k];
    }

    if (bottomLeftDiagonal === word) {
        found++;
    }

    let bottomRightDiagonal = '';

    for (let k = 0; k < word.length; k++) {
        const line = lines[i + k];

        if (line === undefined) {
            break;
        }

        bottomRightDiagonal += line[j + k];
    }

    if (bottomRightDiagonal === word) {
        found++;
    }

    return found;
}
