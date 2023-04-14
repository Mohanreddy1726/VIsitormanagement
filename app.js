const express = require('express');
const ejs = require('ejs');
const multer = require('multer');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const path = require('path');


app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.static("uploads"));


app.use(bodyParser.urlencoded({ extended: true}));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});



const upload = multer({ storage: storage});

mongoose.connect("mongodb+srv://19l31a1958:Ammu2309@cluster0.lnolwqg.mongodb.net/VisitorDB");
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});


const visitorSchema = {
    date: String,
    time: String,
    purpose: String,
    facultyid: String,
    department: String,
    deliverypurpose: String,
    deliverycompany: String,
    deliveryto: String,
    Purpose: String,
    title: String,
    phone: Number,
    Vehiclephoto: String,
    Vehiclephotopath: String,
 }
 
 const visitor = mongoose.model("visitor", visitorSchema);
 
 
 
 app.post("/",  upload.single('photo'), function(req,res){
    var today = new Date();
    var d = new Date(Date. now()). toLocaleString(). split(',')[0];
    var t = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let newVisitor = new visitor({
    date: d,
    time: t,
 purpose: req.body.purpose,
 facultyid: req.body.facultyid,
 department: req.body.department,
 deliverypurpose: req.body.deliverypurpose,
 deliverycompany: req.body.deliverycompany,
 deliveryto: req.body.deliveryto,
 Purpose: req.body.Purpose,
 title: req.body.title,
 phone: req.body.phone,
 Vehiclephoto: req.file.filename,
 Vehiclephotopath: req.file.path,
 

  });


  newVisitor.save();
  res.redirect("/");
 });

 
 app.get('/exit', (req,res) =>{
    visitor.find({}) .then(visitors =>{
      res.render('exit', {
        VisitorsList: visitors
      });
    });
  });
app.get("/", function(req,res){
    res.render("index");
});
app.get("/exit", function(req,res){
    res.render("exit");
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});