const { Schema, model } = require('mongoose');


const ItemSchema = Schema({
    name: {
            type: String,
            require:true
    },
    estado: {
        type: Boolean
    }
});


module.exports = model('Item', ItemSchema);