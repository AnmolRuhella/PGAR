const express = require('express');
const { getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.use(protect); // all routes protected

router.get('/', authorizeRoles('superadmin','admin'), getAllUsers);
router.get('/:id', authorizeRoles('superadmin','admin','employee'), getUser);
router.patch('/:id', authorizeRoles('superadmin','admin'), updateUser);
router.delete('/:id', authorizeRoles('superadmin'), deleteUser); // only superadmin can delete

module.exports = router;
