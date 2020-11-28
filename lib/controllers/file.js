const { exec } = require('child_process');
const lisFiles = require('./utilities/list-files');
const mapToDto = require('./utilities/dto');
const parseFile = require('./utilities/parse-file-to-json');
const trailingHandler = require('./utilities/handle-trailing');
const CURRICULUM = require('../database/models/Curriculum');

// const filePath = './lib/assets';
const filePath = './public';

module.exports = (filename, req, res, next) => {
  exec(`ls ${filePath}`, async (err, stdout, stderr) => {
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
    
    try {
      let year = await CURRICULUM.bulkCreate(Dto);

      res.status(201).send({ message: 'curriculum created!'});
      
    } catch (err) {
      console.log(err);
    }
    
  });
}