let express = require('express'),
    applicationRouter = express.Router(),
    applicationController = require('../controllers/applicationController');


//RENDER
applicationRouter.post('/', (req, res) => {
    applicationController.create(req, res)
});

applicationRouter.get('/', (req, res) => {
    req.body = req.query;
    applicationController.read(req, res)
});

applicationRouter.put('/', (req, res) => {
    applicationController.update(req, res)
});

applicationRouter.delete('/', (req, res) => {
    applicationController.delete(req, res)
});

applicationRouter.delete('/dos', (req, res) => {
    applicationController.deleteDoAndDonot(req, res)
});

applicationRouter.delete('/donts', (req, res) => {
    applicationController.deleteDoAndDonot(req, res)
});


module.exports = applicationRouter;


// const express = require('express');
// const router = express.Router();
// const application = require('../models/application');

// router.get('/', function (req, res) {

//     application.find({}, function (err, data) {

//         var return_arr = {};

//         if (err) {
//             return_arr.status = 0;
//             return_arr.message = err.message;
//         }
//         else {
//             return_arr.status = 1;
//             return_arr.data = data;

//         }

//         res.json(return_arr);


//     });


// });

// router.get('/getAppTechStacksById/:id', function (req, res) {
//     application.find({ _id: req.params.id }, function (err, data) {

//         var return_arr = {};

//         if (err) {
//             return_arr.status = 0;
//             return_arr.message = err.message;
//         }
//         else {
//             return_arr.status = 1;
//             return_arr.data = data;

//         }

//         res.json(return_arr);


//     });


// });

// router.post('/', async (req, res) => {
//     try {
//         var user_obj = new appTechStack(req.body);
//         var return_arr = {};
//         const getId = await user_obj.save();
//         return_arr.status = 1;
//         return_arr.message = "App tech stack Created Successfully";
//         return_arr.id = getId._id;

//         console.log(getId);
//         res.json(return_arr);
//     }
//     catch (err) {
//         return_arr.status = 0;
//         return_arr.message = err.message;
//         res.json(return_arr);
//     }
// });


// router.put('/:id', function (req, res) {


//     var return_arr = {};
//     application.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err) {
//         if (err) {
//             return_arr.status = 0;
//             return_arr.message = err.message;
//         }
//         else {
//             return_arr.status = 1;
//             return_arr.message = "App Tech Stack Updated Successfully";

//         }

//         res.json(return_arr);

//     });


// });

// router.delete('/dos/:id/:cid', function (req, res) {
//     const type = req.params.type;
//     const cid = req.params.cid;
//     var return_arr = {};
//     application.findByIdAndUpdate({ '_id': req.params.id }, { $pull: { 'dos': { '_id': cid } } }, { multi: true }, function (err) {
//         if (err) {
//             return_arr.status = 0;
//             return_arr.message = err.message;
//         }
//         else {
//             return_arr.status = 1;
//             return_arr.message = "Tech stack Deleted Successfully";
//         }
//         res.json(return_arr);
//     });
// });

// router.delete('/donts/:id/:cid', function (req, res) {
//     const cid = req.params.cid;
//     var return_arr = {};
//     techStack.findByIdAndUpdate({ '_id': req.params.id }, { $pull: { 'donts': { '_id': cid } } }, { multi: true }, function (err) {
//         if (err) {
//             return_arr.status = 0;
//             return_arr.message = err.message;
//         }
//         else {
//             return_arr.status = 1;
//             return_arr.message = "Tech stack Deleted Successfully";
//         }
//         res.json(return_arr);
//     });
// });

// module.exports = router;