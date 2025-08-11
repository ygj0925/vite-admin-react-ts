import React from 'react'
import { ConfigProvider } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/store'
import zh_CN from 'antd/es/locale/zh_CN'
import en_US from 'antd/es/locale/en_US'

const locales = {
  'zh-CN': zh_CN,
  'en-US': en_US,
}

type AntdProviderProps = {
  children: React.ReactNode
}

const AntdProvider: React.FC<AntdProviderProps> = ({ children }) => {
  const { i18n } = useTranslation()
  const language = useSelector((state: RootState) => state.settings.language) as keyof typeof locales
  const locale = locales[language] || zh_CN

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language)
    }
  }, [language, i18n])

  return <ConfigProvider locale={locale}>{children}</ConfigProvider>
}

export default AntdProvider


