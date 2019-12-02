let express = require('express'),
    techStackRouter = express.Router(),
    techStackController = require('../controllers/techStackController');


//RENDER
techStackRouter.post('/', (req, res) => {
    techStackController.create(req, res)
});

techStackRouter.get('/', (req, res) => {
    req.body = req.query;
    techStackController.read(req, res)
});

techStackRouter.put('/', (req, res) => {
    techStackController.update(req, res)
});

techStackRouter.delete('/', (req, res) => {
    techStackController.delete(req, res)
});

techStackRouter.delete('/dos', (req, res) => {
    techStackController.deleteDoAndDonot(req, res)
});

techStackRouter.delete('/donts', (req, res) => {
    techStackController.deleteDoAndDonot(req, res)
});


module.exports = techStackRouter;