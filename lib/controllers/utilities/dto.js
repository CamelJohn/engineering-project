module.exports = file => {
  let mapped = [];
  for (let row of Object.keys(file)) {
    file[row].map(e => {
      mapped.push({
        course: {
          code: e['A'],
          name: e['B'],
          class: e['D'],
          practice: e['E'],
          labs: e['F'],
          points: e['G'],
          semester: +row.slice(1, 2),
          year: +row.slice(3, 4),
          major: row.slice(4).trim() !== '' ? row.slice(4).trim() : 'general',
        },
        preRequesites: [
          { code: e['H'], name: e['I'], year: undefined, semester: undefined, course: e['A'] },
          { code: undefined, name: undefined, year: undefined, semester: undefined, course: e['A'] },
          { code: undefined, name: undefined, year: undefined, semester: undefined, course: e['A'] },
        ],
        concurrentRequesites: [
          { code: e['K'], name: e['L'], year: undefined, semester: undefined, course: e['A'] },
          { code: undefined, name: undefined, year: undefined, semester: undefined, course: e['A'] },
          { code: undefined, name: undefined, year: undefined, semester: undefined, course: e['A'] },
        ],
      });
    });
  }
  return mapped;
};
