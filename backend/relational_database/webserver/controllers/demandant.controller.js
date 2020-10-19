const sequelize = require('../../database');

async function Create(new_email, new_password) {
    try {
        // Instantiation
        const new_demandant = await sequelize.models.demandant.build({
            email: new_email,
            password: new_password
        });
        // Storage
        await new_demandant.save();
        return("New demandant created")
    } catch (error) {
        return(error)
    }
}

async function ReadAll() {
    try {
        // Search
        const demandants = await sequelize.models.demandant.findAll();
        // Verification
        if (demandants == null){
            return(Promise.reject(new Error("No demandants available")))
        }
        return(demandants);
    } catch (error) {
        return(error)
    }
}

async function ReadOne(id_demandant) {
    try {
        // Search
        const demandant = await sequelize.models.demandant.findByPk(id_demandant);
        // Verification
        if (demandant == null){
            return(Promise.reject(new Error("No demandant available")))
        }
        return(demandant);
    } catch (error) {
        return(error)
    }
}

async function Update(data) {
    try {
        // Search
        const demandant = await sequelize.models.demandant.findByPk(data.id);
        // Verification
        if (demandant == null){
            return(Promise.reject(new Error("demandant does not exist")))
        }
        // Redefinition
        else {
            if (data.email){
                demandant.email = data.email;
            }
            if (data.password){
                demandant.password = data.password;
            }
            if (data.phone){
                demandant.phone = data.phone;
            }
            if (data.name){
                demandant.name = data.name;
            }
            if (data.address){
                demandant.address = data.address;
            }
            if (data.rut){
                demandant.rut = data.rut;
            }
            await demandant.save();
            return("demandant has been updated")
        }
    } catch (error) {
        return(error)
    }
}

async function Delete(id_demandant) {
    try {
        // Search
        const demandant = await sequelize.models.demandant.findByPk(id_demandant);
        // Verification
        if (demandant == null){
            return(Promise.reject(new Error("demandant does not exist")))
        }
        // Destruction
        await demandant.destroy();
        return("demandant has been destroyed")
    } catch (error) {
        return(error)
    }
}

async function SearchBy(filter) {
    try {
        // Search
        const demandants = await sequelize.models.demandant.findAll({
            where: filter
        });
        // Verification
        if (demandants == null){
            return(Promise.reject(new Error("No demandants available")))
        }
        return(demandants);
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