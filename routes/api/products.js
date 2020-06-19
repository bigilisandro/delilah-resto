const router = require('express').Router();
const middelwares = require('../middelwares');

const { Product } = require('../../db.config')

router.get('/', async (req, res) => {
    console.log(req.usuarioId);
    const products = await Product.findAll();
    res.status(200).json(products);
});

router.post('/', middelwares.isAdmin, middelwares.checkToken,  async (req, res) => {
    const product = await Product.create(req.body);
    res.status(200).json(product);
})

router.put('/:productId', middelwares.isAdmin, middelwares.checkToken, async (req, res) => {
    await Product.update(req.body, {
        where: { id: req.params.productId}
    })
    res.status(200).json({ success: 'Se ha modificado correctamente.' })
})

router.delete('/:productId', middelwares.isAdmin, middelwares.checkToken, async (req, res) => {
    await Product.destroy({
        where: {id: req.params.productId}
    });
    res.status(200).json({success: 'Se ha eliminado.'})
})


module.exports = router;
