const xlsx = require('xlsx');

module.exports = (file, fileName) => {
  // target the file & parse to workbook object.
  const wb = xlsx.readFile(file);
  // target sheet from workbook object.
  const sheet = wb.Sheets[wb.SheetNames[0]];
  // prase sheet to json object.
  const data = xlsx.utils.sheet_to_json(sheet, { blankrows: false, header: 'A' });

  if (fileName === 'morning') {
    return {
      s1y1: data.slice(7, 13), // 1st semester of 1st year,
      s2y1: data.slice(17, 25), // 2nd semester of 1st year,
      s1y2: data.slice(30, 38), // 1st semester of 2nd year,
      s2y2: data.slice(42, 51), // 2nd semester of 2nd year,
      s1y3: data.slice(56, 66), // 1st semester of 3rd year,
      s2y3: data.slice(70, 77), // 2nd semester of 3rd year,
      s2y3mgmt: data.slice(81, 86), // managment major 2nd semeter of 3rd year,
      s2y3it: data.slice(90, 93), // information systems major 2nd semeter of 3rd year,
      s1y4: data.slice(98, 100), // 1st semester of 4th year,
      s1y4mgmt: data.slice(104, 107), // managment major 1st semeter of 4th year,
      s1y4it: data.slice(111, 115), // information systems major 1st semeter of 4th year,
      s2y4mgmt: data.slice(120, 125), // managment major 2nd semeter of 4th year,
      s2y4it: data.slice(129, 133), // information systems major 2nd semeter of 4th year,
    };
  } else {
    return {
      s1y1: data.slice(7, 10),
      s2y1: data.slice(14, 18),
      s3y1: data.slice(22, 26),
      s1y2: data.slice(31, 34),
      s2y2: data.slice(38, 45),
      s3y2: data.slice(49, 52),
      s1y3: data.slice(57, 63),
      s2y3: data.slice(67, 74),
      s3y3: data.slice(78, 81),
      s1y4: data.slice(86, 90),
      s2y4: data.slice(94, 102),
      s3y4: data.slice(106, 109),
      s3y4mgmt: data.slice(113, 114),
      s1y5: data.slice(120, 121),
      s1y5mgmt: data.slice(125, 129),
      s2y5mgmt: data.slice(134, 141),
    };
  }
};
