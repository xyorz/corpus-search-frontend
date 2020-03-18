import React from 'react'
import { Modal } from 'antd';

function ContextModal(props) {
  const {visible, onOk, context} = props;
  return (
    <Modal
      title="上下文浏览"
      visible={visible}
      onOk={onOk}
      onCancel={onOk}
      cancelText={"关闭"}
      maskClosable={true}
      okButtonProps={{style: {display: "none"}}}
    >
      <div className="contextContent">
        <div className="contextContentTitle">上文</div>
        {context.prev.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
      <div className="contextContent">
        <div className="contextContentTitle">当前</div>
        {context.cur.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
      <div className="contextContent">
        <div className="contextContentTitle">下文</div>
        {context.next.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </Modal>
  )
}

export default ContextModal;