const express  = require('express');
const router = express.Router();

const { storeUser, getUserData, updateUser, deleteUser } = require('../services/UserServices');

router.post('/create', storeUser);
router.get('/get-all-data', getUserData);
router.put('/update/:userId', updateUser);
router.delete('/delete-user/:userId', deleteUser);

module.exports = router;


