import request from "../utils/axios";

export const getUser = async () => {
  const { data } = await request.get(
    "user/917380f7-4488-4489-9f9b-d3dec928b920",
  );
  return data;
};

export const createPaymentIntent = async (customerId) => {
  const { data } = await request.post("/stripe/create-setup-intent", {
    customerId,
  });
  return data;
};

export const addPaymentMethod = async (cardDetails, customerId) => {
  const { data } = await request.post(`/user/${customerId}/payment-method`, {
    cardDetails,
  });
  return data;
};
