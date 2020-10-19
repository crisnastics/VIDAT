const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index.router');

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.use('/api/', routes);

app.get('/', (req, res) => {
    res.json({
        "message": "VIDAT BACKEND - DOCUMENTARY DATABASE"
    });
});

module.exports = app;