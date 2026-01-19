export interface Receipt {
  receiptId: string;
  name: string;
  price: number;
  issuedAt: string; // ISO string
}

export interface CreateReceiptInput {
  receiptId: string;
  name: string;
  price: number;
  issuedAt: string;
}

export interface UpdateReceiptInput {
  name?: string | null;
  price?: number | null;
  issuedAt?: string | null;
}
