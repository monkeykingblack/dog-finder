/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface RequestOptions<TData, TError, TArgs> {
  immediate?: boolean;
  defaultArgs?: TArgs;
  initialData?: TData | null;
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
}

export default function useRequest<
  TData = unknown,
  TError = Error,
  TVariables extends any[] = any[],
>(
  requestFn: (...args: TVariables) => Promise<TData>,
  options: RequestOptions<TData, TError, TVariables> = {},
) {
  const {
    immediate = true,
    initialData = null,
    onSuccess,
    onError,
    defaultArgs = [] as unknown as TVariables,
  } = options;

  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<TData | null>(initialData);
  const [error, setError] = React.useState<TError | null>(null);

  const lastArgsRef = React.useRef<TVariables>(defaultArgs);

  const run = React.useCallback(
    async (...args: TVariables) => {
      setLoading(true);
      setError(null);

      try {
        const response = await requestFn(...args);
        if (onSuccess) {
          onSuccess(response);
        }
        setData(response);
        lastArgsRef.current = args;
      } catch (err) {
        const error = err as TError;
        if (onError) {
          onError(error);
        }
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [onError, onSuccess, requestFn],
  );

  const refetch = React.useCallback(() => {
    run(...lastArgsRef.current);
  }, [run]);

  React.useEffect(() => {
    if (immediate) {
      run(...lastArgsRef.current);
    }
  }, [immediate, run]);

  return {
    loading,
    data,
    error,
    run,
    refetch,
  };
}
