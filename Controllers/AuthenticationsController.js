import User from '../Models/UserModel.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const AuthController = {
  async register(req, res, next) {
    try {
      console.log("vive les swarmer");
      const {email, password, username} = req.body;
      const userExists = await User.findOne({email});
      if (userExists) {
        return res.status(400).json({message: 'User already exists'});
      }
      const newUser = new User({username, email, password});
      await newUser.save();
      res.status(201).json({message: 'User registered successfully'});
    } catch (error) {
      next(error);
    }
  },
  async login(req, res, next) {
    passport.authenticate('local',
        {failureRedirect: '/login'}, (err, user, info) => {
          if (err) return next(err);
          if (!user) return res.status(400).json(info);

          req.logIn(user, (err) => {
            if (err) return next(err);
            const token = jwt.sign({
              userId: user._id,
              userRole: user.role,
            }, process.env.JWT_SECRET, {expiresIn: '1h'});
            res.cookie('jwt', token,
                {httpOnly: true, sameSite: 'None', secure: true, domain: '.camille-lecoq.com'});
            return res.status(200).json({message: 'Logged in successfully'});
          });
        })(req, res, next);
  },
  logout(req, res) {
    req.logout();
    res.status(206).json({message: 'Logged out successfully'});
  },
  initiateGoogleAuth(req, res, next) {
    passport.authenticate('google',
        {scope: ['profile', 'email']})(req, res, next);
  },
  googleAuthCallback(req, res, next) {
    passport.authenticate('google',
        {failureRedirect: '/login'}, (err, user, _info) => {
          if (err) {
            return next(err);
          }
          if (!user) {
            return res.redirect('/login');
          }
          req.logIn(user, (error) => {
            if (error) {
              return next(error);
            }
            const token = jwt.sign({
              userId: user._id,
              userRole: user.role,
            }, process.env.JWT_SECRET, {expiresIn: '1h'});
            res.cookie('jwt', token,
                {httpOnly: true, sameSite: 'None', secure: true, domain: '.camille-lecoq.com'});
            return res.status(200).json({message: 'Logged in successfully'});
          });
        })(req, res, next);
  },
};

export default AuthController;
