const jwt = require('jwt-simple');
const moment = require('moment');

// Middelware para checkear el User Token generado al logearse.
const checkToken = (req, res, next) => {

    if(!req.headers['user-token']) {
        return res.status(404).json({ error: 'Necesitas incluir el user-token en la cabecera (header).' });
    }

    const userToken = req.headers['user-token'];
    let payload = {};

    try {
        payload = jwt.decode(userToken, 'Secret')
    } catch(err) {
        return res.status(403).json({ error: 'El token es incorrecto' })
    }

    if(payload.expiredAt < moment().unix()) {
        return res.json({ error: 'El token ha expirado.' })
    }

    req.usuarioId = payload.usuarioId;

    next();
}

// Middelware para checkear el rol del usuario
const isAdmin = (req, res, next) => {
    const role = req.body.role
    if(!role) {
        res.status(400).json({ error: 'Debes enviar el role.' });
        return;
    }
    if(!(role.toLowerCase() === 'admin') ) /*(req.roleId !== 2)*/ {
        res.status(403).json({ error: 'No estás autorizado' });
        return;
    }
    next();
}


module.exports = {
    checkToken: checkToken,
    isAdmin: isAdmin
}