import { useContext } from "react";
import axios from "axios";

import { AuthContext } from "../../contexts/AuthContext";
import { LogoutIcon } from "../../assets/Icons";

export default function Header() {
  const authCtx = useContext(AuthContext);
  const isPremiumUser = authCtx.loggedUser?.isPremiumUser;

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

  return (
    <header className="p-4 flex justify-between items-center fixed top-0 left-0 w-full border-b-2 bg-white z-10">
      <h1 className="text-xl font-bold sm:text-2xl">Expense Tracker</h1>
      {authCtx.loggedIn && (
        <div className="space-x-2 flex items-center">
          {isPremiumUser ? (
            <span> Premium User</span>
          ) : (
            <button
              className="border px-4 py-1 rounded-md hover:bg-indigo-600 hover:text-white transition-colors"
              onClick={handleBuyPremium}
            >
              Buy Premium
            </button>
          )}
          <button
            className="border p-2 rounded-full hover:bg-indigo-600 hover:text-white transition-colors"
            onClick={authCtx.logout}
            title="Logout"
          >
            <LogoutIcon />
          </button>
        </div>
      )}
    </header>
  );
}
