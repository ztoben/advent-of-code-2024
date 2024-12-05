export default async function () {
    const inputFile = Bun.file('solutions/day-2/input.txt');
    const input = await inputFile.text();

    const allReports: string[] = input.split('\n');
    let safeReports = [];

    for (const report of allReports) {
        const levels: number[] = report.split(' ').map(level => parseInt(level, 10))

        if (levels.length === 1) {
            continue;
        }

        if (isSafe(levels)) {
            safeReports.push(report);
            continue;
        }

        for (let i = 0; i < levels.length; i++) {
            const dampenedLevels = [...levels].splice(i, 1);

            if (isSafe(dampenedLevels)) {
                safeReports.push(report);
                break;
            }
        }
    }

    return safeReports.length;
}

const isSafe = (levels: number[]) => {
    const sortedLevels = [...levels].sort((a, b) => a - b);
    const ascending = JSON.stringify(levels) === JSON.stringify(sortedLevels);
    const descending = JSON.stringify(levels) === JSON.stringify(sortedLevels.reverse());

    if (ascending || descending) {
        return levels.every((level, idx): boolean => {
            if (idx === levels.length - 1) return true;
            const diff = Math.abs(level - levels[idx + 1]);

            return diff >= 1 && diff <= 3;
        });
    }

    return false;
}
