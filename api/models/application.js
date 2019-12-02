const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = mongoose.Schema({
    name: String,
    verticalId: {
        type: Schema.Types.ObjectId,
        ref: 'Vertical'
    },
    techStacks: [{
        type: Schema.Types.ObjectId,
        ref: 'TechStack'
    }],
    dos: [{
        type: Schema.Types.ObjectId,
        ref: 'DoAndDonot'
    }],
    donots: [{
        type: Schema.Types.ObjectId,
        ref: 'DoAndDonot'
    }],
}, {
    timestamps: true
})

module.exports = mongoose.model('Application', applicationSchema);