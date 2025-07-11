const {
  User,
  validationUpdateUser,
  verifyTokenAndAdmin,
} = require('../models/userModel');
const asyncHandler = require('express-async-handler');

/**
 * @desc update user
 * @route /api/users/:id
 * @method put
 * @access private
 */
const updateUser = asyncHandler(async (req, res) => {
  const { error } = validationUpdateUser(req.body);
  if (error) {
    res.status(400).json({ message: 'invalid information' });
  }
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
      },
    },
    { new: true },
  ).select('-password');

  res.status(200).json(updatedUser);
});
/**
 * @desc get all user
 * @route /api/users
 * @method GET
 * @access private (only Admin)
 */
const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.status(200).json(users);
});
/**
 * @desc delete user
 * @route /api/users/:id
 * @method delete
 * @access private (only Admin & user himselft)
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'user has been deleted ' });
  } else {
    res.status(404).json({ message: 'not found this user' });
  }
});
/**
 * @desc get user by id
 * @route /api/users/:id
 * @method GET
 * @access private (only Admin & user himselft)
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'not found this user' });
  }
});

module.exports = {
  updateUser,
  getAllUser,
  deleteUser,
  getUserById,
};
