import React from 'react'
import { Input } from 'antd'

const { Search } = Input;

function SearchInput (props) {
  const {search} = props;
  return (
    <div className={props.className}>
      <Search
        placeholder="请输入检索内容"
        enterButton="检索"
        size="large"
        onSearch={value => search(value)}
      />
    </div>
  )
}

export default SearchInput;