const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
   },
   email:{
      type:String,
   },
   number:{
      type:Number,
   },
});
// contactSchema.path('email').validate((val)=>{
//    emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//    return emailRegex.test(val);
// },'Invalid email');

mongoose.model('Contact', contactSchema);







// const mongoose = require('mongoose');

// var contactSchema = new mongoose.Schema({
//     name:{
//       type: String,
//       required: true,
//      },
//      email:{
//         type:String,
//      },
//      number:{
//         type:Number,
//      }, 
//         //timestamps: true
//       });

// //  mongoose.model('Contact', contactSchema);
//   const Contacts = mongoose.model("Contact", contactSchema);
//   module.exports = Contacts;