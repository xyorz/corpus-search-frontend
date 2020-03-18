import React from 'react'
import {Table, Button} from 'antd'

function SearchTable (props) {
  const {className, data, total, currentPage, onChangePage, onShowContext} = props;

  const columns = [
    {
      title: 'left',
      dataIndex: 'left',
      key: 'id',
      align: 'right',
      render: (text, record) => (
        <div>
          {text}
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
          {text}
          <div className="tableButton">
            <Button className="context" size="small" onClick={() => onShowContext(record.id)}>上下文</Button>
            <Button className="context" size="small">原文</Button>
          </div>
        </div>
      )
    },
  ];

  const pagination = {
    pageSize: 30,
    total: total,
    onChange: onChangePage,
    current: currentPage,
    size: 'normal'
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