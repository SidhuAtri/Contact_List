const express = require('express');
const port = 8000;
const path = require('path');
const db = require('./config/mongoose');
const contact = require('./models/contact')
const app = express();

app.set('view engine','ejs');
app.use(express.urlencoded());
app.use(express.static(__dirname + '/assets'));

var contactlist = [
    // {
    //     name : "Sid",
    //     phone : "7404432656"
    // },
    // {
    //     name : "Admin",
    //     phone : "999999999"   
    // },
    // {
    //     name : "User",
    //     phone : "1234567890" 
    // }
]


app.get('/',function(req,res){
    // res.send("Cool,it is running !");
    return res.render('home',{title: "My Contacts List" , contacts_list : contactlist});
});

app.post('/', function(req,res){
   // contactlist.push(req.body);
   contact.create({
       name : req.body.name,
       phone : req.body.phone
   },function(err,newcontact){
       if(err){
           console.log("Error in creating contact");
           return;
       }
       console.log("**********",newcontact);
       return res.redirect('back');
   });

});

app.get('/practice',function(req,res){
    return res.render('practice',{title : "Playing with ejs"});
});

app.get('/delete-contact',function(req,res){
    let phone = req.query.phone;
    let contactindex = contactlist.findIndex(contact=> contact.phone==phone);
    if(contactindex != -1){
        contactlist.splice(contactindex,1);
    }
    return res.redirect('back');
});

app.set('views',path.join(__dirname,'views'));

app.listen(port,function(err){
    if(err)
    {
        console.log("Error " ,err);
    }
    console.log("Server is OK and port is ",port);
});