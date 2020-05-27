
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Contact = mongoose.model('Contact');

router.get('/',  async (req, res) => {  
    const cons = await Contact.find({});
    try {
      res.send(cons);
    } catch (err) {
      res.status(500).send(err);
    }
    
});
router.post('/', async (req, res) => {  
   const contacts = new Contact(req.body);
    try {
      await contacts.save();
      res.send(contacts);
    } catch (err) {
      res.status(500).send(err);
    }
});

router.put('/', function (req, res) {   
    Contact.findOneAndUpdate({ _id: req.body._id }, { name: req.body.name, email: req.body.email, number: req.body.number }, { new: true }, (err, data) => {
        if (!err) {
          res.send(data);
       }
        else {
            res.status(500).send(err);
        }
      });
});

router.delete('/', function (req, res) {   
  console.log(req,'ddd');
    Contact.deleteOne({ _id: req.query._id }, function (err, data) {
        if (!err)
         res.send({success:'successfully deleted'});
      });
});
module.exports = router;
