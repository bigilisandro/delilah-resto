const router = require('express').Router();
const middelwares = require('../middelwares');
const { check, validationResult } = require('express-validator');
const { Order } = require('../../db.config');

// GET - Obtiene todas las ordenes
router.get('/', middelwares.isAdmin, middelwares.checkToken, async (req, res) => {
    console.log(req.usuarioId);
    const orders = await Order.findAll();
    res.status(200).json(orders);
});

// GET - Obtiene una orden
router.get('/:orderId', middelwares.isAdmin, middelwares.checkToken, async (req, res) => {
    const order = await Order.findOne({ where: { id: req.params.orderId } });
    res.status(200).json(order);
});

// POST - Genera una orden
router.post('/',
        middelwares.checkToken,
        [check('order_description', 'Debes agregar productos a tu pedido.').not().isEmpty(),
        check('payment_method', 'Debes especificar el método de pago.').not().isEmpty()],
        async (req, res) => {
            
            const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errores: errors.array() })
         }

        const order = await Order.create(req.body);
        res.status(200).json(order);
})

// PUT - Edita una orden
router.put('/:orderId', middelwares.isAdmin, middelwares.checkToken, async (req, res) => {
    await Order.update(req.body, {
        where: { id: req.params.orderId}
    })
    res.status(200).json({ success: 'Se ha modificado correctamente.' })
})

// DELETE - Elimina una orden
router.delete('/:orderId', middelwares.isAdmin, middelwares.checkToken, async (req, res) => {
    await Order.destroy({
        where: {id: req.params.orderId}
    });
    res.status(200).json({success: 'Se ha eliminado.'})
})


module.exports = router;
