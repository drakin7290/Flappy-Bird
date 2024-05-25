import PostContainer from '~/containers/PostContainer';
import MainLayout from '~/layout/MainLayout';
import { useRouter } from 'next/router';
import { useGetPostDetail, getPostDetail } from '~/hooks';
import { demoPostContent } from '~/context/data-demo';

import { API } from '~/core/api/config';

import { QueryClient } from 'react-query';

import PropTypes from 'prop-types';
import { dehydrate } from 'react-query/hydration';
import { useState } from 'react';
import { useEffect } from 'react';

export default function NewsDetail({ postDetail }) {
  const router = useRouter();
  const { slug } = router.query;

  const { data: post } = useGetPostDetail(slug);

  const [detail, setDetail] = useState({});

  useEffect(() => {
    setDetail(post?.data);
  }, [post]);

  return (
    <MainLayout meta_data={postDetail} data={detail} title={detail?.title}>
      {/* <PostContainer post={demoPostContent} /> */}
      <PostContainer post={post?.data} />
    </MainLayout>
  );
}
export async function getServerSideProps(ctx) {
  const {
    params: { slug },
  } = ctx;

  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery('get-postdetail', () => getPostDetail({ pageParam: '' }, slug));

  // const data = queryClient.getQueryData('get-postdetail');
  let url = API.POST.DETAIL;
  // console.log(pageParam, slug);
  url = url.replace(':slug', slug);
  let data;
  await fetch(process.env.SERVER_URI + url)
    .then(function (response) {
      return response.json();
    })
    .then(function (payload) {
      data = payload;
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    props: {
      // dehydratedState: dehydrate(queryClient),
      postDetail: data?.data || {},
    },
  };
}

NewsDetail.propTypes = {
  postDetail: PropTypes.objectOf(PropTypes.any),
};
