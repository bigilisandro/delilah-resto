const router = require('express').Router();
const middelwares = require('../middelwares');

const { Order } = require('../../db.config')

router.get('/', middelwares.isAdmin, middelwares.checkToken, async (req, res) => {
    console.log(req.usuarioId);
    const orders = await Order.findAll();
    res.status(200).json(orders);
});

router.post('/', middelwares.checkToken, async (req, res) => {
    const order = await Order.create(req.body);
    res.status(200).json(order);
})

router.put('/:orderId', middelwares.isAdmin, middelwares.checkToken, async (req, res) => {
    await Order.update(req.body, {
        where: { id: req.params.orderId}
    })
    res.status(200).json({ success: 'Se ha modificado correctamente.' })
})

router.delete('/:orderId', middelwares.isAdmin, middelwares.checkToken, async (req, res) => {
    await Order.destroy({
        where: {id: req.params.orderId}
    });
    res.status(200).json({success: 'Se ha eliminado.'})
})


module.exports = router;
