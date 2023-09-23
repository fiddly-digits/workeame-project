import { useState, useEffect, useCallback } from 'react';

const { VITE_SITE_URL } = import.meta.env;

interface BaseProps {
  path: string;
  start: boolean;
  headers?: object;
}

type GetProps = {
  method: 'GET' | 'HEAD';
  data?: never;
};

type PostProps = {
  method: 'POST' | 'DELETE' | 'PUT';
  data: object;
};

type ConditionalProps = GetProps | PostProps;

type Props = BaseProps & ConditionalProps;

type FetchReturn = [
  data: object | undefined,
  loading: boolean,
  refresh: () => void,
  statusCode: number
];

function getUrl(path: string) {
  let staticURL = VITE_SITE_URL;
  if (staticURL === undefined) return '';
  if (staticURL.charAt(staticURL.length - 1) !== '/') staticURL += '/';
  if (path.length > 0 && path.charAt(0) === '/')
    path = path.substring(1, path.length);
  return staticURL + path;
}

export function useFetch({
  path,
  method,
  data,
  headers,
  start
}: Props): FetchReturn {
  const [result, setResult] = useState<object>();
  const [loading, setLoading] = useState(false);
  const [statusCode, setCode] = useState(-1);

  const fetchData = useCallback(async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    const staticURL = getUrl(path);

    const response = await fetch(staticURL, {
      headers:
        headers === undefined ? {} : { 'Content-Type': 'application/json' },
      body: JSON.stringify(data === undefined ? {} : data),
      method: method
    });

    setCode(response.status);

    try {
      const text = await response.text();
      const data = JSON.parse(text);
      setResult(data);
    } catch (err) {
      setResult({});
    }

    setLoading(false);
  }, [data, loading, method, headers, path]);

  useEffect(() => {
    if (start) {
      fetchData();
    }
  }, [fetchData, start]);

  const refresh = () => {
    fetchData();
  };

  return [result, loading, refresh, statusCode];
}

export function useGet({ path, start }: BaseProps): FetchReturn {
  return useFetch({ path, method: 'GET', start });
}

export function usePost({
  path,
  start,
  data
}: BaseProps & PostProps): FetchReturn {
  const fetchResult = useFetch({ path, method: 'POST', start, data });
  return fetchResult;
}
