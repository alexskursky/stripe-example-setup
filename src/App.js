import "./App.css";
import { stripePromise } from "./utils/stripe";
import { Elements } from "@stripe/react-stripe-js";
import PaymentMethodForm from "./components/PaymentMethodForm";
import { useEffect, useState } from "react";
import { getUser } from "./api/api";

function App() {
  const [user, setUser] = useState(null);

  const stripeOptions = {
    mode: "setup",
    currency: "usd",
    paymentMethodCreation: "manual",
  };

  useEffect(() => {
    getUser().then((data) => setUser(data));
  }, []);

  return (
    <Elements stripe={stripePromise} options={stripeOptions}>
      <PaymentMethodForm user={user} stripeOptions={stripeOptions} />
    </Elements>
  );
}

export default App;
