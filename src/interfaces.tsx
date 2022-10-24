export interface invoiceData {
  Invoice_Number: number;
  Client: string;
  Date: string;
  SubTotal: number;
  Discout: number;
  Total: number;
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
  Point_of_Contact: string;
  Phone_Number: string;
  Email: string;
}

export interface addedproduct {
  name: string;
  quantity: number;
  id:number;
}

export interface invoicetopost {
  IDClient: number;
  Dte: string;
  SubTotal: number;
  Discout: number;
  Total: number;
  products: addedproduct[];
}
