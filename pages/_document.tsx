import Document, { Html, Head, Main, NextScript } from 'next/document';

Document.getInitialProps = async (ctx) => {
  const initialProps = await Document.getInitialProps(ctx);
  return { ...initialProps, locale: ctx?.locale || 'en' };
};

export default function MyDocument({ locale }) {
  return (
    <Html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Head>
        <link href="/fonts/fonts.css" rel="stylesheet" type="text/css" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
