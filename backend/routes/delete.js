const express = require("express");
const router = express.Router();
const connection = require('../db/connect')
var fs = require('fs');

const sql = "DELETE FROM users WHERE `users`.`image` = ?"
router.delete('/:image', (req, res) => {
    const image = req.params.image;

    connection.query(sql, [image], (err, result) => {
        if (err) {
            res.send(err)  
        }
        else {
            fs.unlink(`../../node_react_mysql_image/frontend/src/images/${image}`, function (err) {
                if (err) {
                throw err       
                    }
        else {
                    res.send("data deleted from database")
                }
            })
        }
    });
})

module.exports = router;