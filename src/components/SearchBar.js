

import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './style.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
   
    onSearch(newSearchTerm);
  };

  return (
    <div className="search-bar">
      <div className="s-bar">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
          style={{ width: '370px', height: '40px',marginRight:'150px' }}
          suffix={<SearchOutlined />}
        />
       
        {/* <Button type="primary" style={{ width: '90px', height: '40px' }}>
          Search
        </Button> */}
      </div>
    </div>
  );
};

export default SearchBar;
