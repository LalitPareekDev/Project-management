const { verifyToken } = require('./jwt');

const verifyUser = async ( req, res, next) => {
    let token = req.headers['authorization'] && req.headers['authorization'].split(' ') ? req.headers['authorization'].split(' ')[1] : null;
    if(token) {
        let payload = verifyToken(token);
        if(payload) {
            req.userPayload = payload;
            next();
        } else {
            res.status(404).json({
                status: 'Error',
                statusCode: 404,
                message: 'Token Expired..!!'
            })
            return;
        }
    } else {
        res.status(404).json({
            status: 'Error',
            statusCode: 404,
            message: 'Token Missing..!!'
        })
        return;
    }
}

module.exports = { verifyUser };