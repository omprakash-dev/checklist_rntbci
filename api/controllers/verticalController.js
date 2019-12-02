// Controller Code Starts here
const Vertical = require('../models/vertical');
const __ = require('../helpers/globalFunctions');

class Verticals {
    async create(req, res) {
        try {
            let requiredResult = await __.checkRequiredFields(req, ['name']);
            if (requiredResult.status === false) {
                __.out(res, 400, requiredResult.missingFields);
            } else {
                const verticalObj = new Vertical(req.body);
                const insertedDoc = await verticalObj.save();
                req.body.verticalId = insertedDoc._id;
                this.read(req, res);
            }
        }
        catch (err) {
            __.out(res, 500, err);
        }
    }
    async read(req, res) {
        try {
            let verticalResult;
            if (req.body.verticalId)
                verticalResult = await Vertical.findOne({ _id: req.body.verticalId }).select('-applicationId -createdAt -updatedAt -__v').lean();
            else
                verticalResult = await Vertical.find({}).select('-applicationId -createdAt -updatedAt -__v').lean();

            __.out(res, 200, verticalResult);

        } catch (err) {
            __.out(res, 500, err);
        }
    }
    async update(req, res) {
        try {
            let requiredResult = await __.checkRequiredFields(req, ['verticalId']);
            if (requiredResult.status === false) {
                __.out(res, 400, requiredResult.missingFields);
            } else {

                let doc = await Vertical.findOne({
                    _id: req.body.verticalId,
                });
                if (doc === null) {
                    __.out(res, 300, 'Invalid verticalId');
                } else {
                    Object.assign(doc, req.body);
                    let result = await doc.save();
                    if (result === null) {
                        __.out(res, 300, 'Something went wrong');
                    } else {
                        this.read(req, res);
                    }
                }
            }
        } catch (err) {
            __.out(res, 500, err);
        }
    }

    async delete(req, res) {
        try {
            let requiredResult = await __.checkRequiredFields(req, ['verticalId']);
            if (requiredResult.status === false) {
                __.out(res, 400, requiredResult.missingFields);
            } else {
                let verticalResult = await Vertical.findOne({
                    _id: req.body.verticalId,
                }).select('_id').lean();

                if (verticalResult === null) {
                    __.out(res, 300, 'Invalid verticalId');
                } else {
                    await Vertical.deleteOne({
                        _id: req.body.verticalId,
                    });
                    __.out(res, 200, 'Vertical has been deleted successfully');
                }
            }
        } catch (err) {
            __.out(res, 500, err);
        }
    }
}
module.exports = new Verticals();
