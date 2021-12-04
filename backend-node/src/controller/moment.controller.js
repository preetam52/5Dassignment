const { momentModel } = require("../models/moment.model");
const mongoose = require('mongoose');
const { userModel } = require("../models/user.model");

const getMoments = async (req, res) => {
    try {
        const { page, limit} = req.query;
        const { userid } = req.headers;
        const moments = await momentModel.paginate({userid}, {page, limit, lean: true})

        return res.status(200).send({moments})
        
    } catch (error) {
        return res.status(400).send({error: error.message})

    }
}

const createMoment = async (req, res) => {

    const { moment } = req.body;
    try {
        moment.userId = new mongoose.Types.ObjectId(moment.userId)
        const userFromdb = await userModel.findOne({ _id: moment.userId });

        if(!userFromdb) return res.status(400).send({ error: `No moment found with this momentId: ${moment.userId}`});
        
        const momentToSaved = new momentModel(moment);
        const momentSaved = await momentToSaved.save();

        if(momentSaved) 
        return res.status(200).send({ momentSaved })
        else
        return res.status(400).send({ error: 'Something went wrong' })

    } catch (error) {
        res.status(400).send({ error: error.message })

    }
}

const updateMoment = async (req, res) => {
    try {
        const { momentId, fieldsToUpdate } = req.body;
        const momentFromdb = await momentModel.findOne({_id: momentId})

        if(!momentFromdb) return res.status(400).send({error: `No moment found with this momentId: ${momentId}`});

        const updatedMoment = await momentModel.findOneAndUpdate({_id: momentId}, fieldsToUpdate, { new: true, runValidators: true });
        console.log(updatedMoment);

        if(!updatedMoment) return res.status(400).send({error: `Something went wrong`});
        else res.status(200).send({ updatedMoment });

    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

const deleteMoment = async (req, res) => {
    try {
        const { momentId } = req.body;
        const isDeleted = await momentModel.findOneAndDelete({_id: momentId})
console.log(isDeleted);
        if(!isDeleted) return res.status(400).send({error: `No moment found with this momentId: ${momentId}`});
        else return res.status(200).send({message: `Moment deleted with this momentId: ${momentId}`});
    } catch (error) {
        return res.status(400).send({ error: error.message })

    }
}

module.exports = {
    getMoments,
    createMoment,
    updateMoment,
    deleteMoment
}