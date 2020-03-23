import React from 'react'
import { Menu } from 'antd'
import {
  FileSearchOutlined,
  FileTextOutlined,
  DownloadOutlined,
  LayoutOutlined
} from '@ant-design/icons';

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
      <Menu.Item key="download">
        <DownloadOutlined />
        下载使用说明文档
      </Menu.Item>
      <Menu.Item key="backend">
        <LayoutOutlined />
        后台管理
      </Menu.Item>
    </Menu>
  )
}

export default TopMenu;