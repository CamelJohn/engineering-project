const { exec } = require('child_process');
const lisFiles = require('./utilities/list-files');
const mapToDto = require('./utilities/dto');
const parseFile = require('./utilities/parse-file-to-json');
const trailingHandler = require('./utilities/handle-trailing');
const mapFields = require('./utilities/mapFields');
const CURRICULUM = require('../database/models/Curriculum');
const PRE = require('../database/models/PreRequesites');
const CON = require('../database/models/ConcurrentRequesites');

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

    // prepare courses
    let courses = mapFields(Dto, 'course');    

    // prepare pre-requesites
    let preReqs = mapFields(Dto, 'preRequesites');    
    
    // prepare concurent-requesites
    let concurrent = mapFields(Dto, 'concurrentRequesites');

    try {
      let cur = await CURRICULUM.bulkCreate(courses);
      let pre = await PRE.bulkCreate(preReqs);
      let con = await CON.bulkCreate(concurrent);

      res.status(201).send({ message: 'curriculum created!' });
    } catch (err) {
      console.log(err);
    }
  });
};
