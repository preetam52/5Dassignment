const { userModel } = require('../models/user.model');
const bcrypt = require('bcryptjs');


const signup = async (req, res) => {
    try {
        const { user } = req.body;
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        const userToSaved = new userModel(user);
        const userSaved = await userToSaved.save();
        if(userSaved)  
        return res.status(200).send({ message: 'Successfully signed up' })
        else
        return res.status(400).send({ message: 'Something went wrong' })

    } catch (error) {
        return res.status(400).send({ message: error.message })
    }

}

const signin = async (req, res) => {
    try {
        const {credentials} = req.body
        const userFromDb = await userModel.findOne({ email: credentials.email });
        if(!userFromDb) return res.status(400).send({ error: `No user found with this email: ${credentials.email}`});
        const isValidPassword = await bcrypt.compare(credentials.password, userFromDb.password);
        if(isValidPassword)  
        return res.status(200).send({ userId: userFromDb._id, message: 'User logged in successfully' })
        else
        return res.status(400).send({ message: 'Wrong Password! Try again with the correct one' });


    } catch (error) {
        return res.status(400).send({ message: error })
    }
}

module.exports = {
    signup,
    signin
}