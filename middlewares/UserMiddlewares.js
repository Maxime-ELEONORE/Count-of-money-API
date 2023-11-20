
const userMiddlewares = {

    async isAdmin(req, res, next) {
        try {
            const user = req.user;
            console.log(user);
            next();
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
};

export default userMiddlewares;
