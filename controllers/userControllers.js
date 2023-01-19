const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    //check user already registered
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res
        .status(409)
        .json({ message: "User already registered , please login" });
    }
    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    //create new user
    const newUser = await User.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: encryptedPassword,
    });

    res.status(200).json({ message: "User created", user: newUser });
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.login = async(req,res)=>{
    const {email, password} = req.body
    try {
        // Validate if user exist in our database
        const user = await User.findOne({ email: email})
        if (user === null) {
            return res.status(400).json({message: 'User not found'})
        }
        //compare password input with passwordDatabase
        const valid = await bcrypt.compare(password,user.password) 
        if(!valid){
            return res.status(400).json({message:'password is incorrect'})
        }
        //create token for user 
        const payload = {
            first_name:user.first_name,
            last_name:user.last_name,
            email:user.email,
            id:user._id
        }
        const token = jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:'24h'})
         
        return res.status(200).json({
            message:"user logged in successfully",
            payload: payload,
            token: "Bearer"+token
        })
        
    } catch (error) {
        res.status(500).json({ err });
    }
}
