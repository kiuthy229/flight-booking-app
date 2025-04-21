declare module 'react-query' {
  const content: any;
  export = content;
  export function useQuery<TData = unknown, TError = unknown>(
    queryKey: any,
    queryFn: (...args: any[]) => Promise<TData>,
    options?: {
      staleTime?: number;
      cacheTime?: number;
      refetchOnWindowFocus?: boolean;
      enabled?: boolean;
      // Add other common options as needed
    }
  ): {
    data: TData | undefined;
    error: TError | null;
    isLoading: boolean;
    isError: boolean;
    isFetching: boolean; // Added for completeness
  };

  export function useMutation<
    TData = unknown,
    TError = unknown,
    TVariables = void,
    TContext = unknown
  >(
    mutationFn: (variables: TVariables) => Promise<TData>,
    options?: {
      onSuccess?: (data: TData, variables: TVariables, context?: TContext) => void;
      onError?: (error: TError, variables: TVariables, context?: TContext) => void;
      onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables, context?: TContext) => void;
      // Add other common options as needed
    }
  ): {
    mutate: (variables: TVariables) => void;
    data: TData | undefined;
    error: TError | null;
    isLoading: boolean;
    isError: boolean;
    reset: () => void;
  };

  export { QueryClient, QueryClientProvider };
}
