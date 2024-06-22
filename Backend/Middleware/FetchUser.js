var jwt = require('jsonwebtoken');

var secKey = "good$"

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token')
    if (!token) {
       return  res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, secKey);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token2" })
    }

}


module.exports = fetchuser;
