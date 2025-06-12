"use server";

import { CreateTransaction } from "@/components/transactions/new/transactionForm";
import { auth0 } from "@/lib/auth0";
import { date } from "zod";

export const createTransaction = async (transaction: CreateTransaction) => {
  const createTransactionDto = {
    categoryId: 1,
    amount: transaction.amount,
    transactionType: transaction.type,
    description: transaction.description,
    notes: transaction.notes,
    transactionDate: date,
  };

  const body = JSON.stringify(createTransactionDto);

  console.log("CBBody: ", body);

  try {
    const token = await auth0.getAccessToken();

    const res = await fetch(
      `${process.env.PERSONIFI_BACKEND_URL}/transaction`,
      {
        headers: {
          Authorization: `Bearer ${token.token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          ...transaction,
          categoryId: 1,
          transactionType: "Expense",
        }),
      }
    );

    if (res?.ok) {
      const transactionResponse = await res.json();
      return transactionResponse;
    } else {
      console.error(
        "Failed to create a new Transaction: ",
        res,
        "Body: ",
        await res.text()
      );
      throw new Error(
        `HTTP Response Code: ${res?.status} \nHTTP Response Status: ${res.statusText}`
      );
    }
  } catch (e) {
    throw e;
  }
};
