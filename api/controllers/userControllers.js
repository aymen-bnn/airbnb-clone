
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const login = async(req , res) => {

    const {email , password } =req.body
    if(!email || ! password){
        res.status(400).json({message : "all fileds are required"})
    } 

    //chack if email exist 
    const user = await User.findOne({email})
    if(!user){
        return res.status(422).json({message : "user does not exist"})
    }
    //compare password
    const compare = bcrypt.compareSync(password , user.password)
    if(!compare){
        return res.status(200).json({message : "password is wrong"})
    }
    //signin token
    jwt.sign({id:user._id , user : user.email , name : user.name } , process.env.JWTSECRET , {} , (err , token)=>{
        if(err){
            res.json({message : "token error"})
        }
        res.cookie("token", token, {
            httpOnly: true,
            secure: true, // Set this to false if not using HTTPS
            sameSite: "strict",
          }).json(user);
    })

}

const register = async(req , res) => {

    const {name, email ,password} = req.body

    if(!name || !email || ! password){
        res.status(400).json({message : "all fileds are required"})
    }   
    
    //generating salt
    const salt = bcrypt.genSaltSync(10);

    //hashing password
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
        const user = await User.create({
            name ,
            email , 
            password : hashedPassword
        })
        res.status(200).json(user)
        
    } catch (error) {
        
    }
    
}

const getProfile = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return ;
  }

  jwt.verify(token, process.env.JWTSECRET, {}, (err, user) => {
    if (err) throw err;

    res.json(user);
  });
};

const logout = async (req , res) => {

    res.cookie('token' , '').json({message :'user loged out successfully'})
}

module.exports = {login , register , getProfile , logout}