const filePath = './lib/assets';
const { exec } = require('child_process');
const lisFiles = require('./lib/controllers/utilities/list-files');
const mapToDto = require('./lib/controllers/utilities/dto');
const parseFile = require('./lib/controllers/utilities/parse-file-to-json');
const trailingHandler = require('./lib/controllers/utilities/handle-trailing');

exec(`ls ${filePath}`, async (err, stdout, stderr) => {
  let filename = 'morning.xlsx';
  if (err) {
    return console.log(stderr);
  }

  // list the files in the folder.
  let [fileName] = lisFiles(stdout, filename);  

  // parse file to json.
  let parsedFile = parseFile(filePath + '/' + fileName, fileName.split('.')[0]);

  // map json-file to Dto.
  const preDto = mapToDto(parsedFile);

  // remove 'hanging' records from Dto
  const Dto = trailingHandler(preDto);
  console.log(Dto);
    
});