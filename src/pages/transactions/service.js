import { client } from "../../api/client";

const useURL = "/transactions";

export const getTransaction = async (adId) => {
  return client.post(useURL, adId).then(({ state, message, data }) => {
    const transactionData = {
      state,
      message,
      data,
    };
    return transactionData;
  });
};

export const getAcceptTransaction = async (transactionId) => {
  const url = `${useURL}/${transactionId}`;

  return client.post(url).then(({ state, message, data }) => {
    const acceptedData = {
      state,
      message,
      data,
    };
    return acceptedData;
  });
};

export const getRejectTransaction = async (transactionId) => {
  const url = `${useURL}/${transactionId}`;

  return client.post(url).then(({ state, message, data }) => {
    const rejectedData = {
      state,
      message,
      data,
    };
    return rejectedData;
  });
};

export const getTransactionsBySeller = async (userId) => {
  const url = `${useURL}/${userId}`;

  return client.get(url).then(({ state, message, data }) => {
    const transactionBySeller = {
      state,
      message,
      data,
    };
    return transactionBySeller;
  });
};

export const getTransactionByBuyer = async (userId) => {
  const url = `${useURL}/${userId}`;

  return client.get(url).then(({ state, message, data }) => {
    const transactionByBuyer = {
      state,
      message,
      data,
    };
    return transactionByBuyer;
  });
};
