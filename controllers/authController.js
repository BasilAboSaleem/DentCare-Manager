const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.login_get = (req, res) => {
  res.render('pages/auth/login', { title: 'Login' });
}
exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login');
    }
     const token = jwt.sign({ id: user._id }, process.env.JWTSECRET_KEY);
    res.cookie('jwt', token, { httpOnly: true, maxAge: 86400000 });

    res.redirect('/');
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).render('pages/error/error-500', {
      title: 'Server Error',
      message: 'Something went wrong. Please try again later.'
    });
  }
}
exports.logout_get = (req, res) => {
  res.clearCookie('connect.sid');
  res.clearCookie('jwt');
  res.redirect('/login');
}