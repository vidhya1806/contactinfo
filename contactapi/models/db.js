const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://vidhya:vidhya@cluster0-nl9ma.mongodb.net/test?retryWrites=true&w=majority`,{ useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology:true,dbName:"contactlist"}, (err) => {
    if(!err){
        console.log('success');
    }else{
        console.log('not success',err);
    }
});

require('./contact');