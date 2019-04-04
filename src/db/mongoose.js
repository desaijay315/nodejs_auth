const mongoose = require('mongoose');

mongoose.connect('mongodb://nodejsauth:nodejsauth1@ds123625.mlab.com:23625/nodejs-auth',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() =>{
  console.log('connected to database');
}).catch(() =>{
  console.log('failed connected to database');
});

