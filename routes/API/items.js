const express = require('express');
const router = express.Router();

//Item Model
const Item = require('../../models/Item');

//@route GET application
//@desc Get All Items
//@access Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});

//@route POST application
//@desc Creates an item
//@access Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

//@route Delete application
//@desc Deletes an item
//@access Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id).then(
        item => item.remove().then(() => res.json({ success: true }))
    ).catch(err => res.status(404).json({ success: true }));
});

module.exports = router;