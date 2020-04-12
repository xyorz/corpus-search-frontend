import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { server } from '../config';

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
  const [text, setText] = useState("");
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
          for (let key of Object.keys(textObj)) {
            if (textObj[key].document) {
              setTitle(textObj[key].document.split(".")[0]);
              break;
            }
          }
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
        <div dangerouslySetInnerHTML={{__html: text}} style={{textIndent: "2em"}}></div>
      </div>
    </div>
  )
}

function parseText(textObject){
  let authors = [];
  let resHTML = '';
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
  for(let i of sortedKeys){
    if(i.split('.').length === 1){
      textObject[i].color = '';
    }
    else{
      let dataIndex = -1;
      if(!authors.some(item => item.color.toUpperCase() === textObject[i].color.toUpperCase())){
        if(textObject[i]['detail']){
          textObject[i]['detail'] = JSON.parse(textObject[i]['detail'])
        }
        authors.push(textObject[i])
      }
      authors.forEach((item, index) => {
        if(item.color.toUpperCase() === textObject[i].color.toUpperCase()){
          dataIndex = index;
        }
      });
      let tagPrefixDetail = `data-index=${dataIndex} style="color: ${textObject[i].color}"`;
      // 章节标题
      if(i.split('.').length === 2){
        resHTML += `<div ${tagPrefixDetail}>${textObject[i].section}</div>`;
      } // 正文部分
      else{
        // 章节第一个span，也是最后一个span
        if(i.split('.')[2] === '1' && (sortedKeys.length === sortedKeys.indexOf(i)+1||sortedKeys[sortedKeys.indexOf(i)+1].split('.').length !== 3||sortedKeys[sortedKeys.indexOf(i)+1].split('.')[1] !== i.split('.')[1])){
          resHTML += `<div><span ${tagPrefixDetail}>${textObject[i].text}</span></div>`;
        }// 只是章节第一个span
        else if(i.split('.')[2] === '1'){
          resHTML += `<div><span ${tagPrefixDetail}>${textObject[i].text}</span>`;
        }// 只是章节最后一个span
        else if(sortedKeys.length === sortedKeys.indexOf(i)+1||sortedKeys[sortedKeys.indexOf(i)+1].split('.').length !== 3||sortedKeys[sortedKeys.indexOf(i)+1].split('.')[1] !== i.split('.')[1]){
          resHTML += `<span ${tagPrefixDetail}>${textObject[i].text}</span></div>`;
        }// 一般span
        else{
          resHTML += `<span ${tagPrefixDetail}>${textObject[i].text}</span>`;
        }
      }
    }
  }
  return resHTML;
}

export default TextDisplay;