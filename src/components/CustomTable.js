import './style.css';
import React, { useState } from 'react';
import { Table, Checkbox, Input, Button } from 'antd';
const CustomTable = ({
  data,
  selectedRows,
  editingRow,
  onSave,
  onEdit,
  onUpdate,
  onCancelEdit,
  onDelete,
  onSelect,
  onSelectAll,
  onDeselectAll,

}) => {
  const [localChanges, setLocalChanges] = useState({});
  const isAllRowsSelected = selectedRows.length === data.length;
  const handleSelectAll = () => {
    if (isAllRowsSelected) {
      onDeselectAll(); 
    } else {
      onSelectAll(!isAllRowsSelected);
    }
  };
  const onUpdateLocalChanges = (id, updatedData) => {
    setLocalChanges((prevChanges) => ({
      ...prevChanges,
      [id]: {
        ...prevChanges[id],
        ...updatedData,
      },
    }));
  };
  const handleSave = (id) => {
    onSave(id, localChanges[id]);
    setLocalChanges((prevChanges) => {
      const { [id]: _, ...rest } = prevChanges;
      return rest;
    });
  };
  const columns = [
    {
      title: (
        <Checkbox onChange={handleSelectAll} checked={isAllRowsSelected} />
      ),
      dataIndex: 'id',
      key: 'id',
      render: (_, row) => (
        
        
          <Checkbox
          onChange={() => onSelect(row)}
          checked={selectedRows.some((selectedRow) => selectedRow.id === row.id) }
        />
       
      ),
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, row) => (
        <>
          {editingRow?.id === row.id ? (
            <Input value={text} onChange={(e) => onUpdate(row.id, { id: e.target.value })} />
          ) : (
            text
          )}
        </>
      ),
    },
    
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, row) => (
        <>
          {editingRow?.id === row.id ? (
            <Input value={localChanges[row.id]?.name ?? text}
            onChange={(e) => onUpdateLocalChanges(row.id, { name: e.target.value })} />
          ) : (
            text
          )}
        </>
      ),
    },
    
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text, row) => (
        editingRow?.id === row.id ? (
          <Input value={localChanges[row.id]?.email ?? text} onChange={(e) => onUpdateLocalChanges(row.id, { email: e.target.value })} />
        ) : (
          text
        )
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (text, row) => (
        editingRow?.id === row.id ? (
          <Input value={localChanges[row.id]?.role ?? text} onChange={(e) => onUpdateLocalChanges(row.id, { role: e.target.value })} />
        ) : (
          text
        )
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, row) => (
        editingRow?.id === row.id ? (
          <>
            <Button type="primary" onClick={() => handleSave(row.id)}>Save</Button>
            <Button onClick={onCancelEdit}>Cancel</Button>
          </>
        ) : (
          <>
            <Button onClick={() => onEdit(row)}>Edit</Button>
            <Button onClick={() => onDelete(row.id)}>Delete</Button>
          </>
        )
      ),
    },
  ];

  return (
    <>
    {/* <Button type="danger" onClick={onDeselectAll}>
        Deselect All
      </Button> */}
    <Table
      dataSource={data}
      columns={columns}
      rowKey="id"
      pagination={false}
      className="custom-table"
      rowClassName={(row) => selectedRows.some((selectedRow) => selectedRow.id === row.id) ? 'selected-row' : ''}
    />
    </>
  );
};

export default CustomTable;
