const db = require('../utils/db');
const queries = require('../utils/queries');

const getTasks = async (req, res) => {
    try{
        const response = await db.query(queries.GET_TASKS);
        console.log('Showing Tasks!');
        res.status(200).send(response.rows);
        }catch(err){    
            res.status(500).send('Server Error!')
            throw err;
        }
}

const getTaskById = async (req, res) => {
    try{

        const id = req.params.id;
        const checkId = await db.query(queries.CHECKTASKID, [id]);
    
        if(checkId.rows != ''){
            const response = await db.query(queries.GET_TASKBYID, [id]);
            console.log(`Showing Task ${id}!`);
            res.status(200).send(response.rows);
        }else{
            res.status(400).send(`Task ${id} not found!`)
        }
    
        }catch(err){
            res.status(500).send('Server Error!')
            throw err;
        }
}

const getTasksByUsername = async (req, res) => {
    try{ 
        const id = req.params.id;
        const username = await db.query(queries.GET_USERBYID, [id]);
        const response = await db.query(queries.GET_TASKSBYUSERNAME, [username]);
        
        if(response){
            console.log('Task Found!')
            return ({
                id: response.rows[0].id,
                name: response.rows[0].name,
                username: response.rows[0].username,
                email: response.rows[0].email,
                password: response.rows[0].password
            })
        }else{
           console.log('Task Not Found!')
           return null;
        }

    }catch(err){
        res.status(500).send('Server Error!');
        throw err; 
    }
}

module.exports = {
    getTasks,
    getTaskById,
    getTasksByUsername
}