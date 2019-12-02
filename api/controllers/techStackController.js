// Controller Code Starts here
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const TechStack = require('../models/techStack');
const DoAndDonot = require('../models/doAndDonot');
const __ = require('../helpers/globalFunctions');

class TechStacks {
    async create(req, res) {
        try {
            let requiredResult = await __.checkRequiredFields(req, ['name', 'dos', 'donts'], 'techStackCreate');
            if (requiredResult.status === false) {
                __.out(res, 400, requiredResult.missingFields);
            } else {
                const dos = req.body.dos;
                const donts = req.body.donts;

                delete req.body.dos;
                delete req.body.donts;

                const techStackObj = new TechStack(req.body);
                const insertedDoc = await techStackObj.save();
                req.body.techStackId = insertedDoc._id;

                const promiseArray = [];
                promiseArray.push(this.insertDoOrDonts(dos, true, insertedDoc._id));
                promiseArray.push(this.insertDoOrDonts(donts, false, insertedDoc._id));

                const insertedIds = await Promise.all(promiseArray);
                const insertedDosIds = insertedIds[0];
                const insertedDontsIds = insertedIds[1];

                await TechStack.updateOne({ _id: insertedDoc._id }, { dos: insertedDosIds, donots: insertedDontsIds });

                this.read(req, res);
            }
        }
        catch (err) {
            __.out(res, 500, err);
        }
    }
    async read(req, res) {
        try {
            const where = {};
            let techStackResult;
            let findOrFindOne;

            if (req.body.techStackId) {
                where._id = req.body.techStackId;
                findOrFindOne = TechStack.findOne(where).lean();
            } else
                findOrFindOne = TechStack.find(where).lean();

            techStackResult = await findOrFindOne.populate([{
                path: 'dos',
                select: 'name',
                populate: {
                    path: 'applicationId',
                    select: 'name',
                }
            }, {
                path: 'donots',
                select: 'name',
                populate: {
                    path: 'applicationId',
                    select: 'name',
                }
            }]).select('-createdAt -updatedAt -__v').lean();

            __.out(res, 200, techStackResult);

        } catch (err) {
            __.out(res, 500, err);
        }
    }
    async update(req, res) {
        try {
            let requiredResult = await __.checkRequiredFields(req, ['techStackId']);
            if (requiredResult.status === false) {
                __.out(res, 400, requiredResult.missingFields);
            } else {

                let doc = await TechStack.findOne({
                    _id: req.body.techStackId,
                });
                if (doc === null) {
                    __.out(res, 300, 'Invalid techStackId');
                } else {
                    if (req.body.dos) {
                        const insertedDos = await this.insertDoOrDonts(req.body.dos, true, req.body.techStackId);
                        req.body.dos = [...doc.dos, ...insertedDos];
                    }
                    if (req.body.donts) {
                        const insertedDonots = await this.insertDoOrDonts(req.body.donts, false, req.body.techStackId);
                        req.body.donots = [...doc.donots, ...insertedDonots];
                    }
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
            let requiredResult = await __.checkRequiredFields(req, ['techStackId']);
            if (requiredResult.status === false) {
                __.out(res, 400, requiredResult.missingFields);
            } else {
                let verticalResult = await TechStack.findOne({
                    _id: req.body.techStackId,
                }).select('_id').lean();

                if (verticalResult === null) {
                    __.out(res, 300, 'Invalid techStackId');
                } else {
                    await DoAndDonot.deleteMany({
                        techStackId: req.body.techStackId,
                    });
                    await TechStack.deleteOne({
                        _id: req.body.techStackId,
                    });
                    __.out(res, 200, 'TechStack has been deleted successfully');
                }
            }
        } catch (err) {
            __.out(res, 500, err);
        }
    }
    async deleteDoAndDonot(req, res) {
        try {
            let requiredResult = await __.checkRequiredFields(req, ['techStackId'], 'deleteDoAndDonot');
            if (requiredResult.status === false) {
                __.out(res, 400, requiredResult.missingFields);
            } else {
                let verticalResult = await TechStack.findOne({
                    _id: req.body.techStackId,
                }).select('_id').lean();

                if (verticalResult === null) {
                    __.out(res, 300, 'Invalid techStackId');
                } else {
                    let doDeleteObj = {};
                    let techStackUpdateObj = {};
                    let resultString = '';

                    if (req.body.dos) {
                        doDeleteObj._id = req.body.dos;
                        techStackUpdateObj.dos = req.body.dos;
                        resultString = 'TechStack Dos has been deleted successfully';
                    }
                    else {
                        doDeleteObj._id = req.body.donots;
                        techStackUpdateObj.donots = req.body.donots;
                        resultString = 'TechStack Donts has been deleted successfully';
                    }

                    await DoAndDonot.deleteOne(doDeleteObj);

                    await TechStack.updateOne({
                        _id: req.body.techStackId
                    }, { $pull: techStackUpdateObj });

                    __.out(res, 200, resultString);
                }
            }
        } catch (err) {
            __.out(res, 500, err);
        }
    }
    async insertDoOrDonts(dosAndDonts, isDo, techStackId) {
        const insertDoOrDontArray = []
        function makeDoOrDonotArray(dosAndDonts, isDo, techStackId) {
            for (let dosAndDont of dosAndDonts) {
                insertDoOrDontArray.push({ name: dosAndDont, isDo, techStackId });
            }
        }
        await makeDoOrDonotArray(dosAndDonts, isDo, techStackId);
        const insertedDatas = await DoAndDonot.insertMany(insertDoOrDontArray);
        return insertedDatas.map(insertedData => ObjectId(insertedData._id));
    }
}
module.exports = new TechStacks();
