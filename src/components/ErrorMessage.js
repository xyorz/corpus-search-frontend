import React from 'react'
import {Alert} from 'antd'

function ErrorMessage(props) {
  const {className, messageData} = props;
  if (!messageData) {
    return <span></span>
  }
  return (
    <Alert message={messageData} type="error" className={className} style={{minWidth: "400px"}} />
  )
}

export default ErrorMessage;