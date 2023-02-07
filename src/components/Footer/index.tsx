import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {

  return (
    <DefaultFooter
      copyright={`2023 Real Estate Dashboard`}
      links={[
        {
          key: 'Real Estate Dashboard',
          title: 'Real Estate Dashboard',
          href: '',
          blankTarget: true,
        },
      ]}
    />
  );
};
