const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function authUser(user, password){
    try {
        const correctPassword = await bcrypt.compare(password, user.password);
        return correctPassword;
        
    } catch (error) {
        throw new Error('Senha incorreta');
    }
}

 function validateToken(token) {
        const decoded = jwt.verify(token, 'vaicorinthians');
        return decoded;
 }

 function verifyToken(req, res, next) {
     try {
        const token = req.headers["authorization"].split(' ')[1];
        const tokenValidity = validateToken(token);
        
        if (!tokenValidity) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        
        req.user = tokenValidity

    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }

    next();
 }

 function generatorToken(user) {

    try {

        const token = jwt.sign({
            id: user.id,
            email: user.email
        }, 'vaicorinthians');
    
        return token;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {generatorToken, authUser, verifyToken};