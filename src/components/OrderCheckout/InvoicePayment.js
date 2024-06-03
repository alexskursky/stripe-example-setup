import React, { useEffect, useState } from "react";
import { createPaymentIntent } from "../../api/api";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InvoicePayment = ({ user, selectedPaymentMethod, counter }) => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [secret, setSecret] = useState("");

  const notifySuccess = (m) => toast(m, { type: "success", autoClose: 2000 });
  const notifyError = (m) => toast(m, { type: "error", autoClose: 2000 });

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(
      user.paymentsAccount.id,
      counter,
      selectedPaymentMethod,
    ).then((data) => {
      setAmount(data.totalAmount);
      setSecret(data.clientSecret);
    });
  }, []);

  // Custom checkout session

  const payHandler = async () => {
    if (!stripe || !elements) {
      return;
    }

    try {
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(secret, {
          payment_method: selectedPaymentMethod,
        });
      notifySuccess("Payment successful");
    } catch (e) {
      notifyError(e.message);
    }
  };

  // Stripe checkout session

  // const payHandler = async () => {
  //   const body = {
  //     customerId: user.paymentsAccount.id,
  //     counter,
  //   };
  //
  //   const res = await axios.post("/stripe/create-checkout-session", body);
  //   const result = await stripe.redirectToCheckout({
  //     sessionId: res.data.id,
  //   });
  // };

  return (
    <>
      <ToastContainer position="top-center" />
      {loading ? (
        "Loading..."
      ) : (
        <div
          style={{
            gap: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>Amount: {amount / 100}$</div>
          <button onClick={payHandler}>Pay</button>
        </div>
      )}
    </>
  );
};

export default InvoicePayment;
