module.exports = file => {
  let mapped = [];
  for (let row of Object.keys(file)) {
    file[row].map(e => {
      mapped.push({
        code: e['A'],
        name: e['B'],
        class: e['D'],
        parctice: e['E'],
        labs: e['F'],
        points: e['G'],
        prc1: e['H'],
        prn1: e['I'],
        crc1: e['K'],
        crn1: e['L'],
        prc1y: undefined,
        crc1y: undefined,
        prc1s: undefined,
        crc1s: undefined,
        semester: +row.slice(1, 2),
        year: +row.slice(3,4),
        major: row.slice(4).trim() !== '' ? row.slice(4).trim() : 'general'
      });
    });
  }    
  return mapped;
}