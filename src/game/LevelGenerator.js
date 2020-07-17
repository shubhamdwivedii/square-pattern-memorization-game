const MAX_ROWS = 6;
const MAX_COLS = 6;
const MAX_COUNT = 18;

const demoLevel = { // Test 
    rows: 4, cols: 4, cells: [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ], demo: 1000, time: 4000, checks: 4,
}

function getRowSize(round) {
    switch (round) {
        case 1: return { min: 3, max: 3 }
        case 2: return { min: 3, max: 4 }
        case 3: return { min: 4, max: 4 }
        case 4: return { min: 4, max: 4 }
        case 5: return { min: 4, max: 5 }
        case 6: return { min: 5, max: 5 }
        case 7: return { min: 5, max: 5 }
        case 8: return { min: 5, max: 6 }
        case 9: return { min: 5, max: 6 }
        case 10: return { min: 6, max: 6 }
        case 11: return { min: 6, max: 6 }
        case 12: return { min: 6, max: 6 }
        default: return { min: 6, max: 6 }
    }
}

function generate(round) {
    const rowsSize = getRowSize(round)

    const rows = Math.floor(Math.random() * (1 + (rowsSize.max - rowsSize.min))) + rowsSize.min;
    const cols = Math.floor(Math.random() * (1 +  (rowsSize.max - rowsSize.min))) + rowsSize.min; 
    
    const cells = [];
    let checks = 0;
    let count = 0;
    for (let i = 0; i < rows; i++) {
        const rr = []
        for (let j = 0; j < cols; j++) {
            if ((Math.floor(Math.random() * 10) % 3 === 0) && count < MAX_COUNT) {
                rr.push(1)
                checks += 1;
                count += 1;
            } else {
                rr.push(0)
            }
            // console.log("IJ", i, j)
        }
        cells.push(rr)
    }
    const time = checks*1000; 

    const level = {
        rows, cols, cells, demo: (time/4), time: (time * 3/4), checks,
    }

    console.log(level, "<<<<LEVEL")
    return level; 
}

const fixedLevels = [
    // { // Test 
    //     rows: 4, cols: 4, cells: [
    //         [1, 0, 0, 0],
    //         [0, 1, 0, 0],
    //         [0, 0, 1, 0],
    //         [0, 0, 0, 1],
    //     ], demo: 10, time: 100, checks: 4,
    // },
    { // 1
        rows: 5, cols: 4, cells: [
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 0, 1],
            [0, 0, 0, 0],
        ], demo: 750, time: 3000, checks: 6,
    },
    { // 2
        rows: 5, cols: 5, cells: [
            [1, 1, 0, 0, 0],
            [0, 1, 1, 0, 0],
            [1, 0, 0, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 0, 0, 0]
        ], demo: 750, time: 3000, checks: 7
    },
    { // 3
        rows: 6, cols: 5, cells: [
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 1],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 1, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0],
        ], demo: 750, time: 4000, checks: 8,
    },
    { // 4
        rows: 6, cols: 5, cells: [
            [0, 1, 0, 0, 0],
            [1, 0, 0, 1, 1],
            [1, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0],
        ], demo: 1000, time: 4000, checks: 9,
    },
    { // 5
        rows: 6, cols: 6, cells: [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [1, 0, 1, 0, 0, 0],
            [1, 1, 0, 0, 0, 0],
            [1, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 1, 0]
        ], demo: 1000, time: 5000, checks: 10,
    },
    { // 6
        rows: 6, cols: 6, cells: [
            [1, 0, 0, 1, 0, 0],
            [0, 1, 1, 0, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [1, 0, 0, 0, 1, 0],
        ], demo: 1000, time: 5000, checks: 11,
    },
    { // 7
        rows: 6, cols: 6, cells: [
            [0, 0, 0, 1, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 1, 1, 0, 0],
            [1, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 1, 0],
        ], demo: 1000, time: 5000, checks: 10,
    },
    { // 8
        rows: 6, cols: 6, cells: [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 1],
            [0, 0, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 1],
        ], demo: 1250, time: 5500, checks: 9,
    },
    { // 9
        rows: 6, cols: 6, cells: [
            [0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 1],
            [1, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 1],
            [1, 1, 0, 1, 0, 0],
        ], demo: 1250, time: 5500, checks: 10,
    },
    { // 10
        rows: 6, cols: 6, cells: [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 1, 0, 1],
            [0, 1, 1, 0, 1, 1],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 1, 0],
        ], demo: 1250, time: 6000, checks: 10,
    },
    { // 11
        rows: 6, cols: 6, cells: [
            [1, 1, 1, 1, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 1, 0, 1, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 1],
        ], demo: 1500, time: 6000, checks: 11,
    },

    { // 12
        rows: 6, cols: 6, cells: [
            [0, 0, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 0, 1, 0, 1, 1],
            [0, 1, 0, 1, 0, 0],
            [0, 0, 0, 0, 1, 0],
        ], demo: 1500, time: 6000, checks: 10,
    },

]

function next(round, random = false) {
    if (random) {
        return generate(round)
    } else {
        return fixedLevels[round - 1]
    }
}


export default next; 