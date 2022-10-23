import { row } from "../interfaces";
// import 'bootstrap/dist/css/bootstrap.css';

export default function Table(props: any) {
  const rows = props.rows.map((row: row) => {
    return (
      <tr className="row">
        <td className="rowElement">{row.Invoice_Number}</td>
        <td className="rowElement">{row.Client}</td>
        <td className="rowElement">{row.Date}</td>
        <td className="rowElement">{row.SubTotal}</td>
        <td className="rowElement">{row.Discout}</td>
        <td className="rowElement">{row.Total}</td>
        <td className="rowElement">{row.Client}aaa</td>
      </tr>
    );
  });

  return (
    <table>
      <thead className="head">
        <tr className="headRow">
          <th className="tableHeader">Invoice Number</th>
          <th className="tableHeader">Client</th>
          <th className="tableHeader">Date</th>
          <th className="tableHeader">Subtotal</th>
          <th className="tableHeader">Discout</th>
          <th className="tableHeader">Total</th>
          <th className="tableHeader">Icono Ver</th>
        </tr>
      </thead>
      <tbody className="tboduy">{rows}</tbody>
    </table>
  );
}
