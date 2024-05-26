import Head from 'next/head';

import { NAME_WEB } from '~/core/constant';

export default function MainLayout({ children = null, title = '', currentPage = '', meta_data = null }) {
  const titlePage = title ? `${NAME_WEB} - ${title}` : NAME_WEB;
  const description = '';
  const thumbnail = '';

  return (
    <>
      {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-BDHNFW2Q5M" />
      <script
        dangerouslySetInnerHTML={{
          __html:
            "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}gtag('js', new Date()); gtag('config', 'G-BDHNFW2Q5M');",
        }}
      ></script> */}
      <Head>
        <title>{titlePage}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter:description" content={description} />
        <meta property="og:title" content={titlePage} />
        <meta name="title" content={titlePage} />
        <meta name="twitter:title" content={titlePage} />

        <meta itemProp="image" content={thumbnail} />
        <meta property="og:image" content={thumbnail} />
        <meta name="twitter:image" content={thumbnail} />

        <meta name="og:image:alt" content={titlePage} />
        <meta property="og:url" content={typeof window != 'undefined' ? window.location.href : ''} />
        <meta
          property="og:tag"
          content={`${meta_data?.tag?.map((item: string) => {
            return item;
          })}`}
        />

        <meta name="og:type" content={!!meta_data ? 'article' : 'website'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content={NAME_WEB} />
        <meta name="apple-mobile-web-app-title" content={NAME_WEB} />
        <meta name="msapplication-starturl" content="/" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        <meta name="theme-color" content="#2b1718" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>

      {/* <div className="min-h-screen flex flex-col relative">
        <main className="flex-1">{children}</main>
      </div> */}
      <></>
    </>
  );
}
