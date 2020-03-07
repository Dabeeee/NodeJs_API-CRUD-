const User = require('../models/User');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');
const uuid = require('uuid/v1');


const UserController = () => {
  app.post ('public/register',(req, res) => {
   
    if (req.body.password === req.body.password2) { 

      try {
        const user = User.create({
          id: uuid(),
          email: req.body.email,
          password:req.body.password,
          firstname:req.body.firstname,
          middlename:req.body.middlename,
          surname:req.body.surname,
          gender:req.body.gender,
          age:body.req.body.age,
          user_type:req.body.user_type


        });
        // const token = authService().issue({ id: user.id }); 

        return res.status(200).json({ 
          success: true,
          message: "1 record inserted successfully.",
          insertId: user.id
          
        });

      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: err });
      }
    }

    return res.status(400).json({ msg: 'Bad Request: Passwords don\'t match' });
  });



  const login = async (req, res) => {
    const { username, password } = req.body;
    let email = username;
    if (email && password) {
      try {
        const user = await User
        .findOne({
          where: {
            email,
          },
        });

        if (!user) {
          return res.status(400).json({ msg: 'Bad Request: User not found' });
        }

        if (bcryptService().comparePassword(password, user.password)) {
          const token = authService().issue({ id: user.id });

          return res.status(200).json({ token, user });
        }

        return res.status(401).json({ msg: 'Unauthorized' });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }

    return res.status(400).json({ msg: 'Bad Request: Email or password is wrong' });
  };

  const validate = (req, res) => {
    const { token } = req.body;

    authService().verify(token, (err) => {
      if (err) {
        return res.status(401).json({ isvalid: false, err: 'Invalid Token!' });
      }

      return res.status(200).json({ isvalid: true });
    });
  };

  const getAll = async (req, res) => {
    try {
      const users = await User.findAll();

      return res.status(200).json({ users });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };
  const registeruser = async (req, res) => {
    const { body } = req; 
    if (body.password === body.password2) { 

      try {
        const user = await User.create({
          id: uuid(),
          email: body.email,
          password:body.password,
          firstname:body.firstname,
          middlename:body.middlename,
          surname:body.surname,
          gender:body.gender,
          age:body.age,
          user_type:body.user_type


        });
        // const token = authService().issue({ id: user.id }); 
        return res.status(200).json({ 
          success: true,
          message: "1 record inserted successfully.",
          insertId: user.id
          
        });

      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: err });
      }
    }

    return res.status(400).json({ msg: 'Bad Request: Passwords don\'t match' });
  };








return {
  register,
  registeruser,
  login,
  validate,
  getAll,
};
};

module.exports = UserController;
