"use server";

import { CreateTransaction } from "@/components/transactions/new/transactionForm";
import { auth0 } from "@/lib/auth0";

export const createTransaction = async (transaction: CreateTransaction) => {
  try {
    const token = await auth0.getAccessToken();
    console.log("CBTest: ", token);

    const res = await fetch(
      `${process.env.PERSONIFI_BACKEND_URL}/transaction`,
      {
        headers: {
          Authorization: `Bearer ${token.token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(transaction),
      }
    );

    if (res?.ok) {
      const transactionResponse = await res.json();
      return transactionResponse;
    } else {
      throw new Error(
        `HTTP Response Code: ${res?.status} \nHTTP Response Status: ${res.statusText}`
      );
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};
