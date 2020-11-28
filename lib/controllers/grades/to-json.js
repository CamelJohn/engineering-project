const xlsx = require('xlsx');

module.exports = file => {
  // target the file & parse to workbook object.
  const wb = xlsx.readFile(file);
  // target sheet from workbook object.
  const sheet = wb.Sheets[wb.SheetNames[0]];
  // prase sheet to json object.
  const data = xlsx.utils.sheet_to_json(sheet, { blankrows: false, header: 'A' });

  let courseCodes = data[1];
  let rawFields = data[2];
  let rawData = data.slice(3);

  // console.log(courseCodes['AA']);
  // console.log(rawFields);
  return rawData.map(data => {
    let row = {};
    for (const key of Object.keys(data)) {
          
      if (key === 'A') {
        row['pk'] = { value: data[key]}
      } else if (key === 'B') {
        row['id'] = { value: data[key]}
      } else if (key === 'C') {
        row['last_name'] = { value: data[key]}
      } else if (key === 'D') {
        row['first_name'] = { value: data[key]}
      } else if (key === 'E') {
        row['group'] = { value: data[key]}
      } else if (key === 'G') {
        row['status'] = { value: data[key]}
      } else if (key === 'H') {
        row['avg'] = { value: data[key]}
      } else if (key === 'I') {
        row['y1Avg'] = { value: data[key]}
      } else if (key === 'J') {
        row['nStayed'] = { value: data[key]}
      } else if (key === 'K') {
        row['departementChange'] = { value: data[key]}
      } else {
        row[rawFields[key]] = { value: data[key], code: courseCodes[key] };
      }
    }
    return row;
  });
};
