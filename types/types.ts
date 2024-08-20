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

export type NewDataTransaction = {
  type: boolean;
  amount: number;
  category: string;
  description: string;
}
