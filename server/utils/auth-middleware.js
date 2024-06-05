const { fetchAccountByToken } = require('../controllers/auth-controller');


const isLoggedIn = async(req,res,next) => {
    try {
        if(!req.headers.authorization){
            const error = Error("Missing Authorization.");
            error.status = 401;
            throw error;
        }
        const [_,token] = req.headers.authorization.split(' ');
        req.account = await fetchAccountByToken(token);
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    isLoggedIn
}