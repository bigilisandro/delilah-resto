const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { User } = require('../../db.config');
const { check, validationResult } = require('express-validator');
const moment = require('moment');
const jwt = require('jwt-simple');
const middelwares = require('../middelwares');

// POST - Registrar un usuario
router.post('/register', [
    check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('firstname', 'El nombre del usuario es obligatorio.').not().isEmpty(),
    check('lastname', 'El apellido del usuario es obligatorio').not().isEmpty(),
    check('email', 'El email debe estar correcto').isEmail()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errores: errors.array() })
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await User.create(req.body);
    res.status(200).json(user);

});

// POST - Loguear un usuario
router.post('/login', async (req, res) => {
    
    const user = await User.findOne({ where: { email: req.body.email, username: req.body.username } });

    if(user) {
        const iguales = bcrypt.compareSync(req.body.password, user.password);
        if(iguales) {
            res.status(200).json({ success: createToken(user) });
        } else {
            res.status(401).json({ error: 'Error en usuario y/o constraseña' });
        }
    } else {
        res.status(401).json({ error: 'Error en usuario y/o constraseña' });
    }
})

// GET - Obtiene todos los usuarios
router.get('/allUsers', middelwares.isAdmin, middelwares.checkToken, async (req, res) => {
    console.log(req.usuarioId);
    const users = await User.findAll();
    res.status(200).json(users);
})

// GET - Obtiene un usuario
router.get('/:userId', middelwares.checkToken, async (req, res) => {
    const user = await User.findOne({ where: { id: req.params.userId } });
    res.status(200).json(user);
});

// PUT - Editar un usuario
router.put("/:userId", middelwares.checkToken, middelwares.isAdmin, async (req, res) => {
    await User.update(req.body, {
      where: { id: req.params.userId },
    });
    res.status(200).json({ success: "Se ha modificado el usuario correctamente." });
  });

// DELETE - Eliminar un usuario
router.delete("/:userId", middelwares.isAdmin, middelwares.checkToken, async (req, res) => {
    await User.destroy({
      where: { id: req.params.userId },
    });
    res.status(200).json({ success: "Se ha eliminado el usuario correctamente." });
  });

const createToken = (user) => {
    const payload = {
        usuarioId: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(60, 'minutes').unix()
    }

    return jwt.encode(payload, 'Secret')
}

module.exports = router;
