import React, { useEffect, useState } from "react";
import { getAllPaymentMethods } from "../../api/api";

const SelectPaymentMethod = ({ user, onSelectPaymentMethod }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    if (!paymentMethods.length) {
      getAllPaymentMethods(user.id).then((data) => setPaymentMethods(data));
    }
  }, []);

  return (
    <>
      <h3>Select Payment Method</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
        }}
      >
        {paymentMethods?.map((paymentMethod) => (
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
            key={paymentMethod.id}
          >
            <div>
              <div>Brand: {paymentMethod.card.brand}</div>
              <div>
                {paymentMethod.card.exp_month}/{paymentMethod.card.exp_year}
              </div>
            </div>
            <div>
              <div>Card: **** **** **** {paymentMethod.card.last4}</div>
              <button onClick={() => onSelectPaymentMethod(paymentMethod.id)}>
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SelectPaymentMethod;
