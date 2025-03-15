const userModel = require('../models/user');


module.exports.createUser = async({firstname,lastname,password,email})=>{
    if(!firstname || !password || !email){
        throw new Error('all fields are required')
    }
    console.log(lastname);
    const user =await userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })
    console.log('created the user',user)
    return user;
}

    

