
const mysql2 = require('mysql2')
const con = mysql2.createConnection({
   host:'localhost',
    user:'root',
    port:'3360',
    password:'',
    database:'imageTutor' 
})   
con.connect((err) => {
    if (err)
        console.log(err)
    else
        console.log("connected");
});

//but , this is mandatory
module.exports = con;