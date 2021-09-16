const bcrypt = require('bcrypt');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Generate hashed
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save user and respond
    const user = await newUser.save();

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;

  try {
    // Ambil user dari database
    const user = await User.findOne({ email });
    !user && res.status(404).json({ message: 'No user found' });

    // Bandingkan password dari req dengan di DB
    const validPassword = await bcrypt.compare(password, user.password);
    !validPassword && res.status(400).json({ message: 'Ooops, wrong password' });

    // eslint-disable-next-line no-underscore-dangle
    const { password: pwd, ...responseUser } = user._doc;

    user && validPassword && res.status(200).json({ user: responseUser });
  } catch (err) {
    if(!res.headersSent) {
      res.status(500).json({ err: err.message });
    }
  }
};

exports.register = register;
exports.login = login;
