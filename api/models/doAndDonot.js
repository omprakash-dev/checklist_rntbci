const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doanddonotSchema = mongoose.Schema({
    name: String,
    isDo: Boolean,
    techStackId: {
        type: Schema.Types.ObjectId,
        ref: 'TechStack'
    },
    applicationId: [{
        type: Schema.Types.ObjectId,
        ref: 'Application'
    }],
}, {
    timestamps: true
})

module.exports = mongoose.model('DoAndDonot', doanddonotSchema);