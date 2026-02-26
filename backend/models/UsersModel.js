const pool = require('../db')

const { encryptPassword, comparePassword } = require('../controller/authController')

const getUsers = async ()  =>{
    try {        
        const result = await pool.query('Select name, email, role, phone_number from users')
        return result.rows
    } catch (error) {
        throw error
    }
}
const registerUser = async (name, email, password )  =>{
    try{
        const passwordHash = await encryptPassword(password)
        const result = await pool.query('Insert into users (name, email, password_hash) values ($1, $2, $3) returning id, name, email',[name, email, passwordHash])
        return result.rows[0]
    } catch (error) {
        throw error
    }
}
const updateUser = async ( name, email, passwordHash, role, phoneNumber, id)  =>{
    try {        
        const result = await pool.query('Update users set name=$1, email=$2, password_hash=$3, role=$4, phone_number=$5 where id=$6 returning id, name, email, role, phone_number', [name, email, passwordHash, role, phoneNumber, id])
        return result.rows[0]
    } catch (error) {
        throw error
    }
}
const deleteUser = async (id)  =>{
    try{
        const result = await pool.query('Delete from users where id=$1 returning id, name, email, role, phone_number',[id])
        return result.rows[0]
    } catch (error) {
        throw error
    }
}
const loginUser = async (email, password)  =>{
    try{
        const result = await pool.query('Select password_hash from users where email=$1',[email])

        if (result.rows.length === 0) return null;

        const user =  result.rows[0];
        const isMatch = await comparePassword(password, user.password_hash)
        
        if(!isMatch) return null

        const {password_hash , ...userWithouPassword} = user
        return userWithouPassword
    } catch (error) {
        throw error
    }
}


module.exports = {getUsers, registerUser, updateUser, deleteUser, loginUser}