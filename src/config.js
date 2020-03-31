import React from 'react'

export const server = "http://127.0.0.1:8000"
export const infoTagFilterList = [
  "detail",
  "zhujie",
  "id",
  "color",
  "text"
]
export const infoTagNameMap = {
  author: "作者",
  dynasty: "朝代",
  area: "地域",
  type: "文体"
}

export const highLight = (text, highLightWords) => {
  let keywordPosList = [];
  for (let word of highLightWords) {
    if (word.type === "word") {
      let curIndex = 0;
      while ((curIndex = text.indexOf(word.value, curIndex+1)) >= 0) {
        keywordPosList.push([curIndex, curIndex + word.value.length]);
      }
    } else {
      // word.type === "regexp"
      const reg = new RegExp(word.value, 'g');
      let match = reg.exec(text);
      while(match) {
        keywordPosList.push([match.index, match.index + match[0].length]);
        match = reg.exec(text);
      }
    }
  }
  keywordPosList.sort((a, b) => a[0] - b[0]);
  keywordPosList = keywordPosList.reduce((prev, cur) => {
    if (prev.length > 0) {
      if (prev[prev.length-1][1] >= cur[0]) {
        prev[prev.length-1] = [prev[prev.length-1][0], Math.max(prev[prev.length-1][1], cur[1])];
      }
    } else {
      prev.push(cur)
    }
    return prev;
  }, []);
  const render = [];
  let indexCount = 0;
  for (let i = 0; i < keywordPosList.length; i++) {
    const span = keywordPosList[i];
    if (i === 0) {
      render.push(<span key={indexCount++}>{text.slice(0, span[0])}</span>);
      render.push(<span key={indexCount++} style={{color: "red"}}>{text.slice(span[0], span[1])}</span>);
    } else {
      const prevSpan = keywordPosList[i-1];
      render.push(<span key={indexCount++}>{text.slice(prevSpan[1], span[0])}</span>)
      render.push(<span key={indexCount++} style={{color: "red"}}>{text.slice(span[0], span[1])}</span>)
    }
  }
  if (render.length > 0) {
    render.push(<span key={indexCount++}>{text.slice(keywordPosList[keywordPosList.length-1][1])}</span>);
  } else {
    render.push(<span key={indexCount++}>{text}</span>);
  }
  return (
    <>
      {render.map(r => r)}
    </>
  )
}
