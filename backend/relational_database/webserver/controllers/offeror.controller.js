const sequelize = require('../../database');

async function Create(new_email, new_password) {
    try {
        // Instantiation
        const new_offeror = await sequelize.models.offeror.build({
            email: new_email,
            password: new_password
        });
        // Storage
        await new_offeror.save();
        return("New offeror created")
    } catch (error) {
        return(error)
    }
}

async function ReadAll() {
    try {
        // Search
        const offerors = await sequelize.models.offeror.findAll();
        // Verification
        if (offerors == null){
            return(Promise.reject(new Error("No offerors available")))
        }
        return(offerors);
    } catch (error) {
        return(error)
    }
}

async function ReadOne(id_offeror) {
    try {
        // Search
        const offeror = await sequelize.models.offeror.findByPk(id_offeror);
        // Verification
        if (offeror == null){
            return(Promise.reject(new Error("No offeror available")))
        }
        return(offeror);
    } catch (error) {
        return(error)
    }
}

async function Update(data) {
    try {
        // Search
        const offeror = await sequelize.models.offeror.findByPk(data.id);
        // Verification
        if (offeror == null){
            return(Promise.reject(new Error("offeror does not exist")))
        }
        // Redefinition
        else {
            if (data.email){
                offeror.email = data.email;
            }
            if (data.password){
                offeror.password = data.password;
            }
            if (data.phone){
                offeror.phone = data.phone;
            }
            if (data.name){
                offeror.name = data.name;
            }
            if (data.address){
                offeror.address = data.address;
            }
            if (data.rut){
                offeror.rut = data.rut;
            }
            await offeror.save();
            return("offeror has been updated")
        }
    } catch (error) {
        return(error)
    }
}

async function Delete(id_offeror) {
    try {
        // Search
        const offeror = await sequelize.models.offeror.findByPk(id_offeror);
        // Verification
        if (offeror == null){
            return(Promise.reject(new Error("offeror does not exist")))
        }
        // Destruction
        await offeror.destroy();
        return("offeror has been destroyed")
    } catch (error) {
        return(error)
    }
}

async function SearchBy(filter) {
    try {
        // Search
        const offerors = await sequelize.models.offeror.findAll({
            where: filter
        });
        // Verification
        if (offerors == null){
            return(Promise.reject(new Error("No offerors available")))
        }
        return(offerors);
    } catch (error) {
        return(error)
    }
}

module.exports = {
    Create,
    ReadAll,
    ReadOne,
    Update,
    Delete,
    SearchBy
};