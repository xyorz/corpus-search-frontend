import React from 'react'
import {Alert} from 'antd'

function SearchMessage(props) {
  const {className, messageData} = props;
  if (!(messageData && messageData.total)) {
    return <span></span>
  }
  const {total, page, pageSize} = messageData;
  const messageFormat = (
    <div style={{color: "gray"}}>共 <strong>{total}</strong> 条结果，当前显示第 <strong>{(page-1) * pageSize + 1} - {page * pageSize >= total? total: page * pageSize}</strong> 条</div>
  )
  return (
    <Alert message={messageFormat} type="info" className={className} />
  )
}

export default SearchMessage;