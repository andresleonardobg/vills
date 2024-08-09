import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("vills");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export const storeTransaction = async (newTransaction) => {
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
