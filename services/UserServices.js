const User = require('../models/users');


const storeUser = async (req, res)  => {
    try {
        const newUser = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            age: req.body.age,
            gender: req.body.gender,
            isSallerAccount : req.body.isSallerAccount,
            addresses: [
                {
                    type: req.body.addresses.type,
                    street: req.body.addresses.street,
                    city: req.body.addresses.city,
                    state: req.body.addresses.state,
                    zip: req.body.addresses.zip,
                    country: req.body.addresses.country
                }
            ]
        });

       const userStoreStatus = await newUser.save();
       console.log("Response after insert into mongodb ", userStoreStatus);      
       if(userStoreStatus?._id)  {
          res.status(201).json({message : "User Created Successfully"});
       } else {
          res.status(400).json({message : "Bad Request"});
       }
    } catch(error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
}


const getUserData = async (req, res) => {
    try {

           // Extract page and limit from request query parameters
           const page = parseInt(req.query.page) || 1;
           const limit = parseInt(req.query.limit) || 2;

           const search = req.query.searchvalue || null;

           var searchKeyValue = {};
           if(search) {
             searchKeyValue = {"first_name": "ajeet"};
           }
   
           // Calculate the number of documents to skip
           const skip = (page - 1) * limit;
   
           // Query database to fetch paginated data
           const result = await User.find(searchKeyValue).skip(skip).limit(limit).exec();
      
           if (result && result.length > 0) {
               res.status(200).json({ 
                   message: "User Data Fetched Successfully", 
                   currentPage: page,
                   totalPages: Math.ceil(result.length / limit),
                   data: result 
               });
           } else {
               res.status(404).json({ message: "No users found" });
           }

    } catch(error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


const updateUser = async (req, res) => {
    try {

        const userId = req.params.userId; // Assuming userId is passed in the request params
        const updateData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            age: req.body.age,
            gender: req.body.gender,
            addresses: {
                type: req.body.addresses.type,
                street: req.body.addresses.street,
                city: req.body.addresses.city,
                state: req.body.addresses.state,
                zip: req.body.addresses.zip,
                country: req.body.addresses.country
            }
        };

        // Find the user by userId and update the user data
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (updatedUser) {
            res.status(200).json({ message: "User updated successfully", data: updatedUser });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId; // Assuming userId is passed in the request params

        // Find the user by userId and delete it
        const deletedUser = await User.findByIdAndDelete(userId);
        if (deletedUser) {
            res.status(200).json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = {storeUser, getUserData, updateUser, deleteUser};
