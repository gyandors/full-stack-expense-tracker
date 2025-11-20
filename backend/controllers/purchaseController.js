const razorpay = require("../utils/razorpay");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.postPurchasePremium = async (req, res) => {
  try {
    if (req.user.isPremiumUser) {
      const error = new Error("User is already a premium user");
      error.code = 400;
      throw error;
    }

    const order = await razorpay.orders.create({
      amount: 49900, // Amount in paise (499.00 INR)
      currency: "INR",
    });

    await req.user.createOrder({
      orderId: order.id,
      status: "PENDING",
    });

    res.status(201).json({ ...order });
  } catch (error) {
    console.error(error);
    res.status(error.code || 500).json(error.message);
  }
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.PostUpdateTransactionStatus = async (req, res) => {
  try {
    const { orderId, paymentId } = req.body;
    const order = await req.user.getOrders({ where: { orderId: orderId } });

    if (order.length === 0) {
      const error = new Error("Order not found");
      error.code = 404;
      throw error;
    }
    const currentOrder = order[0];

    await currentOrder.update({ paymentId: paymentId, status: "SUCCESSFUL" });
    await req.user.update({ isPremiumUser: true });

    res.status(201).json("Transaction status updated successfully");
  } catch (error) {
    console.error(error);
    res.status(error.code || 500).json(error.message);
  }
};
