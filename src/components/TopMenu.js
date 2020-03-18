import React from 'react'
import { Menu } from 'antd'
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

function TopMenu (props) {
  const {page, setPage} = props;
  const handleClick = (e) => {
    setPage(e.key)
  }
  return (
    <Menu onClick={handleClick} selectedKeys={[page]} mode="horizontal">
      <Menu.Item key="search">
        <MailOutlined />
        语料库检索
      </Menu.Item>
      <Menu.Item key="readme">
        <AppstoreOutlined />
        使用说明
      </Menu.Item>
      <Menu.Item key="download">
        下载使用说明文档
      </Menu.Item>
      <Menu.Item key="backend">
        后台管理
      </Menu.Item>
    </Menu>
  )
}

export default TopMenu;