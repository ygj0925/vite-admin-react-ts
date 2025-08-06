import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd';
import { useTranslation } from 'react-i18next';
import { AliveScope } from 'react-activation';
import '@/locale/index';
import './index.css'
import App from './App.tsx'
import zh_CN from 'antd/es/locale/zh_CN';
import en_US from 'antd/es/locale/en_US';

const locales = {
  'zh-CN': zh_CN,
  'en-US': en_US,
  // 其他语言...
};


export const Root: React.FC = () => {
  const { i18n } = useTranslation();
  const language = i18n.language as keyof typeof locales;
  const locale = locales[language] || zh_CN;

  return (
         <AliveScope>
            <ConfigProvider locale={locale}>
                <App />
            </ConfigProvider>  
         </AliveScope>
  );
};

// 立即使用导出的组件
createRoot(document.getElementById('root') as HTMLElement).render(<Root />);


