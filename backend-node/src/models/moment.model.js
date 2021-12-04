const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const MomentSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId
    },
    image: {
        type: String
    },
    tags: {
        type: [{
            type: String
        }]
    },
    title: {
        type: String
    }

})
MomentSchema.plugin(mongoosePaginate)
const momentModel = mongoose.model('moment', MomentSchema);



module.exports = {
    momentModel

}