const { Router } = require('express');

const { crearUsuario, loginUsuario, revalidarToken, crearItem, getItems, getUnItem, updateItem, deleteUnItem} = require("../controllers/auth");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {validarJwt} = require("../middlewares/validar-jwt");
const Item = require('../models/Item');
const Usuario = require("../models/Usuario");


const router = Router();


// Crear un nuevo usuario
router.post( '/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').isLength( { min: 6} ),
    validarCampos
] , crearUsuario );



// Login de usuario
router.post( '/', [
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').isLength( { min: 6} ),
    validarCampos
] , loginUsuario );

// Validar y revalidar token
router.get( '/renew', validarJwt, revalidarToken );


//ITEMS
// Crear un nuevo item
router.post( '/newitem', [
    check('name','El nombre es obligatorio').isLength( { min: 2}),
    validarCampos
] , crearItem );


// Get Items
router.get( '/items',
    getItems );

// Get UN Item
router.get('/item/:id',
    getUnItem );


// Update Item
router.put('/update/:id', updateItem);

// router.put("/update/:id", async (req, res) => {
//         try {
//             let id = req.params.id;
//             let { name, estado} = req.body;
//              await Item.update({name, estado}, { where: { id }, });
//             res.status(200).send('actualizado');
//         }
//         catch (e) {
//             res.status(400).send('no se pudo actualizar');
//         }
// });


// Delete Item
router.delete('/delete/:id',deleteUnItem);


module.exports = router;