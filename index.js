const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
const connection = require('./connection');
const response = require('./response');

app.set("view engine","ejs")
app.use(bodyParser.urlencoded({ extended:true }));
// app.use(bodyParser.json()); -> untuk test postman
connection.connect((err) => {

app.get('/teacher',(req,res) => {
    connection.query("SELECT * FROM teacher",(err,result) => { 
        if(err){
            throw err
        }else{

            teacher = {teachers: result};
          console.log(teacher)
            res.render('index',teacher);
            // response(200,result,"get all data from teacher",res)
        }
    }) 
})

app.get('/teacher/create',(req,res) => {
    res.render('insert');
})

app.get('/teacher/edit/',(req,res) => {
    id_teacher = req.query.id;
    connection.query(`SELECT * FROM teacher WHERE id_teacher = ${id_teacher} `,(err,result) => {

        if(err) throw err
    else{
        teacher = {teachers: result}
    res.render('update',teacher);
    }
        })
})


// app.post('/teacher/store/',(req,res,next) => {
//     let name = req.body.name;
//     let subject = req.body.subject;
//     console.log(id_teacher)
//     connection.query(`SELECT * FROM teacher WHERE id_teacher = ${id_teacher} `,(err,result) => {
//         // INSERT INTO teacher VALUES ('','"+ req.body.name_teacher +"' , '"+ req.body.subject_teacher +"'
//         if(err) throw err
//     else{
//         teacher = {teachers: result}
//     res.render('update',teacher);
//     }
//         })
    
//         res.redirect('/teacher')
// })

app.post("/teacher/store",(req,res) => {
    const {teachers} =  req.body
    console.log(teachers)
    connection.query("INSERT INTO teacher VALUES ('','"+ req.body.name +"' , '"+ req.body.subject +"')",(err,rows,fields) => { 
        if(err){
           throw err
        }else{          
        console.log( req.body)
        res.redirect('/teacher')
       
        }
    }) 
})

app.post('/teacher/update',(req,res) => {
 
    connection.query(`UPDATE teacher set name_teacher = '` + req.body.name + `' , subject_teacher = '` +req.body.subject+`' WHERE id_teacher = ${req.query.id} `,(err,rows,fields) => { 
        if(err){
            throw err
        }else{
            res.redirect('/teacher')
        }
    })
})


app.get('/teacher/delete/',(req,res) => {
    let id_teacher = req.query.id
    connection.query("DELETE from teacher WHERE id_teacher = "+ id_teacher+"",(err,rows,fields) => { 
        if(err){
           throw err
        }else{
            res.redirect('/teacher')
        }
    })
})

app.listen(port,() => {
    console.log(`Server ready on port ${port}`);
})


});
