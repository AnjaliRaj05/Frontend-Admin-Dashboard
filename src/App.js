import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DeleteOutlined } from '@ant-design/icons';

import CustomTable from './components/CustomTable';
import Pagination from './components/Pagination';

import Navbar from './components/NavBar';


const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
        );
        setData(response.data);
        setTotalPages(Math.ceil(response.data.length / 10));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleEdit = (row) => {
    setEditingRow(row);
  };

  const handleSave = (rowId,editedData) => {
    setData((prevData) =>
    prevData.map((row) =>
      row.id === rowId ? { ...row, ...editedData } : row
    )
  );
  setEditingRow(null);
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
  };

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((row) => row.id !== id));
    setSelectedRows([]);
  };

  const handleSelect = (row) => {
    const isSelected = selectedRows.some((selectedRow) => selectedRow.id === row.id);

    setSelectedRows((prevSelectedRows) => {
      if (isSelected) {
        return prevSelectedRows.filter((selectedRow) => selectedRow.id !== row.id);
      } else {
        return [...prevSelectedRows, row];
      }
    });
  };
  const handleUpdate = (id, updatedData) => {
    
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, ...updatedData } : row))
    );
    setEditingRow(null); 
  };
  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.slice((currentPage - 1) * 10, currentPage * 10));
    }
  };
  const handleDeleteSelected = () => {
    selectedRows.forEach((row) => {
      handleDelete(row.id);
    });
  };
  const handleDeselectAll = () => {
    setSelectedRows([]); 
  };
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const visibleRows = data
    .filter((row) => Object.values(row).some((value) => String(value).includes(searchTerm)))
    .slice(startIndex, endIndex);

  return (
    
    <div className="admin-dashboard">
       <Navbar onSearch={handleSearch}/> 

       <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px',marginRight:'300px' }}>
        <button  style={{fontColor:'red'}} onClick={handleDeleteSelected}>
          <DeleteOutlined style={{  color: 'red',fontWeight:'bold',fontSize:'20px' }} />
        </button>
      </div>
      <CustomTable
        data={visibleRows}
        selectedRows={selectedRows}
        editingRow={editingRow}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancelEdit={handleCancelEdit}
        onUpdate={handleUpdate}  
        onDelete={handleDelete}
        onSelect={handleSelect}
        onSelectAll={handleSelectAll} 
        onDeselectAll={handleDeselectAll}

      />
       <p>Selected Rows: {selectedRows.length}</p>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onSelectAll={handleSelectAll}
        
      />
        
     
    </div>
  );
};

export default App;