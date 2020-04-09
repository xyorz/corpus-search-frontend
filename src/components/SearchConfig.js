import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {server} from '../config'
import { InputNumber, Input, Select } from 'antd';

const {Option} = Select;

function SearchConfig(props) {
  const {onConfigChange} = props;
  const [filters, setFilters] = useState({});
  const [filterPresets, setFilterPresets] = useState({});

  useEffect(() => {
    axios.post(`${server}/corpus/get_preset/`).then(res => {
      if (res.data && res.data.list) {
        const list = res.data.list;
        const presetsObj = {};
        for (let item of list) {
          presetsObj[item.type] = item.value.split("|");
        }
        setFilterPresets(presetsObj);
      }
    })
  }, [])

  const onFiltersChange = filterField => filterVal => {
    if (typeof filterVal === 'string') {
      filterVal = filterVal.split(" ").map(val => val.trim()).filter(val => val);
    }
    filters[filterField] = filterVal;
    setFilters(Object.assign({}, filters));
    onConfigChange("filter")(filters);
  }

  return (
    <div className={props.className}>
      <div style={{width: "100%", display: "flex", justifyContent: "space-around"}}>
        <div style={{width: "40%", display: "flex", alignItems: "center"}}>
          <div style={{width: "50%"}}>检索模式:</div>
          <Select 
            style={{width: "47.5%", margin: "auto 10px auto -29px"}} 
            defaultValue="normal" 
            onChange={onConfigChange("type")}
          >
            <Option value="normal">普通查询</Option>
            <Option value="pattern">模式查询</Option>  
          </Select>
        </div>
        <div style={{display: "flex", alignItems: "center", width: "60%"}}>
          <div style={{flexBasis: "40%", marginLeft: "12px"}}>显示字数:</div>
          <InputNumber 
            style={{flexBasis: "40%", margin: "auto 12px 0 -7px"}} 
            defaultValue={30} 
            formatter={value => `左 ${value} 字`}
            onChange={onConfigChange("leftLength")}
          />
          <InputNumber 
            style={{flexBasis: "40%", margin: "auto 8px"}} 
            defaultValue={30} 
            formatter={value => `右 ${value} 字`}
            onChange={onConfigChange("rightLength")}
          />
        </div>
      </div>
      <div style={{width: "100%", display: "flex", justifyContent: "space-between", marginTop: "15px"}}>
        <div style={{width: "100%", display: "flex", alignItems: "center", flexDirection: 'column'}}>
          <div style={{width: "100%", display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
            <div style={{width: "20%"}}>筛选条件:</div>
            <Input 
              style={{width: "40%", margin: "auto 10px auto -30px"}} 
              placeholder="文档名"
              onChange={e => onFiltersChange("document")(e.target.value)}
            />
            <Input 
              style={{width: "40%", margin: "auto 7px auto auto"}} 
              placeholder="章节名"
              onChange={e => onFiltersChange("section")(e.target.value)}
            />
          </div>
          <div style={{width: "100%", display: 'flex', justifyContent: 'left', alignItems: 'center',  marginTop: "15px"}}>
            <div style={{width: "20%"}}></div>
            <Input 
              style={{width: "40%", margin: "auto 10px auto -30px"}} 
              placeholder="作者"
              onChange={e => onFiltersChange("author")(e.target.value)}
            />
            <Select 
              mode="multiple"
              style={{width: "40%", margin: "auto 7px auto auto"}} 
              placeholder="朝代"
              value={filters.dynasty}
              onChange={onFiltersChange("dynasty")}
            >
              {filterPresets.dynasty && filterPresets.dynasty.map((val, index) => (
                <Option value={val} key={index}>{val}</Option>
              ))}
            </Select>
          </div>
          <div style={{width: "100%", display: 'flex', justifyContent: 'left', alignItems: 'center', marginTop: '15px'}}>
            <div style={{width: "20%"}}></div>
            <Select 
              mode="multiple"
              style={{width: "40%", margin: "auto 10px auto -30px"}} 
              placeholder="地域"
              value={filters.area}
              onChange={onFiltersChange("area")}
            >
              {filterPresets.area && filterPresets.area.map((val, index) => (
                <Option value={val} key={index}>{val}</Option>
              ))}
            </Select>
            <Select 
              mode="multiple"
              style={{width: "40%", margin: "auto 7px auto auto"}} 
              placeholder="译体"
              value={filters.type}
              onChange={onFiltersChange("type")}
            >
              {filterPresets.type && filterPresets.type.map((val, index) => (
                <Option value={val} key={index}>{val}</Option>
              ))}  
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchConfig;