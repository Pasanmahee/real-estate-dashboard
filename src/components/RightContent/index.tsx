import { Space } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="Search Here"
        defaultValue="search"
        options={[
          {
            label: <a href="">1</a>,
            value: '1'
          },
          {
            label: <a href="">2</a>,
            value: '2',
          },
          {
            label: <a href="">3</a>,
            value: '3',
          },
          {
            label: <a href="">4</a>,
            value: '4',
          },
        ]}
      />
      <Avatar />
    </Space>
  );
};
export default GlobalHeaderRight;
