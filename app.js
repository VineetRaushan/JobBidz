const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/sign_upData');
}
const port = 8000;


//Defining mongoose schema
const sign_upData = new mongoose.Schema({
    first: String,
    last: String,
    age: String,
    gender: String,
    username: String,
    password: String
});
  const sign_up = mongoose.model('sign_up', sign_upData);  

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())
app.use(express.static('views'));
// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

 


app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact_us', (req, res)=>{
    const params = {}
    res.status(200).render('contact_us.pug', params);
})

app.get('/sign_up', (req, res)=>{
    const params = {}
    res.status(200).render('sign_up.pug', params);
})
app.get('/about_us', (req, res)=>{
    const params = {}
    res.status(200).render('about_us.pug', params);
})

app.get('/hire_now', (req, res)=>{
    const params = {}
    res.status(200).render('hire_now.pug', params);
})

app.get('/log_in', (req, res)=>{
    const params = {}
    res.status(200).render('log_in.pug', params);
})

app.get('/need_job', (req, res)=>{
    const params = {}
    res.status(200).render('need_job.pug', params);
})



app.post('/sign_up', (req, res)=>{
    var myData = new sign_up(req.body);
    myData.save().then(()=>{
            res.send("This item has been saved")
        }).catch(()=>{
          
        })
    res.status(200).render('sign_up.pug');
})

app.get('../views/about_us', (req, res) => {
    res.sendFile('about_us.pug', { root: __dirname + '/views' });
  });


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});


