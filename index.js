var express = require('express');
const { type } = require('express/lib/response');
var fs = require('fs');
var app = express();
app.use(express.json());
app.get("/", function(req, res){
    fs.readFile("./client/index.html", "utf-8", function(err, data){
        if(err) throw err;
        else
            res.end(data);
    })
})
app.get("/script.js", function(req, res){
    fs.readFile("./client/script.js", "utf-8", function(err,data){
        if(err) throw err;
        else
        res.end(data);
    })
})
app.get("/style.css", function(req, res){
    fs.readFile("./client/style.css", "utf-8", function(err, data){
        if(err)
        throw(err);
        else
        res.end(data)
    })
})


app.post("/save", function(req, res){
    fs.readFile("./db/db.txt", 'utf-8', function(err, data){
       var todos = [];
       if(data.length >0) {
        todos = JSON.parse(data);
       }
        todos.push(req.body);
        fs.writeFile("./db/db.txt", JSON.stringify(todos), function(err){
            if(err)
                res.end(err);
            else
                res.end();
        })
   })
})
app.get("/todo", function(req, res){
    fs.readFile("./db/db.txt", "utf-8", function(err, data){
            res.end(data);
        
    })
})


app.post("/handleDelete", function(req, res) {
     var toDel = (req.body)
     fs.readFile("./db/db.txt", 'utf-8', function(err, data){
        var todos = [];
        if(data.length >0) {
         todos = JSON.parse(data);
        }
        var i = 0;
        todos.forEach(function(task) {
            if(task.todo.id == toDel.toDelete)
                todos.splice(i,1)
            i++;
        })
         fs.writeFile("./db/db.txt", JSON.stringify(todos), function(err){
             if(err)
                 res.end(err);
             else
                 res.end();
         })
    })
})

app.post("/handleToggle", function(req, res){
    var toTog = req.body
    fs.readFile("./db/db.txt", 'utf-8', function(err, data){
        var todos = [];
        if(data.length > 0)
            todos = JSON.parse(data)
        todos.forEach(function(task){
            if(task.todo.id === toTog.toToggle)
            {
                task.todo.isChecked = !task.todo.isChecked
            }
        })
        fs.writeFile('./db/db.txt', JSON.stringify(todos), function(err){
            if(err)
                res.end(err)
            else
                res.end();
        })
    })
    res.end();
})
app.listen(3000,function() {
    console.log(`App running on Port 3000`);
})