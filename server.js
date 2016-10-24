var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

var mongojs = require('mongojs');
var databaseUrl = 'mongodb://admin:admin@ds031167.mlab.com:31167/address_book';
var db = mongojs(databaseUrl, ['serviceClients']);
db.on('error', function(err) {
    console.log('Catch ', err);
});
db.on('ready',function() {
    console.log('database connected');
});
app.get('/serviceClients',function(req,res){

    db.serviceClients.find(function(err,doc){
        res.json(doc);
    })
    // var svc ={'name':'hasssan'}
    // var svc1 ={'name':'pasha'}
    // var svc2 ={'name':'rahsa'}
    // var svc3 ={'name':'dasha'}
    // var serviceClients =[svc,
    //     svc1,
    //     svc2,
    //     svc3];
    //
});
app.post('/serviceClients',function(req,res){

    console.log(req.body);

    db.serviceClients.insert(req.body,function(err,doc){
        res.json(doc);
    })
});

app.get('/serviceClients/:id', function(req, res){
    console.log(req.params.id);

    db.serviceClients.findOne({_id:new mongojs.ObjectId(req.params.id)},function(err,docs){
        console.log('edit data',docs);
        res.json(docs);
    });
});


app.put('/serviceClients/:id', function(req, res){
    console.log('update data',req.body.name);

    db.serviceClients.findAndModify({query: {"_id": new mongojs.ObjectId(req.body._id)},
        update: {$set: {name: req.body.name}}
    }, function(err, docs){
        console.log(docs);
        res.json(docs);
    })

});

app.delete('/serviceClients/:id', function(req, res){
    console.log("Received delete one person request...");
    db.serviceClients.remove({_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
        console.log(docs);
        res.json(docs);
    });
});

var port = Number(process.env.PORT || 3000);
app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});