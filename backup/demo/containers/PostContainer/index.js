import { useRef } from 'react';
import { useEffect } from 'react';
import Container from '~/components/base/Container';
import HeadComponent from '~/components/base/HeadComponent';
import Space from '~/components/base/Space';
import TitleComponent from '~/components/base/TitleComponent';
// import InlineList from '~/components/common/InlineList';
import PostDetail from '~/components/stories/PostDetail';
// import { demoNewsItem, demoPostContent } from '~/context/data-demo';

import styles from './styles.module.scss';

export default function PostContainer({ post }) {
  const barRef = useRef();
  useEffect(() => {
    function barPostScroll() {
      //   var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      //   var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      //   var scrolled = (winScroll / height) * 100;
      //   barRef.current.style.width = scrolled + '%';

      var docHeight = document.body.offsetHeight;
      var windowPos = window.scrollY;
      var windowHeight = window.innerHeight;
      var windowWidth = window.innerWidth;
      var completion = windowPos / (docHeight - windowHeight);

      if (docHeight <= windowHeight) {
        barRef.current.style.width = windowWidth + 'px';
      } else {
        barRef.current.style.width = completion * windowWidth + 'px';
      }
    }
    window.addEventListener('scroll', barPostScroll);
    window.addEventListener('resize', barPostScroll);

    return () => {
      window.removeEventListener('scroll', barPostScroll);
      window.removeEventListener('resize', barPostScroll);
    };
  }, []);
  return (
    <Container>
      <div ref={barRef} className={styles['progress-bar']} id="postBar"></div>

      <PostDetail data={post} />
      <HeadComponent>
        <TitleComponent title={'Bài viết liên quan'} />
      </HeadComponent>
      {/* <InlineList data={post?.related_post} /> */}
      <Space height="85px" heightMobile="44px" />
    </Container>
  );
}
