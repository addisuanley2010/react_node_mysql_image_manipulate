const express = require("express");
const router = express.Router();
const connection = require('../db/connect')
 router.get('/', (req, res) => {
    res.send('hello router')
})


 const sql = "INSERT INTO `users`( `name`, `department`, `image`) VALUES (?,?,?)";

router.post('/', (req, res) => {

    const { name, department, image} = req.body
  

    

 connection.query(sql, [name,department,image], (err, results) => {
if(err){
    res.send(err)
}else{
    res.send(results)
}
            });


})


module.exports = router;