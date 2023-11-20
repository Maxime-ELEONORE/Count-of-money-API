import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const AuthController = {

    async register(req, res) {
        try {    
            const user = new User(req.body);
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
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.send({ message: 'Authentification réussie', token });
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async logout(req, res) {
        res.send({ message: 'Déconnexion réussie' });
    }
};

export default AuthController;
