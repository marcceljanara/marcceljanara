import express from 'express';
import bodyParser from 'body-parser';
import { db } from './connection.mjs';
import { response } from './response.mjs';

const app = express();
const port = 3000;
app.use(bodyParser.json())

app.get('/', (req,res) =>{
    const sql = "SELECT * FROM mahasiswa"
    db.query(sql,(error,result) =>{
        //hasil queri mysql
        response(200,result,"Tampilkan seluruh data mahasiswa",res)
    })
})
app.get('/find', (req,res) =>{
    const sql = `SELECT name FROM mahasiswa WHERE nim = ${req.query.nim}`
    db.query(sql,(error,result) =>{
        console.log(result)
        if(error){
            response(400,result,"Terjadi error",res)
        }
        if(!result){
            
            response(404,result,"Data tidak ditemukan",res)
        }
            response(200,result,"Data ditemukan",res)
        
    })
    console.log("find nim: ",req.query.nim)
    
})
app.post("/login",(req,res) =>{
    console.log({"RequestValue": req.body})
    res.send("Login Success")
})

app.listen(port,() => {
    console.log(`Listen at port ${port}`);
})