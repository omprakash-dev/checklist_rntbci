const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const techStackSchema = mongoose.Schema({
    name: String,
    desc: String,
    dos: [{
        type: Schema.Types.ObjectId,
        ref: 'DoAndDonot'
    }],
    donots: [{
        type: Schema.Types.ObjectId,
        ref: 'DoAndDonot'
    }],
    applicationId: {
        type: Schema.Types.ObjectId,
        ref: 'Application'
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('TechStack', techStackSchema);