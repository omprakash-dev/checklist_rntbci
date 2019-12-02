const express = require('express');
const router = express.Router();
const appTechStackCheckList = require('../models/vertical');

router.get('/', function (req, res) {

    appTechStackCheckList.find({}, function (err, data) {

        var return_arr = {};

        if (err) {
            return_arr.status = 0;
            return_arr.message = err.message;
        }
        else {
            return_arr.status = 1;
            return_arr.data = data;

        }

        res.json(return_arr);
    });
});

router.get('/getAppTechStacksById/:id', function (req, res) {
    appTechStackCheckList.find({ _id: req.params.id }, function (err, data) {

        var return_arr = {};

        if (err) {
            return_arr.status = 0;
            return_arr.message = err.message;
        }
        else {
            return_arr.status = 1;
            return_arr.data = data;

        }

        res.json(return_arr);


    });


});

router.post('/', async (req, res) => {
    try {
        var user_obj = new appTechStackCheckList(req.body);
        var return_arr = {};
        const getId = await user_obj.save();
        return_arr.status = 1;
        return_arr.message = "App tech stack check list Created Successfully";
        return_arr.id = getId._id;

        console.log(getId);
        res.json(return_arr);
    }
    catch (err) {
        return_arr.status = 0;
        return_arr.message = err.message;
        res.json(return_arr);
    }
});


router.put('/:id', function (req, res) {


    var return_arr = {};
    // appTechStack.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err) {
    appTechStackCheckList.update({ "_id": req.params.id }, req.body, { new: true }, function (err) {
        if (err) {
            return_arr.status = 0;
            return_arr.message = err.message;
        }
        else {
            return_arr.status = 1;
            return_arr.message = "App Tech Stack Updated Successfully";

        }

        res.json(return_arr);

    });


});

router.delete('/dos/:id/:cid', function (req, res) {
    const type = req.params.type;
    const cid = req.params.cid;
    var return_arr = {};
    appTechStack.findByIdAndUpdate({ '_id': req.params.id }, { $pull: { 'dos': { '_id': cid } } }, { multi: true }, function (err) {
        if (err) {
            return_arr.status = 0;
            return_arr.message = err.message;
        }
        else {
            return_arr.status = 1;
            return_arr.message = "Tech stack Deleted Successfully";
        }
        res.json(return_arr);
    });
});

router.delete('/donts/:id/:cid', function (req, res) {
    const cid = req.params.cid;
    var return_arr = {};
    techStack.findByIdAndUpdate({ '_id': req.params.id }, { $pull: { 'donts': { '_id': cid } } }, { multi: true }, function (err) {
        if (err) {
            return_arr.status = 0;
            return_arr.message = err.message;
        }
        else {
            return_arr.status = 1;
            return_arr.message = "Tech stack Deleted Successfully";
        }
        res.json(return_arr);
    });
});

module.exports = router;