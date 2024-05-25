import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { API } from '~/core/api/config';
import api, { encodeQueryData, setDefaultHeaders } from '~/core/api/api';
import nookies from 'nookies';
import { getCookie } from 'cookies-next';
import { CURRENT_LANG_KEY } from '~/context/defaultConst';

async function getPostHeadlines(filters) {
  filters = encodeQueryData(filters);
  const { data } = await api.get(API.POST.HEADLINES + '?' + filters);
  return data;
}

export const useGetPostHeadlines = (filters) => {
  return useQuery(['get-post-headlines', filters], () => getPostHeadlines(filters));
};

export const useGetPostHeadlinesInfinity = (filters) => {
  return useInfiniteQuery(
    ['get-post-headlines-infinity', filters],
    (queryKey, pageParam) => {
      filters.page = queryKey.pageParam;
      return getPostHeadlines(filters);
    },
    {
      getNextPageParam: (_lastPage, pages) => {
        let data = _lastPage.data;
        if (data.next_page == true) return pages.length + 1;
        else return undefined;
      },
    }
  );
};

// DETAIL
async function getPostDetail({ pageParam = '' }, slug) {
  let url = API.POST.DETAIL;
  // console.log(pageParam, slug);
  if (!!pageParam) url = url.replace(':slug', pageParam);
  else url = url.replace(':slug', slug);
  // url += '?lang=' + getCookie(CURRENT_LANG_KEY) || 'en';
  const { data } = await api.get(url);
  return data;
}

export const useGetPostDetail = (slug) => {
  return useQuery(['get-post-detail', slug], () => getPostDetail({ pageParam: '' }, slug));
};

export const useGetPostDetailInfinity = (slug) => {
  return useInfiniteQuery(['get-post-detail-infinity', slug], (queryKey, pageParam) => getPostDetail(queryKey, slug), {
    getNextPageParam: (_lastPage, pages) => {
      return _lastPage.data.next_slug ? _lastPage.data.next_slug : undefined;
    },
  });
};

// CATEGORIES
async function getCategories(filters) {
  filters = encodeQueryData(filters);
  const { data } = await api.get(API.CATEGORY.FILTER + '?' + filters);
  return data;
}

export const useGetCategories = (filters) => {
  return useQuery(['get-categories'], () => getCategories(filters));
};

// COMMENT (NOT AUTH)
async function getCommentPublic({ pageParam = 1 }, options) {
  options = encodeQueryData(options);
  const { data } = await api.get(API.POST.COMMENT.GET.PUBLIC + '?' + options + '&page=' + pageParam);
  return data;
}

export const useGetCommentPublic = (options) => {
  return useQuery(['get-comment-public', options], () => getCommentPublic(options));
};

async function reportComment(comment_id) {
  const { data } = await api.get(API.POST.COMMENT.REPORT + '?comment_id=' + comment_id);
  return data;
}

export const useReportComment = (comment_id) => {
  return useMutation(reportComment);
};

// COMMENT (AUTH)
async function getCommentAuth({ pageParam = 1 }, options) {
  const user_token = getCookie('auth_user_token');
  options = encodeQueryData(options);
  const { data } = await api.get(API.POST.COMMENT.GET.AUTH + '?' + options + '&page=' + pageParam, {
    headers: { Authorization: 'Bearer ' + user_token },
  });
  return data;
}

export const useGetCommentAuth = (options) => {
  return useQuery(['get-comment-auth', options], () => getCommentAuth(options));
};

export const useGetComment = (options) => {
  const user_token = getCookie('auth_user_token');
  return useQuery(['get-comment', options], () =>
    user_token ? getCommentAuth({ pageParam: 1 }, options) : getCommentPublic({ pageParam: 1 }, options)
  );
};

export const useGetCommentInfinity = (options) => {
  const user_token = getCookie('auth_user_token');
  return useInfiniteQuery(
    ['get-comment-infinity', options],
    (queryKey, pageParam) => (user_token ? getCommentAuth(queryKey, options) : getCommentPublic(queryKey, options)),
    {
      getNextPageParam: (_lastPage, pages) => {
        let data = _lastPage.data;
        if (data.next_page == true) return pages.length + 1;
        else return undefined;
      },
    }
  );
};

// POST COMMENT
async function postComment(body) {
  const user_token = getCookie('auth_user_token');
  const { data } = await api.post(API.POST.COMMENT.POST.AUTH, body, {
    headers: { Authorization: 'Bearer ' + user_token },
  });
  return data;
}

async function postCommentPublic(body) {
  const { data } = await api.post(API.POST.COMMENT.POST.PUBLIC, body);
  return data;
}

export const usePostComment = () => {
  const user_token = getCookie('auth_user_token');
  return useMutation(user_token ? postComment : postCommentPublic);
};

// EDIT COMMENT
async function updateComment(body) {
  const user_token = getCookie('auth_user_token');
  const { data } = await api.put(API.POST.COMMENT.UPDATE, body, { headers: { Authorization: 'Bearer ' + user_token } });
  return data;
}

export const useUpdateComment = (data) => {
  return useMutation(updateComment);
};

// DELETE COMMENT
async function deleteComment(comment_id) {
  const user_token = getCookie('auth_user_token');
  const { data } = await api.delete(API.POST.COMMENT.DELETE + '?comment_id=' + comment_id, {
    headers: { Authorization: 'Bearer ' + user_token },
  });
  return data;
}

export const useDeleteComment = () => {
  return useMutation(deleteComment);
};

// LIKE (AUTH)
async function getLike(options) {
  const user_token = getCookie('auth_user_token');
  options = encodeQueryData(options);
  const { data } = await api.get(API.POST.LIKE.GET + '?' + options, {
    headers: { Authorization: 'Bearer ' + user_token },
  });
  return data;
}

export const useGetLike = (options) => {
  return useQuery(['get-like', options], () => getLike(options));
};

// POST COMMENT
async function postLike(body) {
  const user_token = getCookie('auth_user_token');
  const { data } = await api.post(API.POST.LIKE.POST, body, { headers: { Authorization: 'Bearer ' + user_token } });
  return data;
}

export const usePostLike = (data) => {
  return useMutation(postLike);
};

// LIKE (AUTH)
async function getCoinStats() {
  // options = encodeQueryData(options);
  const { data } = await api.get(API.NFT.STATS);
  return data;
}

export const useGetCoinStats = () => {
  return useQuery(['coin-stats'], () => getCoinStats());
};

// HEADLINES
async function getBuzzPost(filters) {
  filters = encodeQueryData(filters);
  const { data } = await api.get(API.POST.BUZZ.GET + '?' + filters);
  return data;
}

export const useGetBuzzPost = (filters) => {
  return useQuery(['get-buzz-post', filters], () => getBuzzPost(filters));
};

// DETAIL
async function getBuzzPostDetail({ pageParam = '' }, slug) {
  let url = API.POST.BUZZ.DETAIL;
  // console.log(pageParam, slug);
  if (pageParam) url = url.replace(':slug', pageParam);
  else url = url.replace(':slug', slug);
  const { data } = await api.get(url);
  return data;
}

export const useGetBuzzPostDetail = (slug) => {
  return useInfiniteQuery(
    ['get-buzz-post-detail-infinity', slug],
    (queryKey, pageParam) => getBuzzPostDetail(queryKey, slug),
    {
      getNextPageParam: (_lastPage, pages) => {
        return _lastPage.data.next_slug ? _lastPage.data.next_slug : undefined;
      },
    }
  );
};

async function getAuthorDetail(name) {
  const { data } = await api.get(API.POST.AUTHOR.replace(':name', name));
  return data;
}

export const useGetAuthorDetail = (name) => {
  return useQuery(['get-author-detail', name], () => getAuthorDetail(name));
};
