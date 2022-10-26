import { useEffect, useState } from "react";
import "../Styles/App.css";
import Table from "./table";
import { invoiceData as row } from "../interfaces";
import axios from "axios";
import { getClients, getInvoices } from "../urls";
import AddInvoice from "./addInvoice/addInvoice";

function App() {
  const [rows, setrows] = useState<row[]>([]);
  const [clientsNames, setclientsNames] = useState<string[]>([]);
  const [show, setshow] = useState<boolean>(false);

  useEffect(() => {
    async function getclient(id: any) {
      return await axios.get(getClients + id);
    }

    async function getrows() {
      const invoices = await axios.get(getInvoices);
      const data: row[] = [];
      for (let i = 0; i < invoices.data.response.length; i++) {
        const invoice = invoices.data.response[i];
        const client = await getclient(invoice.IDClient);
        const fecha = new Date(invoice.Dte).toLocaleDateString();
        data.push({
          Invoice_Number: invoice.Invoice_ID,
          Client: client.data.res[0].Client_Name,
          Date: fecha,
          SubTotal: invoice.Subtotal,
          Discout: invoice.Discount,
          Total: invoice.Total,
        });
      }
      setrows(data);
    }

    getrows();
  }, [show]);

  const addRow = () => {
    setshow(true);
  };

  const close = () => {
    setshow(false);
  };

  return (
    <>
      <div>
        <div className="container">
          <div className={String(show) + " container"}>
            <div className="logo">
              <img src="/logo.jpeg" alt="" />
              <h2>AIM EdgeApps</h2>
            </div>
            <div className="subContainer">
              <div className="AddButton" onClick={() => addRow()}>
                New Invoice
              </div>
              <Table rows={rows} />
            </div>
          </div>
          <AddInvoice close={close} show={show} />
        </div>
      </div>
    </>
  );
}

export default App;
