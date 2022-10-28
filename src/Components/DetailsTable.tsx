import { DetailsTable as DetailRow } from "../interfaces";

export default function DetailsTable(props: { rows: DetailRow[] }) {
  const { rows } = props;
  const body = rows.map((item: DetailRow) => {
    return (
      <tr className="row" key={item.DetailsID}>
        <th className="rowElement TableColum">{item.ProductID}</th>
        <th className="rowElement">{item.Name}</th>
        <th className="rowElement">{item.Description}</th>
        <th className="rowElement">{item.Quantity}</th>
      </tr>
    );
  });
  return <tbody className="tbody">{body}</tbody>;
}
