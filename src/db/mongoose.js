const mongoose = require('mongoose');

mongoose.connect("mongodb://nodeauth123:nodeauth123@ds235947.mlab.com:35947/nodeauth",{
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() =>{
  console.log('connected to database');
}).catch(() =>{
  console.log('failed connected to database');
});
