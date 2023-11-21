import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport'

const AuthController = {

    async register(req, res) {
        try {    
            let user = new User(req.body);
            user.role = 'user';
            await user.save();    
            res.status(201).send({ user, message: 'Inscription réussie' });
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);    
            res.status(400).send(error);
        }
    },

    async login(req, res) {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(401).send({ message: 'Authentification échouée' });
            }
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(401).send({ message: 'Authentification échouée' });
            }
            const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.send({ message: 'Authentification réussie', token });
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async logout(req, res) {
        res.send({ message: 'Déconnexion réussie' });
    },

    googleAuth: passport.authenticate('google', { scope: ['profile', 'email'] }),

    googleAuthCallback(req, res, next) {
        passport.authenticate('google', { failureRedirect: '/login' }, (err, user, info) => {
            if (err) { return next(err); }
            if (!user) { return res.redirect('/login'); }

            req.logIn(user, function(err) {
                if (err) { return next(err); }
                // Générer le token JWT pour l'utilisateur
                const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
                // Redirection vers une page de succès ou le profil de l'utilisateur avec le token
                return res.redirect('/profile?token=' + token);
            });
        })(req, res, next);
    }
};

export default AuthController;
