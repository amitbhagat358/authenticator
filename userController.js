import User from './userSchema.js';
import createToken from './createToken.js'
import bcrypt from 'bcrypt';

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);

  if (!username || !email || !password) return res.send('Fill all fields');

  const existingUser = await User.findOne({ email });
  console.log("hello ", existingUser);

  if (existingUser) {
    return res.send('User already exists with given email');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, email, password: hashedPassword });

  try{
    await newUser.save();
    res.redirect('/');
  }
  catch{
    res.status(400)
  }
};

const loginUser = async (req, res) => {
  const {email, password} = req.body;

  const existingUser = await User.findOne({email});
  console.log(existingUser)
  if(!existingUser)return res.send("No user with given email");

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  if(!isPasswordValid) res.send(400).send("Incorrect Password");
  else {
    const token = await createToken(res, existingUser._id);
    return res.status(200).send("user logged in successFully");
  }

  res.status(500).send("internal server error");
}

export { registerUser, loginUser};
