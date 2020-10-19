const express = require('express');
const demandantRoutes = require('./demandant.router');
const offerorRoutes = require('./offeror.router');
const serviceRequestRoutes = require('./serviceRequest.router')
const router = express.Router();

router.use('/demandant', demandantRoutes);
router.use('/offeror', offerorRoutes);
router.use('/serviceRequest', serviceRequestRoutes)

module.exports = router;