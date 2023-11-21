
const userMiddlewares = {

    async isAdmin(req, res, next) {
        try {
            const user = req.user;
            if (user.role == 'admin')
                next();
            else
                throw new Error("Forbidden");
        } catch (error) {
            res.status(403).json({error: error.message});
        }
    },
    
    async isAuthorized(req, res, next) {
        try {
            const user = req.user;
            const userId = req.params.id
            console.log(user)
            if (user.role == 'admin')
                next();
            else if (user.userId == userId)
                next();
            else
                throw new Error("Forbidden");
        } catch (error) {
            res.status(403).json({error: error.message});
        }
    }
};

export default userMiddlewares;
