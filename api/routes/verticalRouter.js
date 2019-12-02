let express = require('express'),
    verticalRouter = express.Router(),
    verticalController = require('../controllers/verticalController');


//RENDER
verticalRouter.post('/', (req, res) => {
    verticalController.create(req, res)
});

verticalRouter.get('/', (req, res) => {
    req.body = req.query;
    verticalController.read(req, res)
});

verticalRouter.put('/', (req, res) => {
    verticalController.update(req, res)
});

verticalRouter.delete('/', (req, res) => {
    verticalController.delete(req, res)
});

module.exports = verticalRouter;