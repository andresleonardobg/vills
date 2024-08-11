export type Transaction = {
  id: number;
  type: boolean;
  amount: number;
  category: string;
  year: number;
  month: string;
  day: number;
  hour: (number | string)[];
  description: string;
};

export type propsTransaction = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  transactions: Transaction[];
  setData: React.Dispatch<React.SetStateAction<Transaction[]>>;
};
