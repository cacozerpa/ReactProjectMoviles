const db = require('../utils/db');
const queries = require('../utils/queries');

const createTask =async (req, res) => {
    const {username, title, description, tag, date} = req.body;
    const id = req.parms.id;

    try{
        const user = db.query(queries.GET_USERBYID, [id]);
       if(user.rows != ''){
            await db.query('BEGIN')
            const response = await db.query(queries.CREATE_TASK, [username, title, description, tag, date]);
            console.log('Task Created! ' + response);
            await db.query('COMMIT');
            res.status(200).send('Task Created!');
        }else{
            await db.query('ROLLBACK');
            res.status(400).send("Username not Found!");
        }
    }catch(err){
        await db.query('ROLLBACK');
        res.status(500).send('Server Error!');
        throw err;
    }
}

const updateTask = async (req, res) => {
    const id = req.params.id;
    const {title, description, tag, date} = req.body;
    try{
       await db.query('BEGIN'); 
       const checkId = await db.query(queries.CHECKID, [id]);

       if(checkId.rows != ''){
        const response = await db.query(queries.UPDATE_USER, [title, description, tag, date, id]);
        console.log(response.rows);
        res.status(200).send(`Task ${id} updated!`)
        await db.query('COMMIT');
       }else{
        await db.query('ROLLBACK');
        res.status(400).send(`Username ${id} not Found!`);
       }
    }catch(err){
        await db.query('ROLLBACK');
        res.status(500).send('Server Error!');
        throw err;
    }
}

const deleteTask = async (req, res) => {
    try{
       const id = req.params.id;
     
       await db.query('BEGIN'); 
       const checkId = await db.query(queries.CHECKID, [id]);

       if(checkId =! '') {
           const response = await db.query(queries.DELETE_TASK, [id]);
           console.log(response.rows);
           res.status(200).send(`Task ${id} deleted!`);
            await db.query('COMMIT');
       }else{
        await db.query('ROLLBACK');
        res.status(400).send(`Task ${id} not Found!`);
       }
    }catch(err){      
        await db.query('ROLLBACK');
        res.status(500).send('Server Error!');
        throw err;
    }
}
module.exports = {
    createTask,
    updateTask
}