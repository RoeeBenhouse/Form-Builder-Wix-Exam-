//-----------SERVER---------------
//express and simple server that will listen to post 5000
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');


//express server gets raw request, body-parser simplifie the request for us 
const bodyParser = require('body-parser');
app.use(bodyParser.json());                             //support parsing of application/json type post data
app.use(bodyParser.urlencoded({ extended: true }));     //support parsing of application/x-www-form-urlencoded post data


//----------DB-------------
var mongo = require('mongodb');
var assert = require('assert');
const URI = "mongodb+srv://dbUser:dbUser@cluster0.mgr4i.mongodb.net/formsBuilderDB?retryWrites=true&w=majority";

//----- load data from DB ------
app.get('/api/get-data', function(req, res) {
  mongo.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true }, 
    function(err, client) {
      assert.equal(null, err);
      var db = client.db("formsBuilderDB");
      const collection = db.collection('forms');
      collection.find({}).toArray()
        .then( response => {
          var formsArray = response.reduce((acc, curr) => {
            let currForm_fields = [];
            curr.fields.forEach(field => {
                let newField = {
                    label: field.label,
                    input: field.input,
                    type: field.type
                }
                currForm_fields.push(newField);
            });
            let newForm = {formsName: curr.formsName, fields: currForm_fields};                                                        
            return acc.concat(newForm);
            }, []);
            client.close();
            res.send(formsArray);
        }).catch(err => console.log("error: " + err))
    }
  )
});
        
  
//----- insert to DB ------
app.post('/api/insert', function(req, res) {
  let formToInsert = {
    formsName: req.body.formsName, 
    fields: req.body.fields
  }
  mongo.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true },
    function(err, client) {
      assert.equal(null, err);
      var db = client.db("formsBuilderDB");
      const collection = db.collection('forms');
      collection.insertOne(formToInsert).then(() => collection.find({}).toArray())
        .then( response => {
            var formsArray = response.reduce((acc, curr) => {
              let currForm_fields = [];
              curr.fields.forEach(field => {
                  let newField = {
                      label: field.label,
                      input: field.input,
                      type: field.type
                  }
                  currForm_fields.push(newField);
              });
              let newForm = {formsName: curr.formsName, fields: currForm_fields};                                                        
              return acc.concat(newForm);
            }, []);
            client.close();
            res.send(formsArray);
        }).catch(err => console.log("error: " + err))
    }
  )
});        


//----- update to DB ------
app.post('/update', function(req, res, next) {

});

//----- delete to DB ------
app.post('/delete', (req, res, next) => {

});

//API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});


//Production Deployment to Heroku
//app can be viewed from any computer
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'Presentation_Layer/client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'Presentation_Layer/client/build', 'index.html'));
  });
}
    
app.listen(port, () => console.log(`Listening on port ${port}`));


