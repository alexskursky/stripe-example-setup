import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_CLIENT_PUBLISHABLE,
);

export const stripeOptions = {
  // passing the client secret obtained from the server
  clientSecret: "asfasfwe",
};
