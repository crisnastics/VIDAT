const Offeror = require('../../database/models/offeror.model');

async function Create(data) {
    try {
        await Offeror.findById(data.id).exec(function (error, offeror) {
            if (error) {
                return(Promise.reject(new Error(error)));
            } else{
                if (offeror === null) {
                    const new_offeror = {
                        _id: data.id
                    };
                    // Storage
                    Offeror.create(new_offeror, function (error, res) {
                        if (error) {
                            return(Promise.reject(new Error(error)));
                        } else {
                            return("offeror registered");
                        }
                    });
                } else {
                    return("offeror already exists")
                }
            }
        });

    } catch (error) {
        return(error)
    }
}

async function AddPhoto(data) {
    try {
        console.log(data);
        await Offeror.findById(data.id).exec(function (error, offeror) {
            if (error) {
                return({
                    "message": "Error. Not find",
                    "success": false,
                });
            } else {
                console.log(offeror);
                if (offeror === null) {
                    return({
                        "message": "Error. Not authorized",
                        "success": false,
                    });
                } else {
                    const photos = offeror.photos;
                    photos.push(data.photoPath);
                    Offeror.updateOne(
                        {_id: offeror._id},
                        {photos: photos},
                        function(err, numberAffected, rawResponse) {
                            if (err){
                                console.log(err);
                            }
                        })
                    return({
                        "message": "User's data has been updated",
                        "success": true,
                    });
                    console.log("3");
                }
            }
        });
    } catch (error) {
        return(error)
    }
}

async function RemovePhoto(data) {
    Offeror.findById(data.id).exec(function (error, offeror) {
        if (error) {
            return({
                "message": "Error. Not find",
                "success": false,
            });
        } else {
            if (offeror === null) {
                return({
                    "message": "Error. Not authorized",
                    "success": false,
                });
            } else {
                console.log(offeror);
                const photos = offeror.photos;
                const index = photos.indexOf(data.photoPath);
                photos.splice(index, 1);
                Offeror.updateOne(
                    {_id: offeror._id},
                    {photos: photos},
                    function(err, numberAffected, rawResponse) {
                        if (err){
                            console.log(err);
                        }
                    })
                return({
                    "message": "User's data has been updated",
                    "success": true,
                });
                console.log("3");
            }
        }
    });
}

module.exports = {
    Create,
    AddPhoto,
    RemovePhoto
};