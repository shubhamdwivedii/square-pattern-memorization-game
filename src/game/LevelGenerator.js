const MAX_ROWS = 6;  
const MAX_COLS = 6; 
const MAX_COUNT = 18; 

function generate(round) {
    const rows = Math.floor(Math.random() * (MAX_ROWS-3)) + 4;
    const cols = Math.floor(Math.random() * (MAX_COLS-3)) + 4; 

    const cells = []; 
    let checks = 0; 
    let count = 0; 
    for (let i = 0; i < rows; i++) {
        const rr = []
        for (let j = 0; i < cols; j++) {
            if ((Math.floor(Math.random() * 10)%3 === 0) && count < MAX_COUNT) {
                rr.push(1)
                checks += 1; 
                count += 1; 
            } else {
                rr.push(0)
            }
        }
        cells.push(rr)
    }

    return {
        rows, cols, cells, demo: 1500, time: 6000, checks,
    }

}

const fixedLevels = [
    {
        rows: 5, cols: 4, cells: [
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 0, 1],
            [0, 0, 0, 0],
        ], demo: 750, time: 3000, checks: 6, 
    },
    {
        rows: 5, cols: 5, cells: [
            [1, 1, 0, 0, 0],
            [0, 1, 1, 0, 0],
            [1, 0, 0, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 0, 0, 0]
        ], demo: 750, time: 3000, checks: 7
    },
    {
        rows: 6, cols: 5, cells: [
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 1],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 1, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0],
        ], demo: 750, time: 4000, checks: 8, 
    },
    {
        rows: 6, cols: 5, cells: [
            [0,1,0,0,0],
            [1,0,0,1,1],
            [1,0,0,0,0],
            [0,1,1,1,0],
            [0,0,0,0,1],
            [0,0,0,0,0],
        ], demo: 1000, time: 4000, checks: 9,
    }
]

function next(round, random = false) {
    if (random) {
        return generate(round)
    } else {
        return fixedLevels[round-1]
    }
}

export default next; 