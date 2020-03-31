import React from 'react'
import { Modal, Tooltip } from 'antd';
import { infoTagFilterList, infoTagNameMap, highLight } from '../config';

const getDetailElem = info => {
  const infoShow = {};
  for (let key of Object.keys(info)) {
    if (!infoTagFilterList.includes(key)) {
      if (Object.keys(infoTagNameMap).includes(key)) infoShow[infoTagNameMap[key]] = info[key]
      else infoShow[key] = info[key]
    }
  }
  return (
    <div>
      {Object.keys(infoShow).map((key, index) => (
        <div key={index}>{key}: {infoShow[key]}</div>
      ))}
    </div>
  )
}

function ContextModal(props) {
  const {visible, onOk, context, highLightWords} = props;
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
        {context.prev.map((sentences, index) => (
          <p key={index}>
            {sentences.map((info, index) => (
              <Tooltip key={index} title={getDetailElem(info)}  placement="top" autoAdjustOverflow>
                <span className="contextText">{highLight(info.text, highLightWords)}</span>
              </Tooltip>
            ))}
          </p>
        ))}
      </div>
      <div className="contextContent">
        <div className="contextContentTitle">当前</div>
        {context.cur.map((sentences, index) => (
          <p key={index}>
            {sentences.map((info, index) => (
              <Tooltip key={index} title={getDetailElem(info)}  placement="top" autoAdjustOverflow>
                <span className="contextText">{highLight(info.text, highLightWords)}</span>
              </Tooltip>
            ))}
          </p>
        ))}
      </div>
      <div className="contextContent">
        <div className="contextContentTitle">下文</div>
        {context.next.map((sentences, index) => (
          <p key={index}>
            {sentences.map((info, index) => (
              <Tooltip key={index} title={getDetailElem(info)}  placement="top" autoAdjustOverflow>
                <span className="contextText">{highLight(info.text, highLightWords)}</span>
              </Tooltip>
            ))}
          </p>
        ))}
      </div>
    </Modal>
  )
}

export default ContextModal;