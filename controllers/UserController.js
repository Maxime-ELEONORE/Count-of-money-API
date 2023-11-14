import User from '../models/User.js';

const UserController = {

    async createUser(req, res) {
        try {
            const user = new User(req.body);
            await user.save();
            res.status(201).send(user);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    async getAllUsers(req, res) {
        try {
            const users = await User.find({});
            res.status(200).send(users);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async getUserById(req, res) {
        const { id } = req.params;
        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).send();
            }
            res.status(200).send(user);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async updateUser(req, res) {
        const { id } = req.params;
        const updates = req.body;
    
        try {
            const user = await User.findById(id);    
            if (!user) {
                return res.status(404).send({ message: 'Utilisateur non trouvé' });
            }    
            Object.keys(updates).forEach((update) => {
                user[update] = updates[update];
            });
            await user.save();
            res.status(200).send(user);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const user = await User.findByIdAndDelete(id);
            if (!user) {
                return res.status(404).send();
            }
            res.status(200).send(user);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    
};

export default UserController;
