import { useContext } from "react";
import axios from "axios";

import { AuthContext } from "../../contexts/AuthContext";
import { LogoutIcon, PremiumIcon } from "../../assets/Icons";

export default function UserProfile({ setShowProfile }) {
  const authCtx = useContext(AuthContext);
  const loggedUser = authCtx.loggedUser;

  const handleBuyPremium = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/purchase/premium",
        {},
        { headers: { Authorization: authCtx.loggedUser.idToken } }
      );

      const order = response.data;

      const options = {
        key: import.meta.env.VITE_RAZOR_KEY_ID,
        order_id: order.id,
        handler: async (response) => {
          try {
            await axios.post(
              "http://localhost:4000/api/purchase/updateTransactionStatus",
              {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
              },
              {
                headers: {
                  Authorization: authCtx.loggedUser.idToken,
                  "Content-Type": "application/json",
                },
              }
            );

            authCtx.setIsPremiumUser(true);

            alert("You are now a premium user!");
          } catch (error) {
            console.error(error);
            alert("Something went wrong. Please contact support.");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert(error.response.data || "Something went wrong. Please try again.");
    }
  };

  const handleLogout = () => {
    setShowProfile(false);
    authCtx.logout();
  };

  return (
    <>
      <p className="text-gray-600">
        <span className="font-semibold">Hi, </span> {loggedUser?.firstName}{" "}
        {loggedUser?.lastName}
      </p>
      {loggedUser?.isPremiumUser ? (
        <span className="flex items-center gap-1 px-4 py-1 border border-green-500 text-green-600 rounded-md">
          Premium User <PremiumIcon />
        </span>
      ) : (
        <button
          className="border px-4 py-1 rounded-md border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition-colors"
          onClick={handleBuyPremium}
        >
          Buy Premium
        </button>
      )}
      <button
        className="border p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors"
        onClick={handleLogout}
        title="Logout"
      >
        <LogoutIcon />
      </button>
    </>
  );
}
