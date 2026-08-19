const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin } = require('../controllers/authController');

router.post('/register', registerAdmin); // Use once to create your admin, then remove/protect this
router.post('/login', loginAdmin);

module.exports = router;
