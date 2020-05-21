import React from 'react'
import { Modal, Tooltip } from 'antd';
import { infoTagFilterList, infoTagNameMap, highLight } from '../config';

export const getDetailElem = info => {
  const infoShow = {};
  if (Object.keys(info).includes("detail") && info.detail) {
    const detail = JSON.parse(info.detail);
    for (let key of Object.keys(detail)) {
      infoShow[key] = detail[key];
    }
  }
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

function flatten(array) {
  var flattend = [];
  (function flat(array) {
    array.forEach(function(el) {
      if (Array.isArray(el)) flat(el);
      else flattend.push(el);
    });
  })(array);
  return flattend;
}

export const buildZhujie = (spanList, zhujieInfo=[], text) => {
  const resList = [];
  if (!Array.isArray(spanList)) {
    spanList = [spanList];
  }
  const offsetList = (zhujieInfo && zhujieInfo.offset && zhujieInfo.offset.map(offset => offset + 1)) || [];
  let allSplit = [...new Set(flatten(spanList).concat(offsetList))];
  allSplit = allSplit.sort((a, b) => a-b);
  let curIndex = 0;
  let lastIndex = 0;
  const indexInSpan = index => {
    for (let span of spanList) {
      if (index > span[0] && index <= span[1]) {
        return true;
      }
    }
    return false;
  }
  const getZhujieByIndex = index => {
    const zjIndex = offsetList.indexOf(index);
    if (zjIndex < 0) {
      return null;
    }
    return zhujieInfo.content[zjIndex];
  }
  let keyId = 0;
  for (let i of allSplit) {
    curIndex = i;
    const zhujie = getZhujieByIndex(curIndex);
    if (zhujie) {
      if (indexInSpan(curIndex)) {
        resList.push(<span key={keyId++} style={{color: 'red'}}>{text.slice(lastIndex, curIndex)}</span>);
      } else {
        resList.push(<span key={keyId++}>{text.slice(lastIndex, curIndex)}</span>);
      }
      resList.push(<Tooltip key={keyId++} title={zhujie}><span style={{color: "blue"}}> [*] </span></Tooltip>);
    } else {
      if (indexInSpan(curIndex)) {
        resList.push(<span key={keyId++} style={{color: 'red'}}>{text.slice(lastIndex, curIndex)}</span>);
      } else {
        resList.push(<span key={keyId++}>{text.slice(lastIndex, curIndex)}</span>);
      }
    }
    lastIndex = curIndex;
  }
  resList.push(<span key={keyId++}>{text.slice(curIndex)}</span>)
  return resList;
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
                <span className="contextText">{buildZhujie(highLight(info.text, highLightWords, false), info.zhujie? JSON.parse(info.zhujie) : null, info.text)}</span>
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
                <span className="contextText">{buildZhujie(highLight(info.text, highLightWords, false), info.zhujie? JSON.parse(info.zhujie) : null, info.text)}</span>
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
              <Tooltip key={index} title={getDetailElem(info)} placement="top" autoAdjustOverflow>
                <span className="contextText">{buildZhujie(highLight(info.text, highLightWords, false), info.zhujie? JSON.parse(info.zhujie) : null, info.text)}</span>
              </Tooltip>
            ))}
          </p>
        ))}
      </div>
    </Modal>
  )
}

export default ContextModal;