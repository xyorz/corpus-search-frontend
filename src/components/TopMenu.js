import React from 'react'
import { Menu } from 'antd'
import {
  FileSearchOutlined,
  FileTextOutlined,
  DownloadOutlined,
  LayoutOutlined
} from '@ant-design/icons';
import { server } from '../config';

function TopMenu (props) {
  const {page, setPage} = props;
  const handleClick = (e) => {
    setPage(e.key)
  }
  return (
    <Menu onClick={handleClick} selectedKeys={[page]} mode="horizontal">
      <Menu.Item key="search">
        <FileSearchOutlined />
        语料库检索
      </Menu.Item>
      <Menu.Item key="readme">
        <FileTextOutlined />
        使用说明
      </Menu.Item>
      <Menu.Item key="backend">
        <LayoutOutlined />
        <a href="http://127.0.0.1:5000" rel="noopener noreferrer">
          后台管理
        </a>
      </Menu.Item>
      <Menu.Item key="downloadReadme" style={{float: "right", marginRight: "20px"}}>
        <DownloadOutlined />
        <a href={`${server}/corpus/download_readme/`} target="_blank" rel="noopener noreferrer">
          下载使用说明文档
        </a>
      </Menu.Item>
    </Menu>
  )
}

export default TopMenu;