var orm = require("../config/orm");

var admin = {
    create: function(cols, vals, cb) {
        orm.create("trainersTable", cols, vals, function(res) {
            cb(res);
    });
},
    all: function(cb) {
        orm.all("checkInTable", function(res) {
            cb(res);
        });
    },

    allMembers: function(cb) {
        orm.allMembers("membersTable", function(res) {
            cb(res);
        });
    },

    allTrainers: function(cb) {
        orm.allTrainers("trainersTable", function(res) {
            cb(res);
        });
    },

    allClasses: function(cb) {
        orm.allClasses("classesTable", function(res) {
            cb(res);
        });
    },

    createNewClass: function(cols, vals, cb) { 
        console.log("add new class admin");
        orm.createNewClass("classesTable", cols, vals, function(res) {
            cb(res);
    });
    },

    delete: function(condition, cb) {
        console.log("delete member");
        orm.delete("membersTable", condition, function(res){
            cb(res);
        });
    }
};

module.exports = admin;
