var express = require("express");
var path = require("path");
var router = express.Router();
var manage = require("../models/admin");
// var saveId;

// router.get("/", function(req, res){
//     res.sendFile(path.join(__dirname, "../public/index.html"));
// });

// router.get("/index", function(req, res){
//     res.sendFile(path.join(__dirname, "../public/index.html"));
// });

// router.get("/login", function(req, res){
//     res.sendFile(path.join(__dirname, "../public/login.html"));
// });

router.get("/attendance", function(req, res){
    manage.all(function(data) {
    res.json({ checkedIn: data });
});
});

router.get("/members", function(req,res) {
    manage.allMembers(function(data) {
        res.json({ members: data })
    });
});

router.get("/trainers", function(req, res){
    manage.allTrainers(function(data) {
    res.json({ trainers: data });
});
});

router.delete("/members/id/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log(req.params.id);

    manage.delete(condition, function(result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });

    router.post("/trainers", function(req, res){
        console.log("add trainer")
        manage.create([
            "trainerFirstName", "trainerLastName"
        ], [
            req.body.trainerFirstName, req.body.trainerLastName
        ], function(result) {
            res.json({ id: result.insertId});
        });
    });
    });

module.exports = router;

// router.get("/signup", function(req, res){
//     res.sendFile(path.join(__dirname, "../public/signup.html"));
// });


// router.post("/signup", function(req, res){
//     pwd.create([
//         "name", "password"
//     ], [
//         req.body.name, req.body.password
//     ], function(result) {
//         res.json({ id: result.insertId});
//     });
// });

// router.get("/dashboard", function(req, res){
//     res.sendFile(path.join(__dirname, "../public/dashboard.html"));
// });

// router.get("/displayAccounts", function(req, res){
//     pwd.allAcc(function(data) {
//         res.json({ passwords: data });
//     });
// });

// router.get("/displayOne", function(req, res){
//     saveId = req.query.id 
//     module.exports.id = saveId; 
//     pwd.displayOne(req.query.id, function (data) {
//         res.json({passwords: data})
//     });
// });

// router.post("/createAccount/:id", function(req, res){
//     var userId = req.params.id;
//     console.log("controller");
//     pwd.createNewAcc([
//         "user_name", "type", "password" , "user_id"
//     ], [
//         req.body.user_name, req.body.type, req.body.password, userId
//     ], function(result) {
//         res.json({ id: result.insertId});
//     });
// });

// router.put("/dashboard/:id", function(req, res) {
//     var condition = "id = " + req.params.id;
//     console.log("controller");
//     pwd.update({
//         user_name: req.body.user_name,
//         password: req.body.password
//     }, condition, function(result) {
//         if (result.changedRows == 0) {
//             return res.status(404).end();
//         } else {
//             res.json({id: req.params.id});
//         }
//     });
// });

// router.delete("/dashboard/:id", function(req, res) {
//     var condition = "id = " + req.params.id;
//     console.log("controller");

//     pwd.delete(condition, function(result) {
//         if (result.affectedRows == 0) {
//             return res.status(404).end();
//         } else {
//             res.status(200).end();
//         }
//     });
// });

