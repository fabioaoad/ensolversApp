const { validationResult } = require("express-validator");
const { response } = require("express");


// Middleware es una funcion que recibe la req, res y next

const validarCampos = ( req, res = response, next ) => {
    const errors = validationResult( req );
    console.log(errors);
    if( !errors.isEmpty() ){
        return res.status( 400 ).json({
            ok: false,
            errors: errors.mapped()
        });
    }
    next();
}




module.exports = {
    validarCampos
}