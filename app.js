const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

var lists = [];
var workList = [];

app.get('/', function(req,res){

    var today = new Date();
    var options = {weekday:'long', day:'numeric', month:'long'};

    var day = today.toLocaleDateString('en-US', options);
    res.render('index', {day:day, newList:lists});
});

app.post('/', function(req,res){

    console.log(req.body.button);
    var list = req.body.listItem

    if(req.body.button==='Work'){
        workList.push(list);

        res.redirect('/work');
    } else {
        lists.push(list);

        res.redirect('/');
    }
    

})

app.get('/work', function(req,res){
    res.render('index', {day:"Work List", newList:workList});

})


app.listen(3000, function(){
console.log('Server running on port 3000');
})