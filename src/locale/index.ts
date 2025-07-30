import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import enUS from './en-US/translation.json';
import zhCN from './zh-CN/translation.json';

const resources = {
	'en-US': {
		translation: enUS,
	},
	'zh-CN': {
		translation: zhCN,
	},
};

i18n.use(HttpApi)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
	resources,
	lng: 'en-US',
	fallbackLng: 'en-US', // 默认语言
	debug: true,
	interpolation: {
		escapeValue: false,
	},
	backend: {
		loadPath: '/locales/{{lng}}/{{ns}}.json', // 语言文件路径
	},
});

export default i18n;
