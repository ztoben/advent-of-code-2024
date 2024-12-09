export default async function () {
    const inputFile = Bun.file('solutions/day-6/input.txt');
    const inputText = await inputFile.text();
    const inputs = inputText.split('\n').filter(Boolean)
    const walkedMap = getWalkedMap(inputs);

    prettyPrintMap(walkedMap);

    return walkedMap.reduce((sum, row) => {
        return sum + row.split('').filter(char => char === 'X').length;
    }, 0);
}

type Direction = 'N' | 'E' | 'S' | 'W';

interface GuardPosition {
    coordinates: {
        x: number;
        y: number;
    },
    direction: Direction;
}

function getWalkedMap(inputs: string[]): string[] {
    const mapCopy = [...inputs];
    const position = readPosition(mapCopy);
    const nextPosition = {x: position.coordinates.x, y: position.coordinates.y};
    switch (position.direction) {
        case 'N':
            nextPosition.y -= 1;
            break;
        case 'E':
            nextPosition.x += 1;
            break;
        case 'S':
            nextPosition.y += 1;
            break;
        case 'W':
            nextPosition.x -= 1;
            break;
    }

    if (nextPosition.y < 0 || nextPosition.y >= mapCopy.length || nextPosition.x < 0 || nextPosition.x >= mapCopy[nextPosition.y].length) {
        mapCopy[position.coordinates.y] = mapCopy[position.coordinates.y].substring(0, position.coordinates.x) + 'X' + mapCopy[position.coordinates.y].substring(position.coordinates.x + 1);
        return mapCopy;
    }

    if (mapCopy[nextPosition.y][nextPosition.x] === '#') {
        const nextDirection = getRotatedDirection(position.direction);
        const nextPositionCharacter = getCharacterFromDirection(nextDirection);
        mapCopy[position.coordinates.y] = mapCopy[position.coordinates.y].substring(0, position.coordinates.x) + nextPositionCharacter + mapCopy[position.coordinates.y].substring(position.coordinates.x + 1);
    } else {
        mapCopy[nextPosition.y] = mapCopy[nextPosition.y].substring(0, nextPosition.x) + getCharacterFromDirection(position.direction) + mapCopy[nextPosition.y].substring(nextPosition.x + 1);
        mapCopy[position.coordinates.y] = mapCopy[position.coordinates.y].substring(0, position.coordinates.x) + 'X' + mapCopy[position.coordinates.y].substring(position.coordinates.x + 1);
    }

    return getWalkedMap(mapCopy);
}

function getRotatedDirection(direction: Direction): Direction {
    switch (direction) {
        case 'N':
            return 'E';
        case 'E':
            return 'S';
        case 'S':
            return 'W';
        case 'W':
            return 'N';
    }
}

function readPosition(inputs: string[]): GuardPosition {
    let x = -1;
    let y = -1;
    let direction: Direction = 'N';

    for (let i = 0; i < inputs.length; i++) {
        const row = inputs[i];
        for (let j = 0; j < row.length; j++) {
            const char = row[j];
            if (char === '>' || char === '<' || char === '^' || char === 'v') {
                x = j;
                y = i;
                direction = getDirectionFromCharacter(char);
                break;
            }
        }
    }

    return {
        coordinates: {x, y},
        direction
    };
}

function getDirectionFromCharacter(character: string): Direction {
    switch (character) {
        case '^':
            return 'N';
        case '>':
            return 'E';
        case 'v':
            return 'S';
        case '<':
            return 'W';
        default:
            throw new Error('Invalid character');
    }
}

function getCharacterFromDirection(direction: Direction): string {
    switch (direction) {
        case 'N':
            return '^';
        case 'E':
            return '>';
        case 'S':
            return 'v';
        case 'W':
            return '<';
        default:
            throw new Error('Invalid direction');
    }
}

function prettyPrintMap(map: string[]): void {
    for (let i = 0; i < map.length; i++) {
        console.log(map[i]);
    }
}
