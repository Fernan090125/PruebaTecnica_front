import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { InvoiceTable as row } from "../interfaces";

export default function InvoicesTable(props: { rows: row[] }) {
  const { rows } = props;
  const body = rows.map((row: row) => {
    const route = "/Invoices/" + row.InvoiceNumber;
    return (
      <tr className="row" key={row.InvoiceNumber}>
        <th className="rowElement TableColum">{row.InvoiceNumber}</th>
        <th className="rowElement">{row.Client}</th>
        <th className="rowElement">{row.Date}</th>
        <th className="rowElement">${row.SubTotal}</th>
        <th className="rowElement">{row.Discount}%</th>
        <th className="rowElement">${row.Total}</th>
        <th className="rowElement">
          <Link to={route}>
            <FaEye />
          </Link>
        </th>
      </tr>
    );
  });
  return <tbody className="tbody">{body}</tbody>;
}
