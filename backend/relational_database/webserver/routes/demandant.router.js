const express = require('express');
const router = express.Router();
const demandantController = require('../controllers/demandant.controller')

router.use('/create', (req, res) => {
    if (req.method === 'POST') {
        if (req.query.email && req.query.password) {
            demandantController.Create(req.query.email, req.query.password).then(
                (message) => {
                    res.json({
                        "message": message,
                        "success": true,
                    });
                }, (error) => {
                    res.json({
                        "message": "Cannot create consumer",
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
            demandantController.ReadAll(req.query.id).then(
                (demandants) => {
                    res.json({
                        "message": "demandants identified",
                        "success": true,
                        "data": demandants
                    })
                }, (error) => {
                    res.json({
                        "message": "Cannot find demandant",
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

router.use('/readOne', (req, res) => {
    if (req.method === 'GET') {
        if (req.query.id) {
            demandantController.ReadOne(req.query.id).then(
                (demandant) => {
                    res.json({
                        "message": "demandant identified",
                        "success": true,
                        "data": demandant
                    })
                }, (error) => {
                    res.json({
                        "message": "Cannot find consumer",
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
        if (req.query.id) {
            demandantController.Update(req.query).then(
                (message) => {
                    res.json({
                        "message": message,
                        "success": true,
                    });
                }, (error) => {
                    res.json({
                        "message": "Cannot update consumer",
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
        if (req.query.id) {
            demandantController.Delete(req.query.id).then(
                (message) => {
                    res.json({
                        "message": message,
                        "success": true,
                    });
                }, (error) => {
                    res.json({
                        "message": "Cannot delete consumer",
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
            demandantController.SearchBy(req.query).then(
                (demandants) => {
                    res.json({
                        "message": "demandants identified",
                        "success": true,
                        "data": demandants
                    })
                }, (error) => {
                    res.json({
                        "message": "Cannot find consumer",
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

module.exports = router;