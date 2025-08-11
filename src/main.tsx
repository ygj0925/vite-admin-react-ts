import { createRoot } from 'react-dom/client'
import AntdProvider from '@/providers/AntdProvider'
import { AliveScope } from 'react-activation';
import { Provider } from "react-redux"
import store from "@/store/store.ts"
import '@/locale/index';
import './index.css'
import App from './App.tsx'


export const Root: React.FC = () => {
  return (
    <AliveScope>
      <Provider store={store}>
        <AntdProvider>
          <App />
        </AntdProvider>
      </Provider>
    </AliveScope>
  )
}

// 立即使用导出的组件
createRoot(document.getElementById('root') as HTMLElement).render(<Root />);


