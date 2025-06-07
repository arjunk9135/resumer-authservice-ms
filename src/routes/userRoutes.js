const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  addRoleToUser,
  removeRoleFromUser,
} = require('../controllers/userController');
const { authenticate, authorizeAdmin, authorizeRole } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authenticate);
router.use(authorizeAdmin);
router.use(authorizeRole(['ADMIN'])); // Only admins can manage roles

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.patch('/:id/role', updateUserRole);
router.delete('/:id', deleteUser);
router.patch('/:id/add-role', addRoleToUser); // Ensure this function exists
router.patch('/:id/remove-role', removeRoleFromUser); // Ensure this function exists

module.exports = router;