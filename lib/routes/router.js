const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const curriculumController = require('../controllers/curriculum');

module.exports = router => {
  router.post('/upload-file', upload.single('file'), (req, res, next) => {
    console.log(req.file);
  });

  router.post('/day', upload.single('file'), curriculumController.postDayCurriculum);

  router.get('/courses-dropdown', curriculumController.getCoursesDropDown);
  
  router.get('/courses/:plan', curriculumController.getCourses);

  router.post('/get/course', curriculumController.getCourseByCode);

  return router;
};
