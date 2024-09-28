const express = require('express');

const authController = require('../controllers/authController');
const empController = require('../controllers/empController');

const router = express.Router();

router.route('/listEmp').get(authController.protect, empController.empList);

router.route('/dashboard').get(authController.protect);

router
  .route('/emp/:id')
  .get(authController.protect, empController.emp)
  .post(authController.protect, empController.updateEmp)
  .delete(authController.protect, empController.deleteEmp);

router.route('/addEmp').post(authController.protect, empController.addEmp);
router.route('/signup').post(authController.signup);
router.route('/signin').post(authController.signin);
router.route('/').get(authController.home);

module.exports = router;
