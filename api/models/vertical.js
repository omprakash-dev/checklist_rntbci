const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const verticalSchema = mongoose.Schema({
    name: String,
    applicationId: [{
        type: Schema.Types.ObjectId,
        ref: 'Application'
    }],
}, {
    timestamps: true
})

module.exports = mongoose.model('Vertical', verticalSchema);