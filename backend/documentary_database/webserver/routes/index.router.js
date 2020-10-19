const express = require('express');
const demandantRoutes = require('./demandant.router');
const router = express.Router();

router.use('/demandant', demandantRoutes);

module.exports = router;