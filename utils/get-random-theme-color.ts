const COLORS = [
    // '#d3e5ff',
    '#3291ff',
    '#0070f3',
    '#0761d1',
    // '#f7d4d6',
    '#ff1a1a',
    '#e00',
    '#c50000',
    // '#ffefcf',
    '#f7b955',
    // '#f5a623',
    // '#ab750a',
    // '#aaffec',
    // '#79ffe1',
    '#50e3c2',
    '#29bc9b',
    // '#e3d7fc',
    '#8a63d2',
    '#7928ca',
    '#4c2889',
    '#ff0080',
    '#f81ce5',
    '#eb367f'
]

const getRandomThemeColor = (): string => {
    return COLORS[Math.floor(Math.random() * COLORS.length)]
}

export default getRandomThemeColor