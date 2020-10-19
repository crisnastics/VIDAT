const express = require('express');
const router = express.Router();
const offerorController = require('../controllers/offeror.controller')

router.use('/create', (req, res) => {
    if (req.method === 'POST') {
        if (req.query.email && req.query.password) {
            offerorController.Create(req.query.email, req.query.password).then(
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
            offerorController.ReadAll(req.query.id).then(
                (offerors) => {
                    res.json({
                        "message": "offerors identified",
                        "success": true,
                        "data": offerors
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

router.use('/readOne', (req, res) => {
    if (req.method === 'GET') {
        if (req.query.id) {
            offerorController.ReadOne(req.query.id).then(
                (offeror) => {
                    res.json({
                        "message": "offeror identified",
                        "success": true,
                        "data": offeror
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
            offerorController.Update(req.query).then(
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
            offerorController.Delete(req.query.id).then(
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
            offerorController.SearchBy(req.query).then(
                (offerors) => {
                    res.json({
                        "message": "offerors identified",
                        "success": true,
                        "data": offerors
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