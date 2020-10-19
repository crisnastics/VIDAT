const express = require('express');
const router = express.Router();
const serviceRequestController = require('../controllers/serviceRequest.controller')

router.use('/create', (req, res) => {
    if (req.method === 'POST') {
        if (req.query.id_demandant && req.query.id_offeror) {
            serviceRequestController.Create(req.query.id_demandant, req.query.id_offeror).then(
                (message) => {
                    res.json({
                        "message": message,
                        "success": true,
                    });
                }, (error) => {
                    res.json({
                        "error": error.message,
                        "success": false
                    });
                })
        } else {
            res.status(400);
            res.json({
                "message": "Error. invalid args",
                "success": false,
            });
        }
    } else {
        res.status(400);
        res.json({
            "message": "Error. Internal error. Invalid operation",
            "success": false,
        });
    }
});

router.use('/readAll', (req, res) => {
    if (req.method === 'GET') {
        if (Object.entries(req.query).length === 0) {
            serviceRequestController.ReadAll(req.query.id).then(
                (serviceRequests) => {
                    res.json({
                        "message": "Service requests identified",
                        "success": true,
                        "data": serviceRequests
                    })
                }, (error) => {
                    res.json({
                        "message": "Cannot find service requests",
                        "error": error.message,
                        "success": false
                    })
                }
            );
        } else {
            res.status(400);
            res.json({
                "message": "Error. invalid args",
                "success": false,
            });
        }
    } else {
        res.status(400);
        res.json({
            "message": "Error. Internal error. Invalid operation",
            "success": false,
        });
    }
});

router.use('/update', (req, res) => {
    if (req.method === 'POST') {
        if (Object.entries(req.query).length > 0) {
            serviceRequestController.Update(req.query).then(
                (message) => {
                    res.json({
                        "message": message,
                        "success": true,
                    });
                }, (error) => {
                    res.json({
                        "message": "Cannot update service",
                        "error": error.message,
                        "success": false
                    });
                })
        } else {
            res.status(400);
            res.json({
                "message": "Error. invalid args",
                "success": false,
            });
        }
    } else {
        res.status(400);
        res.json({
            "message": "Error. Internal error. Invalid operation",
            "success": false,
        });
    }
});

router.use('/delete', (req, res) => {
    if (req.method === 'GET') {
        if (req.query.id_demandant && req.query.id_offeror && req.query.id ) {
            serviceRequestController.Delete(req.query).then(
                (message) => {
                    res.json({
                        "message": message,
                        "success": true,
                    });
                }, (error) => {
                    res.json({
                        "message": "Cannot delete service",
                        "error": error.message,
                        "success": false
                    });
                })
        } else {
            res.status(400);
            res.json({
                "message": "Error. invalid args",
                "success": false,
            });
        }
    } else {
        res.status(400);
        res.json({
            "message": "Error. Internal error. Invalid operation",
            "success": false,
        });
    }
});

router.use('/searchBy', (req, res) => {
    if (req.method === 'GET') {
        if (Object.entries(req.query).length > 0) {
            serviceRequestController.SearchBy(req.query).then(
                (message) => {
                    res.json({
                        "message": message,
                        "success": true,
                    });
                }, (error) => {
                    res.json({
                        "message": "Cannot find services",
                        "error": error.message,
                        "success": false
                    });
                })
        } else {
            res.status(400);
            res.json({
                "message": "Error. invalid args",
                "success": false,
            });
        }
    } else {
        res.status(400);
        res.json({
            "message": "Error. Internal error. Invalid operation",
            "success": false,
        });
    }
});

module.exports = router;