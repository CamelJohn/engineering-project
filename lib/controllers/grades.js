const { exec } = require('child_process');
const lisFiles = require('./utilities/list-files');
const mapToDto = require('./utilities/dto');
const parseFile = require('./grades/to-json');
// const parseFile = require('./utilities/parse-file-to-json');
const trailingHandler = require('./utilities/handle-trailing');

const filePath = './lib/assets';

exec(`ls ${filePath}`, (err, stdout, stderr) => {
  if (err) {
    return console.log(stderr);
  }

  // list the files in the folder.
  let [fileName] = lisFiles(stdout, 'grades');  

  // parse file to json.
  let parsedFile = parseFile(filePath + '/' + fileName, fileName.split('.')[0]);
  console.log(parsedFile[0]);
  
  // // map json-file to Dto.
  // const preDto = mapToDto(parsedFile);

  // // remove 'hanging' records from Dto
  // const Dto = trailingHandler(preDto);
  // // console.log(Dto.length);
});