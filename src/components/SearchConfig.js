import React, {useState} from 'react'
import axios from 'axios'
import { InputNumber, Input, Select } from 'antd';

const {Option} = Select;

function SearchConfig(props) {
  const {onConfigChange} = props;
  const [filters, setFilters] = useState({});

  const onFiltersChange = filterField => filterVal => {
    filters[filterField] = filterVal;
    setFilters(filters);
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
        <div style={{width: "100%", display: "flex", alignItems: "center"}}>
          <div style={{width: "20%"}}>筛选条件:</div>
          <Input 
            style={{width: "20%", margin: "auto 10px auto -18px"}} 
            placeholder="作者"
            value={filters.author}
            onChange={(e) => onFiltersChange("author")(e.target.value)}
          />
          <Select 
            style={{width: "20%", margin: "auto 10px"}} 
            placeholder="朝代"
            value={filters.dynasty}
            onChange={onFiltersChange("dynasty")}
          >
            <Option value="唐">唐</Option>
            <Option value="宋">宋</Option>  
          </Select>
          <Select 
            style={{width: "20%", margin: "auto 10px"}} 
            placeholder="地域"
            value={filters.area}
            onChange={onFiltersChange("area")}
          >
            <Option value="南方">南方</Option>
            <Option value="北方">北方</Option>  
            <Option value="未知">未知</Option>
          </Select>
          <Select 
            style={{width: "20%", margin: "auto 7px auto 10px"}} 
            placeholder="译体"
            value={filters.type}
            onChange={onFiltersChange("type")}
          >
            <Option value="原文">原文</Option>
            <Option value="注解">注解</Option>
            <Option value="义疏">义疏</Option>  
          </Select>
        </div>
      </div>
    </div>
  )
}

export default SearchConfig;