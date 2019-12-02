const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 1000000
}));

const techstackRoutes = require('./routes/techStackRouter');
const applicationRoutes = require('./routes/applicationRouter');
const appTechStackCheckListRoutes = require('./routes/appTechStackCheckList');
const verticalRoutes = require('./routes/verticalRouter');


app.use(cors());
app.set('environment', 'http://localhost');
app.set('port', 3000);

app.use('/techstack', techstackRoutes);
app.use('/application', applicationRoutes);
app.use('/appTechStackCheckList', appTechStackCheckListRoutes);
app.use('/vertical', verticalRoutes);

app.get('/', (req, res) => {
    res.send('We are on home');
})

mongoose.connect('mongodb://localhost:27017/checkList', { useNewUrlParser: true }, (error) => {
    if (!error) {
        console.log('connected to DB!')
    }
    else {
        console.log('Error Connection to DB');
    }
}
);

app.listen(app.get('port'), (req, res) => {
    console.log(`App is running at ${app.get('environment')}:${app.get('port')} `);
    console.log('Press CTRL-C to exit');
});