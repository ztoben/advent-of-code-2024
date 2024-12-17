export default async function () {
    const inputFile = Bun.file('solutions/day-9/input.txt');
    const inputText = await inputFile.text().then(text => text.trim());

    const blockMap = buildBlockMap(inputText.split(''));
    const compressedBlockMap = compressBlockMap(blockMap);

    let total = 0;

    compressedBlockMap.filter(block => block !== '.').forEach((block, index) => {
        total += parseInt(block) * index;
    });

    return total;
}

function buildBlockMap(input: string[]): string[] {
    let blockMap: string[] = [];

    let character = -1;
    for (let i = 0; i < input.length; i++) {
        const count: number = parseInt(input[i]);

        if (i % 2 === 0) {
            character += 1;
            for (let j = 0; j < count; j++) {
                blockMap.push(character.toString());
            }
        } else {
            for (let j = 0; j < count; j++) {
                blockMap.push('.');
            }
        }
    }

    return blockMap;
}

function compressBlockMap(blockMap: string[]): string[] {
    const compressedBlockMap: string[] = [...blockMap];

    compressedBlockMap.forEach((block, index) => {
        if (block === '.') {
            const firstDotIndex = compressedBlockMap.indexOf('.');
            const lastNonDotIndex = compressedBlockMap.findLastIndex(block => block !== '.');

            if (firstDotIndex < lastNonDotIndex) {
                compressedBlockMap[index] = blockMap[lastNonDotIndex];
                compressedBlockMap[lastNonDotIndex] = '.';
            }
        }
    });

    return compressedBlockMap;
}
