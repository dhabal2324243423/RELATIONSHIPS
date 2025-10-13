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

const Order = mongoose.model("Order", orderSchema); // order schema
const Customer = mongoose.model("Customer", customerSchema); // customer schema.

const addCustomer = async () => {
  // let cust1 = new Customer({
  //   name: "Rahul Kumar",
  // });

  // let order1 = await Order.findOne({ iteam: "chips" });
  // let order2 = await Order.findOne({ iteam: "chocolates" });

  // cust1.orders.push(order1); // iteam se pura object he dhund kr push kr rhe hai re cust1 meh
  // cust1.orders.push(order2);

  // let result = await cust1.save();
  // console.log(result); // terminal ke andr pura object
  // // store hote dikhega but mongodb ke andr sirf id store hoga because humne schema aisa define kiya hai

  let result = await Customer.find();
  console.log(result);
};

addCustomer();

// const addOrders = async () => {
//   let res = await Order.insertMany([
//     { iteam: "samosa ", price: 12 },
//     { iteam: "chips", price: 10 },
//     { iteam: "chocolates", price: 40 },
//   ]);
//   console.log(res);
// };

// addOrders();
