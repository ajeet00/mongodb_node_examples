
const express = require('express');
const router = express.Router();

const Subscriber = require('../models/subscriber');


router.get('/', async (req, res ) => {
     try {
        const subscriber = await Subscriber.find();
        res.json(subscriber);
     } catch(error) {
         res.status(500).json({ message: error.message });
     }
});

router.post('/', async (req, res) => {


     console.log(req.body);

     const subscriber = new Subscriber({
          name : req.body.name,
          subscribedToChannel: req.body.subscribedToChannel
     });

     try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
     } catch(error) {
        res.status(400).json({ message: err.message });
     }
      
})

module.exports = router;