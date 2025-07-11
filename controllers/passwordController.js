const asyncHandler = require('express-async-handler');
const { User } = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { emit } = require('nodemon');
const nodemailer = require('nodemailer');
const { options } = require('joi');
/**
 * @desc get forgot view
 * @route /password/forgot-password
 * @method get
 * @access public
 */
module.exports.getForgotPasswordView = asyncHandler((req, res) => {
  res.render('forgot-password');
});
/**
 * @desc send Forgot Password Link
 * @route /password/forgot-password
 * @method post
 * @access public
 */
module.exports.sendForgotPasswordLink = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const secret = process.env.JWT_SECRET_KEY + user.password;
  const token = jwt.sign({ email: user.email, id: user.id }, secret, {
    expiresIn: '10m',
  });

  const link = `http://localhost:3000/password/reset-password/${user._id}/${token}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER_EMAIL, // بريدك
      pass: process.env.USER_PASS, // App Password من Gmail
    },
  });

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: user.email,
    subject: 'Reset Password',
    html: `
    <div>
        <h4>Click on the link below to reset your password:</h4>
        <a href="${link}">${link}</a>
    </div>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Email sending error:', error);
  }

  res.render('link-send');
});

/**
 * @desc get reset Password Link
 * @route /password/reset-password/:userId/:token
 * @method Get
 * @access public
 */
module.exports.getResetPasswordView = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({ message: 'user not found' });
  }

  const secret = process.env.JWT_SECRET_KEY + user.password;

  try {
    jwt.verify(req.params.token, secret);

    res.render('reset-password', {
      email: user.email,
      userId: req.params.userId,
      token: req.params.token,
    });
  } catch (error) {
    res.json({ message: 'Error' });
  }
});

/**
 * @desc Reset Password
 * @route /password/reset-password/:userId/:token
 * @method  post
 * @access public
 */
module.exports.resetThePassword = asyncHandler(async (req, res) => {
  // ToDo: validation
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({ message: 'user not found' });
  }
  const secret = process.env.JWT_SECRET_KEY + user.password;
  try {
    jwt.verify(req.params.token, secret);
    //hash password
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    user.password = req.body.password;
    await user.save();
    res.render('seccess-password');
  } catch (error) {
    res.json({ message: 'Error' });
  }
});
