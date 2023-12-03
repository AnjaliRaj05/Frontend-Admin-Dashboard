

import React from 'react';
import { Pagination } from 'antd';
import './style.css';
const CustomPagination = ({ currentPage, totalPages, onPageChange, onSelectAll }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination" style={{textAlign:'center', marginTop: '1px'}} >
      
      <Pagination
        current={currentPage}
        total={totalPages * 10}  // Assuming 10 items per page
        onChange={onPageChange}
        showSizeChanger={false}
        showQuickJumper={false}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      />
      {/* <button className="first-page" onClick={() => onPageChange(1)}>First</button>
      <button className="previous-page" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
      <button className="next-page" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      <button className="last-page" onClick={() => onPageChange(totalPages)}>Last</button>
      <button className="select-all" onClick={onSelectAll}>Select All</button> */}
    </div>
  );
};

export default CustomPagination;
