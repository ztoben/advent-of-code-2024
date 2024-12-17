export default async function () {
    const inputFile = Bun.file('solutions/day-9/input.txt');
    const inputText = await inputFile.text().then(text => text.trim());

    const blockMap = buildBlockMap(inputText.split(''));
    const mergedBlockMap: string[][] = mergeBlockMap(blockMap);
    const compressedBlockMap = compressBlockMap(mergedBlockMap);

    console.log(blockMap.join(''));
    console.log(compressedBlockMap);

    let total = 0;
    let processedIndex = 0;

    compressedBlockMap.forEach((block, index) => {
        if (block.includes('.')) {
            processedIndex += block.length;
            return;
        }

        block.forEach((character, i) => {
            total += parseInt(character) * (processedIndex);
            processedIndex += 1;
        });
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

function compressBlockMap(mergedBlockMap: string[][]): string[][] {
    const blockMapWithCombinedEmptySpace: string[][] = mergeSpaces(mergedBlockMap);
    let lowestNumberCompressed = 999999999999999;

    for (let blockToCompressIndex = blockMapWithCombinedEmptySpace.length - 1; blockToCompressIndex >= 0; blockToCompressIndex--) {
        const blockToCompress = blockMapWithCombinedEmptySpace[blockToCompressIndex];

        if (blockToCompress.includes('.')) {
            continue;
        }

        const emptyBlockIndex = blockMapWithCombinedEmptySpace.findIndex((newBlock, j) => j < blockToCompressIndex && newBlock.includes('.') && newBlock.length >= blockMapWithCombinedEmptySpace[blockToCompressIndex].length);
        const firstBlockValue = parseInt(blockToCompress[0]);

        if (lowestNumberCompressed < firstBlockValue) {
            continue;
        } else {
            lowestNumberCompressed = firstBlockValue;
        }

        if (emptyBlockIndex === -1) {
            continue;
        }

        const emptyBlock = blockMapWithCombinedEmptySpace[emptyBlockIndex];
        const excessEmptySpace = emptyBlock.length - blockToCompress.length;

        blockMapWithCombinedEmptySpace.splice(emptyBlockIndex, 1, blockToCompress);
        blockMapWithCombinedEmptySpace.splice(blockToCompressIndex, 1, new Array(blockToCompress.length).fill('.'));

        if (excessEmptySpace > 0) {
            blockMapWithCombinedEmptySpace.splice(emptyBlockIndex + 1, 0, new Array(excessEmptySpace).fill('.'));
            blockToCompressIndex += (excessEmptySpace - 1);
        }
    }

    return mergeSpaces(blockMapWithCombinedEmptySpace);
}

function mergeBlockMap(blockMap: string[]): string[][] {
    return blockMap.reduce((acc: string[][], block: string) => {
        if (acc.length === 0 || block === '.') {
            acc.push([block]);
        } else {
            const lastBlock = acc[acc.length - 1];
            if (lastBlock[0] === block) {
                lastBlock.push(block);
            } else {
                acc.push([block]);
            }
        }

        return acc;
    }, []);
}

function mergeSpaces(blockMap: string[][]): string[][] {
    const blockMapWithCombinedEmptySpace: string[][] = [];

    blockMap.forEach((block, index) => {
        if (!block.includes('.')) {
            blockMapWithCombinedEmptySpace.push(block);
        } else {
            const lastBlock = blockMapWithCombinedEmptySpace[blockMapWithCombinedEmptySpace.length - 1];
            if (lastBlock && lastBlock.includes('.')) {
                lastBlock.push(...block);
            } else {
                blockMapWithCombinedEmptySpace.push(block);
            }
        }
    });

    return blockMapWithCombinedEmptySpace;
}
