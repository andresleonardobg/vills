import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("vills");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export const storeTransaction = async (newTransaction: object) => {
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
