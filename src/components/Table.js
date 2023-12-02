// // components/Table.js
// import React from 'react';

// const Table = ({ data, columns, onEdit, onDelete, onSelect }) => {
//   return (
//     <table className="admin-table">
//       <thead>
//         <tr>
//           {columns.map((column) => (
//             <th key={column}>{column}</th>
//           ))}
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row) => (
//           <tr key={row.id}>
//             {columns.map((column) => (
//               <td key={column}>{row[column]}</td>
//             ))}
//             <td>
//               <button className="edit" onClick={() => onEdit(row.id)}>
//                 Edit
//               </button>
//               <button className="delete" onClick={() => onDelete(row.id)}>
//                 Delete
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default Table;
// components/Table.js
import React, { useState } from 'react';

const Table = ({ data, columns, onEdit, onDelete, onSelect }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      // If the row is already selected, remove it
      setSelectedRows((prevSelected) => prevSelected.filter((rowId) => rowId !== id));
    } else {
      // If the row is not selected, add it
      setSelectedRows((prevSelected) => [...prevSelected, id]);
    }

    // Notify the parent component about the selection
    onSelect(selectedRows);
  };

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Select</th>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>
              <input
                type="checkbox"
                checked={selectedRows.includes(row.id)}
                onChange={() => handleCheckboxChange(row.id)}
              />
            </td>
            {columns.map((column) => (
              <td key={column}>{row[column]}</td>
            ))}
            <td>
              <button className="edit" onClick={() => onEdit(row)}>
                Edit
              </button>
              <button className="delete" onClick={() => onDelete(row.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

