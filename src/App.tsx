import { useState } from 'react'
import reactLogo from './assets/react.svg?url'
import viteLogo from '/vite.svg?url'
import './assets/css/base/tailwind.css'
import './App.css'
import { Menu, Layout, Icon } from 'antd';
import 'antd/dist/antd.css';
import { 
  HomeOutlined, 
  UserOutlined, 
  SettingOutlined, 
  FileOutlined, 
  BellOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';

const { Sider, Content, Header } = Layout;

function App() {
  const [count, setCount] = useState(0)
   const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState('home');

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <>
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        style={{
          backgroundColor: '#f0f2f5',
          boxShadow: '5px 0 15px rgba(0, 0, 0, 0.05)',
          borderRight: 'none'
        }}
      >
        <div style={{ 
          height: '64px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          marginBottom: '16px',
          borderRadius: '12px',
          margin: '16px',
          boxShadow: 'inset -3px -3px 7px rgba(255, 255, 255, 0.8), inset 3px 3px 5px rgba(0, 0, 0, 0.05)'
        }}>
          <h2 style={{ margin: 0, color: '#666' }}>
            {collapsed ? 'NM' : 'Neumorphic Menu'}
          </h2>
        </div>
        
        <Menu
          mode="inline"
          selectedKeys={[current]}
          onClick={handleClick}
          style={{ 
            backgroundColor: 'transparent',
            borderRight: 'none',
            paddingTop: '16px'
          }}
          theme="light"
        >
          <Menu.Item 
            key="home" 
            icon={<HomeOutlined />}
            style={{
              margin: '8px 12px',
              borderRadius: '12px',
              color: '#666',
              backgroundColor: current === 'home' 
                ? '#f0f2f5' 
                : 'transparent',
              boxShadow: current === 'home'
                ? 'inset -3px -3px 7px rgba(255, 255, 255, 0.8), inset 3px 3px 5px rgba(0, 0, 0, 0.05)'
                : '5px 5px 10px rgba(0, 0, 0, 0.05), -5px -5px 10px rgba(255, 255, 255, 0.8)'
            }}
          >
            首页
          </Menu.Item>
          
          <Menu.Item 
            key="profile" 
            icon={<UserOutlined />}
            style={{
              margin: '8px 12px',
              borderRadius: '12px',
              color: '#666',
              backgroundColor: current === 'profile' 
                ? '#f0f2f5' 
                : 'transparent',
              boxShadow: current === 'profile'
                ? 'inset -3px -3px 7px rgba(255, 255, 255, 0.8), inset 3px 3px 5px rgba(0, 0, 0, 0.05)'
                : '5px 5px 10px rgba(0, 0, 0, 0.05), -5px -5px 10px rgba(255, 255, 255, 0.8)'
            }}
          >
            个人中心
          </Menu.Item>
          
          <Menu.Item 
            key="documents" 
            icon={<FileOutlined />}
            style={{
              margin: '8px 12px',
              borderRadius: '12px',
              color: '#666',
              backgroundColor: current === 'documents' 
                ? '#f0f2f5' 
                : 'transparent',
              boxShadow: current === 'documents'
                ? 'inset -3px -3px 7px rgba(255, 255, 255, 0.8), inset 3px 3px 5px rgba(0, 0, 0, 0.05)'
                : '5px 5px 10px rgba(0, 0, 0, 0.05), -5px -5px 10px rgba(255, 255, 255, 0.8)'
            }}
          >
            文档管理
          </Menu.Item>
          
          <Menu.Item 
            key="notifications" 
            icon={<BellOutlined />}
            style={{
              margin: '8px 12px',
              borderRadius: '12px',
              color: '#666',
              backgroundColor: current === 'notifications' 
                ? '#f0f2f5' 
                : 'transparent',
              boxShadow: current === 'notifications'
                ? 'inset -3px -3px 7px rgba(255, 255, 255, 0.8), inset 3px 3px 5px rgba(0, 0, 0, 0.05)'
                : '5px 5px 10px rgba(0, 0, 0, 0.05), -5px -5px 10px rgba(255, 255, 255, 0.8)'
            }}
          >
            通知中心
          </Menu.Item>
          
          <Menu.Item 
            key="settings" 
            icon={<SettingOutlined />}
            style={{
              margin: '8px 12px',
              borderRadius: '12px',
              color: '#666',
              backgroundColor: current === 'settings' 
                ? '#f0f2f5' 
                : 'transparent',
              boxShadow: current === 'settings'
                ? 'inset -3px -3px 7px rgba(255, 255, 255, 0.8), inset 3px 3px 5px rgba(0, 0, 0, 0.05)'
                : '5px 5px 10px rgba(0, 0, 0, 0.05), -5px -5px 10px rgba(255, 255, 255, 0.8)'
            }}
          >
            设置
          </Menu.Item>
        </Menu>
      </Sider>
      
      <Layout>
        <Header style={{ 
          background: '#f0f2f5', 
          padding: '0 24px',
          boxShadow: '0 3px 10px rgba(0, 0, 0, 0.05)',
          borderBottom: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div 
            onClick={toggle}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.05), -5px -5px 10px rgba(255, 255, 255, 0.8)',
              color: '#666'
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
          
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.05), -5px -5px 10px rgba(255, 255, 255, 0.8)',
            color: '#666'
          }}>
            <UserOutlined />
          </div>
        </Header>
        
        <Content style={{ 
          margin: '24px 16px', 
          padding: 24, 
          minHeight: 280,
          borderRadius: '16px',
          boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.05), -5px -5px 15px rgba(255, 255, 255, 0.8)',
          backgroundColor: '#f0f2f5'
        }}>
          <h1 style={{ color: '#666', marginBottom: '24px' }}>
            {current === 'home' && '首页内容'}
            {current === 'profile' && '个人中心内容'}
            {current === 'documents' && '文档管理内容'}
            {current === 'notifications' && '通知中心内容'}
            {current === 'settings' && '设置内容'}
          </h1>
          <p style={{ color: '#888' }}>
            这是一个拟态风格(Neumorphism)的Ant Design菜单栏示例。
            点击左侧菜单可以切换不同的内容区域。
          </p>
        </Content>
      </Layout>
    </Layout>
      <div className="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
        <div>
          <div className="text-xl font-medium text-black dark:text-white">ChitChat</div>
          <p className="text-gray-500 dark:text-gray-400">You have a new message!</p>
        </div>
      </div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
