import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { API } from '~/core/api/config';
import api, { encodeQueryData, setDefaultHeaders } from "~/core/api/api";

// Search alphabet
async function searchGlossary({pageParam = 1}, filters) {
  filters = encodeQueryData(filters);
  const { data } = await api.get(API.GLOSSARY.SEARCH + "?" + filters + "&page=" + pageParam);
  return data;
}

export const useSearchGlossary = (filters) => {
  return useQuery(["glossary-search", filters], () => searchGlossary(filters, {pageParam: 1}))
};

export const useSearchGlossaryInfinite = (filters) => {
  return useInfiniteQuery(
    ['glossary-search-infinite', filters],
    (queryKey, pageParam) => searchGlossary(queryKey, filters), {
    getNextPageParam: (_lastPage, pages) => {
      let data = _lastPage.data;
      if (data.current_page < data.last_page)
        return pages.length + 1;
      else
        return undefined;
    }
  })
};



// Features
async function glossaryFeatures(length) {
  const { data } = await api.get(API.GLOSSARY.FEATURES + "?length=" + length);
  return data;
}

export const useGlossaryFeatures = (length) => {
  return useQuery(["glossary-features"], () => glossaryFeatures(length))
};

