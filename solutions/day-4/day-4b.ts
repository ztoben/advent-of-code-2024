export default async function () {
    const inputFile = Bun.file('solutions/day-4/input.txt');
    const input = await inputFile.text();

    const lines: string[] = input.split('\n');
    const searchTerm = 'MAS';

    const locations: Location[] = [];

    for (let rowIndex = 0; rowIndex < lines.length; rowIndex++) {
        const line = lines[rowIndex];

        for (let columnIndex = 0; columnIndex < line.length; columnIndex++) {
            const crossingMatch = getCrossingMatch(searchTerm, rowIndex, columnIndex, lines);

            if (crossingMatch !== null) {
                locations.push(crossingMatch);
            }
        }
    }

    return [...new Set(locations)].length;
}

interface Location {
    x: number;
    y: number;
}

function getCrossingMatch(word: string, rowIndex: number, columnIndex: number, lines: string[]): Location | null {
    const wordOffset = Math.floor(word.length / 2);

    const topLeft = { x: columnIndex - wordOffset, y: rowIndex - wordOffset };
    const topRight = { x: columnIndex + wordOffset, y: rowIndex - wordOffset };

    const diagonal1 = [];
    const diagonal2 = [];

    for (let i = 0; i < word.length; i++) {
        const line1 = lines[topLeft.y + i];
        const line2 = lines[topRight.y + i];

        if (line1 === undefined || line2 === undefined) {
            return null;
        }

        diagonal1.push(line1[topLeft.x + i]);
        diagonal2.push(line2[topRight.x - i]);
    }

    const match1 = diagonal1.join('') === word || diagonal1.reverse().join('') === word;
    const match2 = diagonal2.join('') === word || diagonal2.reverse().join('') === word;

    if (match1 && match2) {
        return { x: columnIndex, y: rowIndex };
    }

    return null;
}
