import User from '../Models/UserModel.js';

const UserController = {
  getAll: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  },

  getById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({message: 'User not found'});
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  },

  create: async (req, res) => {
    const user = new User(req.body);
    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({message: err.message});
    }
  },

  update: async (req, res) => {
    try {
      console.log("on pass ici")
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({message: 'User not found'});
      }
      let allowedUpdateFields = []
      console.log(req.user.userRole)
      if (req.user.userRole === 'admin')
        allowedUpdateFields = [ 'username', 'password', 'role', 'email' ];
      else
        allowedUpdateFields = [ 'username', 'password', 'email'];
      console.log(allowedUpdateFields)
      const updates = Object.keys(req.body);
      const isValidOperation = updates.
          every((update) => allowedUpdateFields.
              includes(update));
      console.log('is valid op=>' + isValidOperation)
      if (!isValidOperation) {
        return res.status(400).json({message: 'Invalid updates!'});
      }
      updates.forEach((update) => {
        user[update] = req.body[update];
      });
      const updatedUser = await user.save();
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({message: err.message});
    }
  },

  delete: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({message: 'User not found'});
      }
      res.json({message: 'User deleted'});
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  },
  getUserRole: async (req, res) => {
    try {
      const userId = req.user.userId;
      const user = await User.findById(userId);
      res.status(200).send({role: user.role});
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  },
};
export default UserController;
