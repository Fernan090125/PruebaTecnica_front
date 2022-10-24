import { useEffect, useState } from "react";
import "./App.css";
import Table from "./Components/table";
import { invoiceData as row } from "./interfaces";
import axios from "axios";
import { getInvoices } from "./urls";
import AddInvoice from "./Components/addInvoice/addInvoice";

function App() {
  const [rows, setrows] = useState<row[]>([]);
  const [show, setshow] = useState<boolean>(false);

  useEffect(() => {
    axios.get(getInvoices).then((response) => {
      const data: row[] = [];
      response.data.response.map((element: any) => {
        const fecha = new Date(element.Dte).toLocaleDateString();
        data.push({
          Invoice_Number: element.Invoice_ID,
          Client: element.IDClient,
          Date: fecha,
          SubTotal: element.Subtotal,
          Discout: element.Discount,
          Total: element.Total,
        });
        return true;
      });
      setrows(data);
      console.log("loaded");
    });
  }, [show]);

  const addRow = () => {
    setshow(true);
  };

  const close = () => {
    setshow(false);
  };

  return (
    <div className="container">
      <AddInvoice close={close} show={show} />
      <div className="subContainer">
        <div className="AddButton">
          <button onClick={() => addRow()}>
            New Invoice
          </button>
        </div>
        <Table rows={rows} />
      </div>

    </div>
  );
}

export default App;
