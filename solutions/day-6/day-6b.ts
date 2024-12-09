export default async function () {
    const inputFile = Bun.file('solutions/day-6/input.txt');
    const inputText = await inputFile.text();
    const inputs = inputText.split('\n').filter(Boolean)

    const obstructionPositions: {x: number, y: number}[] = [];
    for (let i = 0; i < inputs.length; i++) {
        const row = inputs[i];
        for (let j = 0; j < row.length; j++) {
            if (row[j] === '#' || row[j] === '^' || row[j] === '>' || row[j] === 'v' || row[j] === '<') {
                continue;
            }

            const obstructionMap = [...inputs];
            obstructionMap[i] = obstructionMap[i].substring(0, j) + '#' + obstructionMap[i].substring(j + 1);

            const walkedMap = getWalkedMap(obstructionMap);

            if (walkedMap === null) {
                obstructionPositions.push({x: j, y: i});
            }
        }
    }

    return obstructionPositions.length;
}

type Direction = 'N' | 'E' | 'S' | 'W';

interface GuardPosition {
    coordinates: {
        x: number;
        y: number;
    },
    direction: Direction;
}

const TIMES_HIT_BEFORE_INFINITE_LOOP = 10;

function getWalkedMap(inputs: string[], steppedPositions: {[key: string]: number} = {}): string[] | null {
    const mapCopy = [...inputs];
    const position = readPosition(mapCopy);

    // if the guard has already stepped on this position 10 times, it's an infinite loop
    const positionKey = `${position.coordinates.x},${position.coordinates.y}`;

    steppedPositions[positionKey] = steppedPositions[positionKey] ? steppedPositions[positionKey] + 1 : 1;

    if (steppedPositions[positionKey] === TIMES_HIT_BEFORE_INFINITE_LOOP) {
        return null;
    }

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

    return getWalkedMap(mapCopy, steppedPositions);
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
