import React from 'react'
import { Input, Button } from 'antd'

const { Search } = Input;

function SearchInput (props) {
  const {search, showStatistics, onShowStatistics} = props;
  return (
    <div className={props.className}>
      <Search
        placeholder="请输入检索内容"
        enterButton="检索"
        size="large"
        onSearch={value => search(value)}
      />
      <Button 
        size="large" 
        type="primary"
        onClick={onShowStatistics} 
        style={{marginLeft: "1px", display: showStatistics? "block": "none"}}
      >
        统计
      </Button>
    </div>
  )
}

export default SearchInput;