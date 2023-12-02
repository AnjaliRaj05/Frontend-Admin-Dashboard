import './style.css';
import React from 'react';
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
  const isAllRowsSelected = selectedRows.length === data.length;
  const handleSelectAll = () => {
    if (isAllRowsSelected) {
      onDeselectAll(); 
    } else {
      onSelectAll(!isAllRowsSelected);
    }
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
            <Input value={text} onChange={(e) => onUpdate(row.id, { name: e.target.value })} />
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
          <Input value={text} onChange={(e) => onUpdate(row.id, { email: e.target.value })} />
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
          <Input value={text} onChange={(e) => onUpdate(row.id, { role: e.target.value })} />
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
            <Button type="primary" onClick={() => onSave(row.id)}>Save</Button>
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
