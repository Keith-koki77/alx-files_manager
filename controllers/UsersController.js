const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.postNew = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Missing email' });
  }

  if (!password) {
    return res.status(400).json({ error: 'Missing password' });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ error: 'Already exist' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    password: hashedPassword,
  });

  await newUser.save();

  res.status(201).json({ id: newUser._id, email: newUser.email });
};
