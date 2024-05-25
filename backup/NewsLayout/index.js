import Space from '~/components/base/Space';
import NavigateRainbow from '~/components/common/NavigateRainbow';
import MainLayout from '~/layout/MainLayout';

export default function NewsLayout({ children, title }) {
  return (
    <MainLayout currentPage="news-page" title={title}>
      <Space height={'80px'} />
      <NavigateRainbow />
      {children}
    </MainLayout>
  );
}
