import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { server } from '../config';
import { Tooltip } from 'antd';
import {getDetailElem} from './ContextModal'

const textContainerStyle = {
  width: "50%",
  minWidth: "400px",
  marginTop: "40px",
  border: "1px solid gray",
  borderRadius: "2px",
  padding: "20px"
}

function TextDisplay(props) {
  const {id, section, className} = props;
  const [text, setText] = useState(null);
  const [title, setTitle] = useState("");
  useEffect(() => {
    if (id) {
      let url = null;
      let params = null;
      if (section) {
        url = `${server}/corpus/get_section/`;
        params = {id: id, section: section};
      } else {
        url = `${server}/corpus/doc/`;
        params = {id: id};
      }
      axios.post(url, params).then(res => {
        if(res.data && res.data.doc) {
          const textObj = res.data.doc;
          // for (let key of Object.keys(textObj)) {
          //   if (textObj[key].document) {
          //     setTitle(textObj[key].document.split(".")[0]);
          //     break;
          //   }
          // }
          textObj[id + ''] && textObj[id + ''].document && setTitle(textObj[id + ''].document.split(".")[0])
          const parseResult = parseText(textObj);
          setText(parseResult);
        }
      })
    }
  }, [id, section])
  if (!text) {
    return (
      <div className={className}>
        <strong className="textDisplayTitle" style={{marginTop: "200px"}}>加载中...</strong>
      </div>
    )
  }
  return (
    <div className={className}>
      <strong className="textDisplayTitle">{title}</strong>
      <div style={textContainerStyle}>
        <div style={{textIndent: "2em"}}>{text}</div>
      </div>
    </div>
  )
}

function parseText(textObject){
  let resRender = [];
  // 排序
  let sortedKeys = Object.keys(textObject).sort((a, b) => {
    const [a1, a2, a3] = [...a.split('.').map((e) => parseInt(e)), 0, 0];
    const [b1, b2, b3] = [...b.split('.').map((e) => parseInt(e)), 0, 0];
    if(a1 === b1){
      if(a2 === b2){
        return a3 - b3;
      }
      return a2 - b2;
    }
    return a1 - b1;
  });
  let curParaRender = [];
  let count = 0;
  for(let i of sortedKeys){
    if(i.split('.').length === 1) continue;
    const spanRender = (
      <Tooltip key={count++} title={getDetailElem(textObject[i])} placement="top" autoAdjustOverflow>
        <span className="contextText" style={{color: textObject[i].color}}>{textObject[i].text}</span>
      </Tooltip>
    );
    curParaRender.push(spanRender);
    if(sortedKeys.length === sortedKeys.indexOf(i)+1||sortedKeys[sortedKeys.indexOf(i)+1].split('.').length !== 3||sortedKeys[sortedKeys.indexOf(i)+1].split('.')[1] !== i.split('.')[1]){
      resRender.push(curParaRender);
      curParaRender = [];
    }
  }
  count = 0;
  return (
    <>
      {resRender.map(paraRender => (
        <div key={count++}>{paraRender}</div>
      ))}
    </>
  )
}

export default TextDisplay;