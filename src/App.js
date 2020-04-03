import React, {useState} from 'react'
import {ConfigProvider} from 'antd'
import zhCN from 'antd/es/locale/zh_CN';
import axios from 'axios'
import {server} from './config'
import SearchInput from './components/SearchInput'
import TopMenu from './components/TopMenu'
import SearchTable from './components/SearchTable'
import SearchConfig from './components/SearchConfig'
import ContextModal from './components/ContextModal'
import readmeHTML from './components/Readme'
import TextDisplay from './components/TextDisplay'
import StatisticsModal from './components/StatisticsModal'
import './App.css';
import SearchMessage from './components/SearchMessage';

const searchAPI = `${server}/corpus/n_search/`;

function App() {
  const [menu, setMenu] = useState("search");
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [params, setParams] = useState({
    keyword: "",
    leftLength: 30,
    rightLength: 30,
    type: 'normal',
    page: 1,
    pageSize: 30
  });
  const [filters, setFilters] = useState({});
  const [context, setContext] = useState({prev: [], cur: [], next: []});
  const [contextModalVisible, setContextModalVisible] = useState(false);
  const [statistics, setStatistics] = useState([]);
  const [statisticsModalVisible, setStatisticsModalVisible] = useState(false);
  const [textDisplayId, setTextDisplayId] = useState(null);
  const [highLightWords, setHighLightWords] = useState([]);

  const onSetMenu = menu => {
    if (menu === "downloadReadme") return;
    setMenu(menu)
  }

  const searchRequest = (url, params) => {
    axios.get(url, {params}).then(res => {
      const result = res.data;
      if (result.error) {
        console.log(result.message);
        return;
      }
      console.log(result)
      if (!result) {
        return;
      }
      result.doc_list.forEach((doc, index) => {
        doc.displayId = (params.page - 1) * params.pageSize + index + 1;
      });
      const highLightWordList = [];
      if (result.keywords) {
        for (let keyword of result.keywords) {
          highLightWordList.push({type: "word", value: keyword})
        }
      }
      if (result.regexps) {
        for (let regexp of result.regexps) {
          highLightWordList.push({type: "regexp", value: regexp})
        }
      }
      setHighLightWords(highLightWordList);
      setData(result.doc_list);
      setTotal(result.total);
    })
  }

  const onSearch = value => {
    params.keyword = value;
    if (filters) {
      for (let key of Object.keys(filters)) {
        params.keyword += ` ${key}:${filters[key]}`;
      }
    }
    searchRequest(searchAPI, params);
    setCurrentPage(1);
    setParams(params);
  }

  const onClickDownload = () => {
    const url = `${server}/corpus/download_result?leftLength=${params.leftLength}&rightLength=${params.rightLength}&type=${params.type}&keyword=${params.keyword}`
    window.open(url);
  }

  const onChangePage = page => {
    params.page = page;
    searchRequest(searchAPI, params);
    setCurrentPage(page);
    setParams(params);
  }

  const onChangePageSize = (current, size) => {
    params.pageSize = size;
    setParams(params);
    searchRequest(searchAPI, params);
  }

  const onConfigChange = field => config => {
    if (field === "filter") {
      setFilters(config);
    } else {
      params[field] = config;
      setParams(params);
    }
  }

  const onShowContext = textId => {
    axios.post(`${server}/corpus/get_context/`, {id: textId}).then(res => {
      setContext(res.data);
      setContextModalVisible(true);
    })
  }

  const onHideContext = () => {
    setContextModalVisible(false);
  }

  const onShowStatistics = () => {
    axios.post(`${server}/corpus/get_res_statistics/`, {type: params.type, keyword: params.keyword}).then(res => {
      setStatistics(res.data.dict)
      setStatisticsModalVisible(true);
    })
  }

  const onHideStatistics = () => {
    setStatisticsModalVisible(false);
  }

  const onTextDisplay = textId => {
    setMenu("textDisplay");
    setTextDisplayId(textId);
    console.log(textId)
  }

  return (
    <ConfigProvider locale={zhCN}>
      <div className="App">
        <ContextModal visible={contextModalVisible} onOk={onHideContext} context={context} highLightWords={highLightWords} />
        <StatisticsModal visible={statisticsModalVisible} onOk={onHideStatistics} data={statistics} />
        <div className="topMenu">
          <TopMenu page={menu} setPage={onSetMenu} />
        </div>
        <div className="searchContainer" style={{display: menu === "search"? "flex": "none"}}>
          <h1 className="searchTitle">古汉语语料库</h1>
          <SearchInput 
            search={onSearch} 
            onClickDownload={onClickDownload}
            className="searchBox"
            showStatistics={total > 0} 
            onShowStatistics={onShowStatistics}
          />
          <SearchConfig
            onConfigChange={onConfigChange} 
            className="searchConfig" 
          />
          <SearchMessage 
            messageData={Object.assign({}, params, {total: total})}
            className="searchMessage" 
          />
          <SearchTable 
            data={data} 
            total={total}
            pageSize={params.pageSize}
            currentPage={currentPage} 
            onChangePage={onChangePage}
            onChangePageSize={onChangePageSize}
            onShowContext={onShowContext}
            onTextDisplay={onTextDisplay}
            highLightWords={highLightWords}
            className="searchTable"
          />
        </div>
        <div 
          className="readme" 
          style={{display: menu === "readme"? "flex": "none"}}
          dangerouslySetInnerHTML={{__html: readmeHTML}}
        >
        </div>
        <div
          style={{display: menu === "textDisplay"? "flex": "none"}}
        >
          <TextDisplay id={textDisplayId} className="textDisplay" />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;
