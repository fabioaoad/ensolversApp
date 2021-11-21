const { response } = require('express');
const Usuario = require('../models/Usuario');
const Item = require('../models/Item');
const bcrypy = require('bcryptjs');
const {generarJWT} = require("../helpers/jwt");


// Crear un nuevo usuario
const crearUsuario = async(req, res = response) => {
    //console.log( req.body );
    const { name, email, password } = req.body;
    //console.log( name, email, password);

    try {
        // Verificar el email
    const usuario = await Usuario.findOne({ email: email });
    if( usuario ){
        return res.status(400).json({
            ok: false,
            msg: 'El usuario ya existe con ese email'
        });
    }
        // Crear usuario con el Modelo
        const dbUser = new Usuario( req.body );
        // Hashear la contraseña
        const salt = bcrypy.genSaltSync();
        dbUser.password = bcrypy.hashSync( password, salt );

        // Generar JWT
        const token = await generarJWT(dbUser.id, name);
        // Crear usuario de BD
        await dbUser.save();

        //Generar respuesta exitosa
        return res.status(201).json({
            ok:true,
            uid: dbUser.id,
            name,
            email,
            token
        });
    }catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contactar con el administrador'
        });
    }

}

// Login de usuario
const loginUsuario = async (req, res = response) => {
    //console.log( req.body );
    const { email, password } = req.body;
    //console.log(email, password);

    try {
       const dbUser = await Usuario.findOne({ email });
        //Confirmas si el email existe
       if( !dbUser ){
           return res.status(400).json({
               ok: false,
               msg: 'El correo no existe'
           });
       }
           //Confirmas si el password hace match
           const validPassword = bcrypy.compareSync( password, dbUser.password );
           if( !validPassword ){
               return res.status(400).json({
                   ok: false,
                   msg: 'El password no es valido'
               });
           }

          //Generar JWT
        const token = await generarJWT( dbUser.id, dbUser.name);

           //Respuesta del servicio
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            token
        });



    }catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }




}

// Validar y revalidar token
const revalidarToken = async (req, res = response) => {

    const { uid } = req;
    console.log(uid);
    //Leer la base de datos
    const dbUser = await  Usuario.findById(uid);


    //Generar JWT
    const token = await generarJWT( uid, dbUser.name);

    return res.json({
        ok: true,
        uid,
        name: dbUser.name,
        email: dbUser.email,
        token
    });
}



// ITEMS

// Crear un nuevo usuario
const crearItem = async(req, res = response) => {
    console.log( req.body );
    const { name } = req.body;
    try {
        // Verificar el name
        const item = await Item.findOne({ name: name });
        if( item ){
            return res.status(400).json({
                ok: false,
                msg: 'El item ya existe con ese nombre'
            });
        }
        // Crear usuario con el Modelo
        const dbUser = new Item( req.body );

        // Crear usuario de BD
        await dbUser.save();

        //Generar respuesta exitosa
        return res.status(201).json({
            ok:true,
            uid: dbUser.id,
            name
        });
    }catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contactar con el administrador'
        });
    }

}


// RECUPERAR ITEM
const getItems = async (req, res) => {
    Item.find({}, (err, task) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(task);
    });
};



// const updateItem = async (req, res) => {
//
//         try {
//             let id = req.params.id;
//             let { name, estado} = req.body;
//             //const dbUser = await Item.replaceOne({name, estado}, { where: { id }, });
//             const dbUser = await Item.update({name, estado}, { where: { id }, });
//             //update({name, estado}, { where: { id }, });
//             console.log(res.name)
//             res.status(200).send('actualizado');
//         }
//         catch (e) {
//             res.status(400).send('no se pudo actualizar');
//         }
//
// };


const updateItem = async (req, res) => {

    try {
        let id = req.params.id;
        let { name, estado} = req.body;
        //const dbUser = await Item.replaceOne({name, estado}, { where: { id }, });
        const dbUser = await Item.findByIdAndUpdate(id, {name, estado});
        //update({name, estado}, { where: { id }, });
        console.log(id);
        console.log({name, estado});
        res.status(200).send('actualizado');
    }
    catch (e) {
        res.status(400).send('no se pudo actualizar');
    }

};






const getUnItem = async (req, res) => {
    console.log('HOLA');
    Item.findById(req.params.id, (err, item) => {
        if (err) {
            console.log('error un item');
            res.status(500).send(err);
        }
        res.status(200).json(item);
    });
}




const deleteUnItem = async (req, res) => {

    try {
        //console.log( req.body );
        let id = req.params.id;
        console.log('my id',id);
        const dbItem = await Item.deleteOne({_id: id});
        console.log(dbItem);
        res.status(200).send('eliminado');
    }
    catch (e) {
        res.status(400).send('no se pudo eliminar');
    }

};






module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    crearItem,
    getItems,
    getUnItem,
    updateItem,
    deleteUnItem

}