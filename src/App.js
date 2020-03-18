import React, {useState} from 'react'
import axios from 'axios'
import {server} from './config'
import SearchInput from './components/SearchInput'
import TopMenu from './components/TopMenu'
import SearchTable from './components/SearchTable'
import SearchConfig from './components/SearchConfig'
import ContextModal from './components/ContextModal'
import './App.css';

const searchAPI = `${server}/corpus/n_search/`;

const pageSize = 30;

function App() {
  const [page, setPage] = useState("search");
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [params, setParams] = useState({
    keyword: "",
    leftLength: 30,
    rightLength: 30,
    type: 'normal',
    page: 1,
    pageSize: pageSize
  });
  const [filters, setFilters] = useState({});
  const [context, setContext] = useState({prev: [], cur: [], next: []});
  const [contextModalVisible, setContextModalVisible] = useState(false)

  const searchRequest = (url, params) => {
    axios.get(url, {params}).then(res => {
      const result = res.data;
      if (result.error) {
        console.log(result.message);
        return;
      }
      result.doc_list.forEach((doc, index) => {
        doc.displayId = (params.page - 1) * pageSize + index + 1;
      });
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

  const onChangePage = page => {
    params.page = page;
    searchRequest(searchAPI, params);
    setCurrentPage(page);
    setParams(params);
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

  return (
    <div className="App">
      <ContextModal visible={contextModalVisible} onOk={onHideContext} context={context} />
      <div className="topMenu">
        <TopMenu page={page} setPage={setPage} />
      </div>
      <div className="searchContainer" style={{display: page === "search"? "flex": "none"}}>
        <h1 className="searchTitle">古汉语语料库</h1>
        <SearchInput search={onSearch} className="searchBox"/>
        <SearchConfig
          onConfigChange={onConfigChange} 
          className="searchConfig" 
        />
        <SearchTable 
          data={data} 
          total={total} 
          currentPage={currentPage} 
          onChangePage={onChangePage}
          onShowContext={onShowContext} 
          className="searchTable"
        />
      </div>
      <div className="readme" style={{display: page === "readme"? "flex": "none"}}>readme page</div>
    </div>
  );
}

export default App;
