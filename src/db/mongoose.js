const mongoose = require('mongoose');

mongoose.connect('mongodb://nodeauth:nodeauth123@ds127644.mlab.com:27644/nodeauth',{
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() =>{
  console.log('connected to database');
}).catch(() =>{
  console.log('failed connected to database');
});