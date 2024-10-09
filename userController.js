import User from './userSchema.js';
import createToken from './createToken.js'
import bcrypt from 'bcrypt';

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);

  if (!username || !email || !password) return res.send('Fill all fields');

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.redirect("/register?message=Registration failed. User with email already exists.");
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
  if(!existingUser)return res.redirect("/login?message=login failed. No user with given email");

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  try{
    if(!isPasswordValid) return res.redirect("/login?message=login failed. Incorrect Password");
    else {
      const token = await createToken(res, existingUser._id);
      return res.redirect('/')
    }
  }
  catch{
    res.redirect("/login?message=Server error, please try again later.");
  }

}

const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.redirect('/login');
}

export { registerUser, loginUser, logoutUser};
