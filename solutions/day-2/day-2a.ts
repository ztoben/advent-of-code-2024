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

        const sortedLevels = [...levels].sort((a, b) => a - b);
        const ascending = JSON.stringify(levels) === JSON.stringify(sortedLevels);
        const descending = JSON.stringify(levels) === JSON.stringify(sortedLevels.reverse());

        if (ascending || descending) {
            const isSafe = levels.every((level, idx) => {
                if (idx === levels.length - 1) return true;
                const diff = Math.abs(level - levels[idx + 1]);

                return diff >= 1 && diff <= 3;
            });

            if (isSafe) {
                safeReports.push(report);
            }
        }
    }

    return safeReports.length;
}
