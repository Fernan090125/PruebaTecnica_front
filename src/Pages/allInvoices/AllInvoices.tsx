import { useEffect, useState } from "react";
import "../../Styles/App.css";
import Table from "./AllInvoicesView";
import { InvoiceTable as row } from "../../interfaces";
import axios from "axios";
import { getClients, getInvoices } from "../../urls";
import AddInvoice from "../addInvoice/addInvoice";

function App() {
  const [rows, setRows] = useState<row[]>([]);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    async function getClient(id: number) {
      return await axios.get(getClients + id);
    }
    async function getRows() {
      const invoices = await axios.get(getInvoices);
      const data: row[] = [];
      for (let i = 0; i < invoices.data.length; i++) {
        const invoice = invoices.data[i];
        const client = await getClient(invoice.IDClient);
        const date = new Date(invoice.Dte).toLocaleDateString();
        data.push({
          InvoiceNumber: invoice.Invoice_ID,
          Client: client.data[0].Client_Name,
          Date: date,
          SubTotal: invoice.Subtotal,
          Discount: invoice.Discount,
          Total: invoice.Total,
        });
      }
      setRows(data);
    }

    getRows();
  }, [show]);

  const addRow = () => {
    setShow(true);
  };

  const close = () => {
    setShow(false);
  };

  return (
    <>
      <div>
        <div className="Container">
          <div className={String(show) + " container"}>
            <div className="Logo">
              <img src="/logo.jpeg" alt="CompanyLogo" />
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
