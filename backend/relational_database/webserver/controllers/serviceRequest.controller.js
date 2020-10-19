const sequelize = require('../../database');

async function Create(id_demandant, id_offeror) {
    try {
        // Instantiation
        const serviceRequest = await sequelize.models.serviceRequest.build({
            id_demandant: id_demandant,
            id_offeror: id_offeror
        });
        // Storage
        const new_association = await serviceRequest.save().then(
            () => {
                return({"success": true})
            },
            (error) => {
                return({"success": false, "error": error})
            }
        )
        // Verify
        if (new_association.success == true) {
            return("service request created")
        } else {
            return(Promise.reject(new Error(new_association.error)))
        }
    } catch (error) {
        return(error)
    }
}

async function ReadAll() {
    try {
        // Search
        const serviceRequests = await sequelize.models.serviceRequest.findAll();
        // Verification
        if (serviceRequests == null) {
            return(Promise.reject(new Error("Service request not available")))
        }
        return serviceRequests;
    } catch (error) {
        return(error)
    }
}

async function Update(data) {
    try {
        // Search
        const serviceRequest = await sequelize.models.serviceRequest.findAll({
            where: {
                id: data.id,
                id_demandant: data.id_demandant,
                id_offeror: data.id_offeror
            }
        });
        // Update
        if (serviceRequest.length === 0) {
            return(Promise.reject(new Error("Service request not exists")))
        } else {
            if (data.service_date){
                serviceRequest[0].service_date = data.service_date;
            }
            if (data.service_cost){
                serviceRequest[0].service_cost = data.service_cost;
            }
            if (data.location){
                serviceRequest[0].location = data.location;
            }
            if (data.service_status){
                serviceRequest[0].service_status = data.service_status;
            }
            if (data.payment_status){
                serviceRequest[0].payment_status = data.payment_status;
            }
            return await serviceRequest[0].save().then(
                () => {
                    return ("Service request has been updated");
                },
                (error) =>{
                    return(error);
                }
            );
        }
    } catch (error) {
        return(error)
    }
}

async function Delete(data) {
    try {
        // Search
        const serviceRequest = await sequelize.models.serviceRequest.findAll({
            where: {
                id: data.id,
                id_demandant: data.id_demandant,
                id_offeror: data.id_offeror
            }
        });
        // Destruction
        if (serviceRequest.length === 0) {
            return(Promise.reject(new Error("Service request not exists")))
        } else {
            const new_destruction = await serviceRequest[0].destroy().then(
                () => {
                    return({"success": true})
                },
                (error) => {
                    return({"success": false, "error": error})
                }
            )
            // Verify
            if (new_destruction.success === true) {
                return("Service request destroyed")
            } else {
                return(Promise.reject(new Error(new_destruction.error)))
            }
        }
    } catch (error) {
        return(error)
    }
}

async function SearchBy(filters) {
    try {
        // Search
        const serviceRequest = await sequelize.models.serviceRequest.findAll({
            where: filters
        });
        // Destruction
        if (serviceRequest.length === 0) {
            return(Promise.reject(new Error("Service request not exists")))
        }
        return serviceRequest
    } catch (error) {
        return(error)
    }
}

module.exports = {
    Create,
    ReadAll,
    Update,
    Delete,
    SearchBy
};