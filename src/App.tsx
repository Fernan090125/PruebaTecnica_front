import { useState } from "react";
import "./App.css";
import Table from "./Components/table";
import { row } from "./interfaces";

function App() {
  const [rows, setrows] = useState<row[]>([]);

  const addRow = () => {
    setrows([
      ...rows,
      {
        Invoice_Number: 2,
        Client: "client",
        Date: "string",
        SubTotal: 2,
        Discout: 2,
        Total: 2,
      },
    ]);
  };

  return (
    <div className="container">
      <div className="subContainer">
        <div className="AddButton">
          <button id="AddButton" onClick={() => addRow()}>
            New Invoice
          </button>
        </div>
        <Table rows={rows} />
      </div>
    </div>
  );
}

export default App;
