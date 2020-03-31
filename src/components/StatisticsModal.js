import React from 'react'
import {Table, Modal} from 'antd'

const columns = [
  {
    title: "word1",
    dataIndex: "word1",
    align: "center",
    width: "40%"
  },
  {
    title: "count1",
    dataIndex: "count1",
    align: "center",
    width: "10%",
    render: count => <span style={{color: "red"}}>{count}</span>
  },
  {
    title: "word2",
    dataIndex: "word2",
    align: "center",
    width: "40%"
  },
  {
    title: "count2",
    dataIndex: "count2",
    align: "center",
    width: "10%",
    render: count => <span style={{color: "red"}}>{count}</span>
  }
]

const dataToTableRows = data => {
  let indexCount = 0;
  const resList = [];
  const sortList = [];
  for (let key of Object.keys(data)) {
    sortList.push({key: key, value: data[key]});
  }
  sortList.sort((a, b) => {
    return b.value - a.value;
  });
  let rowData = {};
  for (let item of sortList) {
    if (indexCount % 2 === 0) {
      rowData["id"] = indexCount;
      rowData["word1"] = item["key"];
      rowData["count1"] = item["value"]
    } else {
      rowData["word2"] = item["key"];
      rowData["count2"] = item["value"];
      resList.push(rowData);
      rowData = {};
    }
    indexCount ++;
  }
  if (Object.keys(rowData).length > 0) {
    rowData["word2"] = "";
    rowData["count2"] = "";
    resList.push(rowData);
  }

  return resList;
}

function StatisticsModal(props) {
  const {visible, onOk, className} = props;
  let {data} = props;
  data = dataToTableRows(data);
  return (
    <Modal 
      className={className}
      title="结果统计"
      visible={visible}
      onOk={onOk}
      onCancel={onOk}
    >
      <Table
        columns={columns}
        dataSource={data}
        size="small"
        rowKey="id"
      />
    </Modal>
  )
}

export default StatisticsModal;