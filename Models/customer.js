// user.js se relate mat kro
const mongoose = require("mongoose");
const { Schema } = mongoose; // const schema = mongoose.schema
// schema = schema (shyad)

main()
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/relationDemo");
}

const orderSchema = new Schema({
  // for orders .
  iteam: String,
  price: Number,
});

const customerSchema = new Schema({
  // customer schema.
  // for customer .
  name: String,
  orders: [
    {
      type: Schema.Types.ObjectId, //didn't understand this syntax (meaning -> order se order id yah store karna )
      ref: "Order",
    },
  ],
});

customerSchema.post("findOneAndDelete", async (customer) => {
  if (customer.orders.length > 0) {
    let result = await Order.deleteMany({ _id: { $in: customer.orders } });
    // Orders se schema access kita and using $in operator.
    console.log(result);
  }
});

const Order = mongoose.model("Order", orderSchema); // order schema
const Customer = mongoose.model("Customer", customerSchema); // customer schema.

const findCustomer = async () => {
  let result = await Customer.find().populate("orders"); // populate is used to fetch the details of the referenced document (order in this case)
  // hamne customer ke andr orders ko access kiyta hai usme order id likha  and then refrence . populate use karte waqt hamne
  // usme order likha jiska refrence diya hai customer schema me .
  // populate ne wha se order id ko access kiya and then order ke andr jo bhi details hai wo leke aaya .(print kardiya )
  // console.log(result[0]);
};

findCustomer();

// const addOrders = async () => {
//   let res = await Order.insertMany([
//     { iteam: "samosa ", price: 12 },
//     { iteam: "chips", price: 10 },
//     { iteam: "chocolates", price: 40 },
//   ]);
//   console.log(res);
// };

// addOrders();

const addCustomer = async () => {
  let newCust = new Customer({
    name: "karan Arjun",
  });
  let newOrder = new Order({
    iteam: "Burger",
    price: 250,
  });
  newCust.orders.push(newOrder); // pushing order id in the orders array of customer schema
  await newOrder.save();
  await newCust.save();

  console.log("added new customer");
};

const deleteCustomer = async () => {
  // to delete the customer..
  let data = await Customer.findByIdAndDelete("68ee8551c1633dc098c226cb");
  console.log(data); // delete data post ke pass gya (post middleware iske baad run hota) .
};

deleteCustomer();
