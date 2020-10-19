const express = require('express');
const router = express.Router();
const demandantController = require('../controllers/demandant.controller');

router.use('/create', (req, res) => {
    if (req.method === 'POST') {
        if (req.query.id) {
            demandantController.Create(req.query).then(
                (message) => {
                    res.json({
                        "message": message,
                        "success": true,
                    });
                }, (error) => {
                    res.json({
                        "message": "Cannot create consumer",
                        "error": error,
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

router.post('/addPhoto', (req, res) => {
    if (req.method === 'POST') {
        if (req.query.id && req.query.photoPath){
            demandantController.AddPhoto(req.query).then(
                (message) => {
                    res.json({
                        "message": message,
                        "success": true,
                    });
                }, (error) => {
                    res.json({
                        "message": "Cannot add photo",
                        "error": error,
                        "success": false
                    });
                });
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
})

router.post('/removePhoto', (req, res) => {
    if (req.method === 'POST') {
        console.log(req.query)
        if (req.query.id && req.query.photoPath){
            demandantController.RemovePhoto(req.query).then(
                (message) => {
                    res.json({
                        "message": message,
                        "success": true,
                    });
                }, (error) => {
                    res.json({
                        "message": "Cannot add photo",
                        "error": error,
                        "success": false
                    });
                });
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
})


module.exports = router;