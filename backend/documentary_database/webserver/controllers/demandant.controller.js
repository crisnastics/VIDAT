const Demandant = require('../../database/models/demandant.model');

async function Create(data) {
    try {
        await Demandant.findById(data.id).exec(function (error, demandant) {
            if (error) {
                return(Promise.reject(new Error(error)));
            } else{
                if (demandant === null) {
                    const new_demandant = {
                        _id: data.id
                    };
                    // Storage
                    Demandant.create(new_demandant, function (error, res) {
                        if (error) {
                            return(Promise.reject(new Error(error)));
                        } else {
                            return("Demandant registered");
                        }
                    });
                } else {
                    return("Demandant already exists")
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
        await Demandant.findById(data.id).exec(function (error, demandant) {
            if (error) {
                return({
                    "message": "Error. Not find",
                    "success": false,
                });
            } else {
                console.log(demandant);
                if (demandant === null) {
                    return({
                        "message": "Error. Not authorized",
                        "success": false,
                    });
                } else {
                    const photos = demandant.photos;
                    photos.push(data.photoPath);
                    Demandant.updateOne(
                        {_id: demandant._id},
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
    Demandant.findById(data.id).exec(function (error, demandant) {
        if (error) {
            return({
                "message": "Error. Not find",
                "success": false,
            });
        } else {
            if (demandant === null) {
                return({
                    "message": "Error. Not authorized",
                    "success": false,
                });
            } else {
                console.log(demandant);
                const photos = demandant.photos;
                const index = photos.indexOf(data.photoPath);
                photos.splice(index, 1);
                Demandant.updateOne(
                    {_id: demandant._id},
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