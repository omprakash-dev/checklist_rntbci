// Controller Code Starts here
const Application = require('../models/application');
const DoAndDonot = require('../models/doAndDonot');
const Vertical = require('../models/vertical');
const TechStack = require('../models/techStack');

const __ = require('../helpers/globalFunctions');

class Applications {
    async create(req, res) {
        try {
            let requiredResult = await __.checkRequiredFields(req, ['name', 'verticalId', 'techStacks']);
            if (requiredResult.status === false) {
                __.out(res, 400, requiredResult.missingFields);
            } else {
                const applicationObj = new Application(req.body);
                const insertedDoc = await applicationObj.save();
                req.body.applicationId = insertedDoc._id;


                await Vertical.updateOne({ _id: req.body.verticalId }, { $push: { applicationId: insertedDoc._id } });

                await TechStack.updateMany({
                    _id: {
                        $in: req.body.techStacks
                    }
                }, { $push: { applicationId: insertedDoc._id } });


                let dosAndDonts = [];
                if (req.body.dos && req.body.dos.length) {
                    dosAndDonts = [...dosAndDonts, ...req.body.dos];
                }
                if (req.body.donots && req.body.donots.length) {
                    dosAndDonts = [...dosAndDonts, ...req.body.donots];
                }
                if (dosAndDonts.length) {
                    await DoAndDonot.updateMany({
                        _id: {
                            $in: dosAndDonts
                        }
                    }, { $addToSet: { applicationId: insertedDoc._id } });
                }

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
            let applicationResult;
            let findOrFindOne;
            let populateTechStacksByApplicationId = {
                path: 'techStacks',
                select: 'name dos donots',
            };

            if (req.body.applicationId) {
                where._id = req.body.applicationId;
                findOrFindOne = Application.findOne(where).lean();
                populateTechStacksByApplicationId.populate = [{
                    path: 'dos',
                    match: { applicationId: req.body.applicationId },
                    select: 'name'
                }, {
                    path: 'donots',
                    match: { applicationId: req.body.applicationId },
                    select: 'name'
                }];
            } else
                findOrFindOne = Application.find(where).lean();

            applicationResult = await findOrFindOne.populate([{
                path: 'verticalId',
                select: 'name'
            }, populateTechStacksByApplicationId, {
                path: 'dos',
                select: 'name',
            }, {
                path: 'donots',
                select: 'name',
            }]).select('-createdAt -updatedAt -__v').lean();

            __.out(res, 200, applicationResult);

        } catch (err) {
            __.out(res, 500, err);
        }
    }
    async update(req, res) {
        try {
            let requiredResult = await __.checkRequiredFields(req, ['applicationId']);
            if (requiredResult.status === false) {
                __.out(res, 400, requiredResult.missingFields);
            } else {

                let doc = await Application.findOne({
                    _id: req.body.applicationId,
                });
                if (doc === null) {
                    __.out(res, 300, 'Invalid applicationId');
                } else {
                    let dosAndDonts = [...doc.dos, ...doc.donots];/*remove application id for existing do and donts */

                    await DoAndDonot.updateMany({
                        _id: {
                            $in: dosAndDonts
                        }
                    }, { $pull: { applicationId: req.body.applicationId } });

                    dosAndDonts = [];/*reset array for update new do and donts */

                    if (req.body.dos && req.body.dos.length) {
                        dosAndDonts = [...dosAndDonts, ...req.body.dos]
                    }
                    if (req.body.donots && req.body.donots.length) {
                        dosAndDonts = [...dosAndDonts, ...req.body.donots]
                    }
                    if (dosAndDonts.length) {
                        await DoAndDonot.updateMany({
                            _id: {
                                $in: dosAndDonts
                            }
                        }, { $addToSet: { applicationId: req.body.applicationId } });
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
            let requiredResult = await __.checkRequiredFields(req, ['applicationId']);
            if (requiredResult.status === false) {
                __.out(res, 400, requiredResult.missingFields);
            } else {
                let verticalResult = await Application.findOne({
                    _id: req.body.applicationId,
                }).lean();

                if (verticalResult === null) {
                    __.out(res, 300, 'Invalid applicationId');
                } else {
                    let techStacks = verticalResult.techStacks;/*remove application id from tech stacks */
                    let dosAndDonts = [...verticalResult.dos, ...verticalResult.donots];/*remove application id for existing do and donts */

                    await Vertical.updateOne({ _id: verticalResult.verticalId }, { $pull: { applicationId: req.body.applicationId } });

                    await TechStack.updateMany({
                        _id: {
                            $in: verticalResult.techStacks
                        }
                    }, { $pull: { applicationId: req.body.applicationId } });

                    await DoAndDonot.updateMany({
                        _id: {
                            $in: dosAndDonts
                        }
                    }, { $pull: { applicationId: req.body.applicationId } });
                    await Application.deleteOne({
                        _id: req.body.applicationId,
                    });

                    __.out(res, 200, 'Application has been deleted successfully');
                }
            }
        } catch (err) {
            __.out(res, 500, err);
        }
    }
}
module.exports = new Applications();
