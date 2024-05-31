import React, { useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { addPaymentMethod } from "../api/api";

const PaymentMethodForm = ({ user }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      setLoading(false);
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      return;
    }
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      elements,
      params: { type: "card" },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    try {
      await addPaymentMethod(paymentMethod, user.paymentsAccount.id);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "500px",
        padding: "20px",
        margin: "auto",
        border: "1px solid #ccc",
        borderRadius: "5px",
        marginTop: "50px",
      }}
    >
      <PaymentElement />
      <button
        style={{
          padding: "10px",
          marginTop: "30px",
          backgroundColor: "#f1f1f1",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        type="submit"
      >
        {loading ? "Loading..." : "Add Payment Method"}
      </button>
    </form>
  );
};

export default PaymentMethodForm;
