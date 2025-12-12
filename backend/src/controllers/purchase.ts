import { Request, Response } from "express";

import razorpay from "../utils/razorpay";
import HttpError from "../utils/HttpError";

export const postPurchasePremium = async (req: Request, res: Response) => {
  try {
    if (req.user.isPremiumUser) {
      throw new HttpError("User is already a premium user", 400);
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
  } catch (error: any) {
    console.error(error);
    res.status(error.code || 500).json(error.message);
  }
};

export const postUpdateTransactionStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const { orderId, paymentId } = req.body;
    const order = await req.user.getOrders({ where: { orderId: orderId } });

    if (order.length === 0) {
      throw new HttpError("Order not found", 404);
    }
    const currentOrder = order[0];

    await currentOrder.update({ paymentId: paymentId, status: "SUCCESSFUL" });
    await req.user.update({ isPremiumUser: true });

    res.status(201).json("Transaction status updated successfully");
  } catch (error: any) {
    console.error(error);
    res.status(error.code || 500).json(error.message);
  }
};
