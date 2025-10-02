const mongoose = require('mongoose');
const {Schema} = mongoose; // const schema = mongoose.schema
// schema = schema (shyad)


main().then(() => console.log("connection successful")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/relationDemo');
} ; 

const userSchema = new Schema({
  username: String,
  addresses : [
    {   _id : false, // to remove location's individual id 
        location : String,
        city : String
  }
]
});

const User = mongoose.model('User', userSchema);

const addUsers = async () => {  
    let user1 = new User ({
        username : "sherlock holmes",
        addresses : [{
            location : " 221B Baker Street",
            city : "London "
    }]
    });
    
    user1.addresses.push({location : "p32 wallStreet", city : "London"});   
   let result = await user1.save();
    console.log(result);
};

addUsers(); 