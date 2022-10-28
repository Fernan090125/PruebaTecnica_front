export interface InvoiceTable {
  InvoiceNumber: number;
  Client: string;
  Date: string;
  SubTotal: number;
  Discount: number;
  Total: number;
}

export interface DetailsTable {
  DetailsID: number;
  ProductID: number;
  Name: string;
  Description: string;
  Quantity: number;
}

export interface product {
  Product_ID: number;
  Product_Name: string;
  Product_Description: string;
  Product_Price: number;
}

export interface client {
  Client_ID: number;
  Client_Name: string;
  Point_Of_Contact: string;
  Phone_Number: string;
  Email: string;
}

export interface addedProduct {
  Name: string;
  Quantity: number;
  Id: number;
}

export interface invoiceToPost {
  IDClient: number;
  Dte: string;
  SubTotal: number;
  Discount: number;
  Total: number;
  Products: addedProduct[];
}
