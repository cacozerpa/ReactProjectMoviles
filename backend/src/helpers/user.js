const db = require('../utils/db');
const queries = require('../utils/queries');

const getUsers = async (req, res) =>{
    try{
    const response = await db.query(queries.GET_USERS);
    console.log('Showing Users!');
    res.status(200).send(response.rows);
    }catch(err){    
        res.status(500).send('Server Error!')
        throw err;
    }
}

const getUsersById = async (req,res) => {
    try{

    const user_id = req.params.user_id;
    const checkId = await db.query(queries.CHECKID, [user_id]);

    if(checkId.rows != ''){
        const response = await db.query(queries.GET_USERBYID, [user_id]);
        console.log(`Showing User ${user_id}!`);
        res.status(200).send(response.rows);
    }else{
        res.status(400).send(`User ${user_id} not found!`)
    }

    }catch(err){
        res.status(500).send('Server Error!')
        throw err;
    }
}

const getUserByUsername = async (username) => {

    try{ 
       
        const response = await db.query(queries.GET_USERBYUSERNAME, [username]);
        
        if(response){
            console.log('Username Found!')
            return ({
                id: response.rows[0].id,
                name: response.rows[0].name,
                username: response.rows[0].username,
                email: response.rows[0].email,
                password: response.rows[0].password
            })
        }else{
           console.log('Username Not Found!')
           return null;
        }

    }catch(err){
        res.status(500).send('Server Error!');
        throw err; 
    }
}

module.exports = {
    getUsers,
    getUsersById,
    getUserByUsername
}