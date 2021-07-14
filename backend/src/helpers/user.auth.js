const db = require('../utils/db');
const bcrypt = require('bcrypt');
const queries = require('../utils/queries');

const createUser = async(req, res) => {

    const {username, email, password} = req.body;
    
        try{
            await db.query('BEGIN');
            const checkUser = await db.query(queries.CHECKUSER, [username]);
            const checkEmail = await db.query(queries.CHECKEMAIL, [email]);

            if(checkUser.rows == ''){
                if(checkEmail.rows == ''){
                    
                    const salt = bcrypt.genSaltSync(12);
                    const HashPass = bcrypt.hashSync(password, salt);
                    const response = await db.query(queries.CREATE_USER, [username, email, HashPass]);
                    console.log(response.rows);
                    res.status(200).send('User Created!')
                    await db.query('COMMIT');
                }else{
                    res.status(400).send('Email Exist');
                }
            }else{
                res.status(400).send('User Exist!')
            }
        }catch(err){
            res.status(500).send('Server Error!');
            await db.query('ROLLBACK');
            throw err;
        }
    
}

const updateUser = async (req, res) =>{
  
    try{ 
    await db.query('BEGIN'); 
    const id = req.params.id;
    const {email} = req.body;
    
    const checkIdU = await db.query(queries.CHECKID, [id]);
    const checkEmailU = await db.query(queries.CHECKEMAIL, [email]);

    if(checkIdU.rows != ''){
        if(checkEmailU.rows == ''){
        
    
    const response = await db.query(queries.UPDATE_USER, [email, id]);
    console.log(response.rows);
    res.status(200).send(`User ${id} updated!`)
    await db.query('COMMIT');
        }else{
        console.log(checkEmailU.rows);
        res.status(400).send('This email already Exist!')
    }

    }else{
        console.log(checkIdU.rows);
        res.status(400).send(`User Id ${id} not found!`)
    }
    }catch(err){
        await db.query('ROLLBACK');
        res.status(500).send('Server Error!');
        throw err;
    }
}

const deleteUser = async (req, res) =>{

    try{
    await db.query('BEGIN');
    const id = req.params.id;
    const user = await db.query(queries.GET_USERBYID, [id]);
    const username = user.rows[0].username;
    const checkIdD = await db.query(queries.CHECKID, [id]);

    if(checkIdD.rows != ''){

    const tasks = await db.query(queries.DELETE_USERTASKS, [username]);
    const response = await db.query(queries.DELETE_USER, [id]);
    await db.query('COMMIT');
    console.log(response.rows + tasks.rows);
    res.status(200).send(`User ${id} Deleted!`)
    }else{
        res.status(400).send(`User Id ${id} not found!`);
    }

    }catch(err){
        await db.query('ROLLBACK');
        res.status(500).send('Server Error!');
        throw err;
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser
}