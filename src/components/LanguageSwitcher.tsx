import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { setLanguage, type SupportedLanguage } from '@/store/slices/settingsSlice';

const LanguageSwitcher: React.FC = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.settings.language);

  return (
    <Select
      style={{ width: 120 }}
      value={language}
      onChange={(lang) => dispatch(setLanguage(lang as SupportedLanguage))}
      options={[
        { value: 'zh-CN', label: '简体中文' },
        { value: 'en-US', label: 'English' },
      ]}
    />
  );
};

export default LanguageSwitcher;