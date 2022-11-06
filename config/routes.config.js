const express = require('express');
const router = express.Router();
const employees = require('../controllers/employees.controller')

router.get('/employees', employees.list);
router.get('/employees/oldest', employees.getOldest);
router.get('/employees/:NAME', employees.findPerName);

router.post('/employees', employees.create);

module.exports = router;
