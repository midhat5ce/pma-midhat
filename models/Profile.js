const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
      type: String,
      required: true,
      max: 40
    },
    products: [
        {
            name: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            quantity: {
                type: Number
            },
            basePrice: {
                type: Number
               
            },
            taxPrice: {
                type: Number
                
            },
            salePrice: {
                type: Number
            
            }
            
        }
    ]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);