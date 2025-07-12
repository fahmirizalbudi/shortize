import FlexBox from "../FlexBox/index.jsx";
import StandardButton from "../StandardButton/index.jsx";
import {BiEdit, BiTrash} from "react-icons/bi";

const Table = ({ children, className }) => {
  return (
    <table className={`w-full font-outfit ${className}`}>{children}</table>
  )
}

Table.Head = ({ children }) => <thead className="bg-[#F5F5F5]">{children}</thead>

Table.Body = ({ children }) => <tbody>{children}</tbody>

Table.Row = ({ children }) => <tr className="h-16">{children}</tr>

Table.Heading = ({ children, width, isFirst = false, isLast = false }) => <th style={{ width: width }} className={`text-center font-normal text-stone-700 text-[1.07rem] ${isFirst && "rounded-tl-xl rounded-bl-xl"} ${isLast && "rounded-tr-xl rounded-br-xl"}`}>{children}</th>

Table.Cell = ({ children }) => <td className="text-center font-normal text-stone-800 text-[1.07rem] border-b-1 border-b-stone-200">{children}</td>

Table.Action = ( { onUpdate, onDelete } ) => {
  return (
      <FlexBox properties="items-center justify-center gap-3">
        <button onClick={onUpdate} className="cursor-pointer"><BiEdit size={22}/></button>
        <button onClick={onDelete} className="cursor-pointer"><BiTrash size={22}/></button>
      </FlexBox>
  )
}

export default Table