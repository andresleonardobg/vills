import AsyncStorage from "@react-native-async-storage/async-storage";
import { Transaction } from "../types/types";

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("vills");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export const storeTransactions = async (Transactions: Transaction[]) => {
  try {
    const jsonValue = await AsyncStorage.getItem("vills");
    let transactions =
      jsonValue != null ? JSON.parse(jsonValue) : { transactions: [] };
    transactions.transactions = Transactions;
    await AsyncStorage.setItem("vills", JSON.stringify(transactions));
  } catch (error) {
    console.log(error);
  }
};

export const storeTransaction = async (newTransaction: Transaction) => {
  try {
    const jsonValue = await AsyncStorage.getItem("vills");
    let transactions =
      jsonValue != null ? JSON.parse(jsonValue) : { transactions: [] };

    transactions.transactions.push(newTransaction);
    await AsyncStorage.setItem("vills", JSON.stringify(transactions));
  } catch (e) {
    console.log(e);
  }
};

export const removeData = async () => {
  try {
    await AsyncStorage.removeItem("vills");
    await AsyncStorage.removeItem("currentId");
  } catch (e) {
    console.log(e);
  }
  console.log("Done.");
};

export async function generateId(): Promise<number> {
  let strCurrentId: string | null = await AsyncStorage.getItem("currentId");
  let currentId: number = strCurrentId ? parseInt(strCurrentId, 10) : 0;
  currentId++;
  await AsyncStorage.setItem("currentId", currentId.toString());
  return currentId;
}
