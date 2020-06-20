const router = require('express').Router();
const middelwares = require('../middelwares');
const { check, validationResult } = require('express-validator');
const { Product } = require('../../db.config');

// GET - Obtiene todos los productos
router.get('/', async (req, res) => {
    console.log(req.usuarioId);
    const products = await Product.findAll();
    res.status(200).json(products);
});

// GET - Obtiene un producto
router.get('/:productId', async (req, res) => {
    const product = await Product.findOne({ where: { id: req.params.productId } });
    res.status(200).json(product);
});

// POST - Agregar un producto
router.post('/',
        middelwares.isAdmin,
        middelwares.checkToken,
        [check('product_name', 'El nombre del producto es obligatorio').not().isEmpty(),
        check('product_price', 'El precio del producto es obligatorio').not().isEmpty(),
        check('product_photo', 'Debes incluir una foto del producto.').not().isEmpty()],
        async (req, res) => {

            const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errores: errors.array() })
         }
        const product = await Product.create(req.body);
        res.status(200).json(product);
})

// PUT - Editar un producto
router.put('/:productId', middelwares.isAdmin, middelwares.checkToken, async (req, res) => {
    await Product.update(req.body, {
        where: { id: req.params.productId}
    })
    res.status(200).json({ success: 'Se ha modificado correctamente.' })
})

// DELETE - Eliminar un producto
router.delete('/:productId', middelwares.isAdmin, middelwares.checkToken, async (req, res) => {
    await Product.destroy({
        where: {id: req.params.productId}
    });
    res.status(200).json({success: 'Se ha eliminado.'})
})


module.exports = router;
