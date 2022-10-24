import { invoiceData as row } from "../interfaces";
import { FaEye } from "react-icons/fa";

export default function Table(props: any) {
  const rows = props.rows.map((row: row) => {
    return (
      <tr className="row" key={row.Invoice_Number}>
        <th className="rowElement TableColum">{row.Invoice_Number}</th>
        <th className="rowElement">{row.Client}</th>
        <th className="rowElement">{row.Date}</th>
        <th className="rowElement">${row.SubTotal}</th>
        <th className="rowElement">{row.Discout}%</th>
        <th className="rowElement">${row.Total}</th>
        <th className="rowElement"><FaEye/></th>
      </tr>
    );
  });

  return (
    <>
      <table className="invocesTable">
        <thead className="head">
          <tr className="headRow">
            <th className="tableHeader TableColum">#</th>
            <th className="tableHeader ">Client</th>
            <th className="tableHeader ">Date</th>
            <th className="tableHeader ">Subtotal</th>
            <th className="tableHeader ">Discout</th>
            <th className="tableHeader ">Total</th>
            <th className="tableHeader "></th>
          </tr>
        </thead>
        <tbody className="tboduy">{rows}</tbody>
      </table>
    </>
  );
}
