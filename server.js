const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const collection = require("./config");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.urlencoded({ extended: false}));
app.use(express.json());


const port = 3000;
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', async(req, res)=>{
    
    try{
        const check = await collection.findOne({name:req.body.name})
        if(check.password === req.body.password){
            res.sendFile(path.join(__dirname, 'public', 'info.html'));
        }
        else{
            res.send("Incorrect password");
        }
    }
    catch{
        res.send("Invalid login details");
    }

})


app.get('/signup', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/home', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'infohtml'));
});

app.post('/signup', async(req, res)=>{
    const data = {
        name:req.body.name,
        password: req.body.password
    }

    const existUser = await collection.findOne({name: data.name});
    if(existUser){
        res.send("User already exists");
    }
    else{
        await collection.insertMany([data]);
        res.sendFile(path.join(__dirname, 'public', 'info.html'));

    }

    

})



app.listen(port,()=>{
    console.log(`Server is listening to: http://localhost:${port}`);
});