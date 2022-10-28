const Host = process.env.REACT_APP_API_HOST;

export const getInvoices = Host + "/Invoices/";
export const getProducts = Host + "/Products/";
export const getProduct  = Host + "/Products/";
export const getClients  = Host + "/Clients/";
export const getMidPrice = Host + "/Invoices/subtotal";
export const postInvoice = Host + "/Invoices";
