import React, { useState } from "react";
import ItemsCounter from "./ItemsCounter";
import SelectPaymentMethod from "./SelectPaymentMethod";
import InvoicePayment from "./InvoicePayment";

const OrderCheckout = ({ user }) => {
  const [counter, setCounter] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const [step, setStep] = useState(0);

  const selectPaymentMethodHandler = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
    setStep(step + 1);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <h1>Order Checkout</h1>
      {step === 0 && (
        <ItemsCounter
          counter={counter}
          setCounter={setCounter}
          setStep={setStep}
          step={step}
        />
      )}
      {step === 1 && (
        <SelectPaymentMethod
          onSelectPaymentMethod={selectPaymentMethodHandler}
          user={user}
        />
      )}
      {step === 2 && (
        <InvoicePayment
          selectedPaymentMethod={selectedPaymentMethod}
          user={user}
          counter={counter}
        />
      )}
    </div>
  );
};

export default OrderCheckout;
