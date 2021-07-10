const querys = {

    //User Queries
    GET_USERS: `SELECT * FROM public."Users"`,
    GET_USERBYID: `SELECT * FROM public. "Users" WHERE id = $1`,
    CREATE_USER: `INSERT INTO public."Users" (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,        GET_USERBYID: `SELECT * FROM public."Users" WHERE id = $1`,
    GET_USERBYUSERNAME: `SELECT * FROM public."Users" WHERE username = $1`,
    UPDATE_USER: `UPDATE public."Users" SET email = $1 WHERE id= $2 RETURNING *`,
    DELETE_USER: `DELETE FROM public."Users" WHERE id = $1`,

    //LogIn
    LOGIN: `SELECT * FROM public. "Users" WHERE username = $1 AND password= $2`,

    //Validation Queries
    CHECKEMAIL: `SELECT * FROM public."Users" WHERE email = $1`,
    CHECKUSER: `SELECT * FROM public."Users" WHERE username = $1`,
    CHECKPASS:`SELECT * FROM public."Users" WHERE password = $1`,
    CHECKID: `SELECT * FROM public. "Users" WHERE id = $1`,
    CHECKTASKID: `SELECT * FROM public. "Tasks" WHERE id=$1`,

    //Task Queries
    CREATE_TASK: `INSERT INTO public. "Task" (username, title, description, tag, date) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    GET_TASKS: `SELECT * FROM public. "Tasks"`,
    GET_TASKBYID: `SELECT * FROM public. "Tasks" WHERE id =$1`,
    GET_TASKSBYUSERNAME: `SELECT * FROM public. "Tasks" WHERE username = $1`,
    UPDATE_TASK: `UPDATE public. "Tasks" SET title = $1, description = $2, tag = $3, date = $4 WHERE id = $5 RETURNING *`,
    DELETE_TASK: `DELETE FROM public. "Tasks" WHERE id = $1`
    
}

module.exports = querys;