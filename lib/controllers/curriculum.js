const fileHandler = require('./file');
const CURRICULUM = require('../database/models/Curriculum');
const { Op } = require('sequelize');

module.exports = {
  getDayCurriculum: (req, res, next) => {},

  postDayCurriculum: (req, res, next) => {
    fileHandler(req.file.originalname, req, res, next);
  },

  getNighCurriculum: (req, res, next) => {},

  postNightCurriculum: (req, res, next) => {},

  getAcademicAbstracts: (req, res, next) => {},

  getGrades: (req, res, next) => {},

  postGrades: (req, res, next) => {},

  getCoursesDropDown: async (req, res, next) => {
    try {
      let courses = await CURRICULUM.findAll({ raw: true, attributes: ['code', 'name'] });
      return next(successHandler(res, 200, courses));
    } catch (err) {
      return next(errorHandler(res, err));
    }
  },

  getCourses: async (req, res, next) => {
    try {
      let { plan } = req.params;
      let courses = await CURRICULUM.findAll({ raw: true, where: { major: {[ Op.in ]:[plan, 'general']} } });

      let y1s1 = [], y1s2 = [], y2s1 = [], y2s2 = [], y3s1 = [], y3s2 = [], y4s1 = [], y4s2 = [];
      let studies = { y1s1, y1s2, y2s1, y2s2, y3s1, y3s2, y4s1, y4s2 };

      courses.forEach(course => {
        [1, 2, 3, 4].forEach(year => {
          if (course.year == year && course.semester == 1) {
            studies[`y${year}s1`].push(course);
          } else if (course.year == year && course.semester == 2) {
            studies[`y${year}s2`].push(course);
          }
        });
      });

      for (const s of Object.keys(studies)) {
        for (const k of Object.keys(studies[s])) {
          if (studies[s][k].prc1 || studies[s][k].prc2 || studies[s][k].prc3) {
            console.log({ c: studies[s][k].code, prc1: studies[s][k].prc1, prc2: studies[s][k].prc2, prc3: studies[s][k].prc3 });
          }
          
        }
        
          
      }      

      return next(successHandler(res, 200, [y1s1, y1s2, y2s1, y2s2, y3s1, y3s2, y4s1, y4s2]));
    } catch (err) {
      console.log(err);
      
      return next(errorHandler(res, err));
    }
  },

  getCourseByCode: async (req, res, next) => {
    try {
      let [course] = await CURRICULUM.findAll({ where: { code: req.body.code }, raw: true });
      return next(successHandler(res, 200, course));
    } catch (err) {
      return next(errorHandler(res, err));
    }
  },
};

function successHandler(res, status, data) {
  res.status(status).send(data);
}

function errorHandler(res, err) {
  res.status(500).send({ message: err.message });
}
