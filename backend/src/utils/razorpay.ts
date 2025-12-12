import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID!,
  key_secret: process.env.RAZOR_KEY_SECRET!,
});

export default razorpay;
