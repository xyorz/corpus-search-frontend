import React from 'react'
import {Table, Button} from 'antd'
import {highLight} from '../config'

function SearchTable (props) {
  const {
    className, 
    data, 
    total, 
    currentPage, 
    pageSize, 
    onChangePage, 
    onChangePageSize, 
    onShowContext, 
    onTextDisplay, 
    highLightWords
  } = props;

  const columns = [
    {
      title: 'left',
      dataIndex: 'left',
      key: 'id',
      align: 'right',
      render: (text, record) => (
        <div>
          {highLight(text, highLightWords)}
          <div className="textId">
            <strong>{record.displayId}</strong>
          </div>
        </div>
      )
    },
    {
      title: 'mid',
      dataIndex: 'mid',
      align: 'center',
      render: text => <span style={{color: "red"}}>{text}</span>
    },
    {
      title: 'right',
      dataIndex: 'right',
      key: 'id',
      align: 'left',
      render: (text, record) => (
        <div>
          {highLight(text, highLightWords)}
          <div className="tableButton">
            <Button className="context" size="small" onClick={() => onShowContext(record.id)}>上下文</Button>
            <Button className="context" size="small" onClick={() => onTextDisplay(record.id.split(".")[0])}>原文</Button>
          </div>
        </div>
      )
    },
  ];

  const pagination = {
    pageSize: pageSize,
    total: total,
    onChange: onChangePage,
    current: currentPage,
    size: 'normal',
    showSizeChanger: true,
    showQuickJumper: true,
    onShowSizeChange: onChangePageSize
  }
  return (
    <div className={className}>
      <Table 
        columns={columns} 
        dataSource={data} 
        size="small" 
        pagination={pagination} 
        rowKey="id"
      />
    </div>
  )
}

export default SearchTable;