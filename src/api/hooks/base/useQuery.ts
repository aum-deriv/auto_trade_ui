import { useState, useEffect } from "react";
import { API_CONFIG } from "../../config";

/**
 * Result type for the useQuery hook
 * @template T The expected type of the data
 */
interface QueryResult<T> {
    /** The fetched data, null if not yet loaded or on error */
    data: T | null;
    /** Whether the query is currently loading */
    isLoading: boolean;
    /** Any error that occurred during the fetch, null if no error */
    error: Error | null;
}

/**
 * Configuration options for the useQuery hook
 */
interface QueryOptions {
    /** Whether the query should automatically execute (default: true) */
    enabled?: boolean;
    /** Interval in milliseconds to automatically refetch data */
    refetchInterval?: number;
}

/**
 * A custom hook for making GET requests to RESTful APIs
 *
 * @template T The expected type of the response data
 * @param path The API path to fetch from (will be appended to baseUrl)
 * @param options Configuration options for the query
 * @returns An object containing the query result state
 *
 * @example
 * ```typescript
 * interface User {
 *   id: number;
 *   name: string;
 * }
 *
 * function UserProfile({ userId }: { userId: string }) {
 *   const { data, isLoading, error } = useQuery<User>(
 *     `/users/${userId}`,
 *     { refetchInterval: 5000 }
 *   );
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *   if (!data) return <div>No data</div>;
 *
 *   return <div>{data.name}</div>;
 * }
 * ```
 */
export function useQuery<T>(
    path: string,
    options: QueryOptions = {}
): QueryResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const { enabled = true, refetchInterval } = options;
    const url = `${API_CONFIG.baseUrl}${path}`;

    useEffect(() => {
        let isMounted = true;
        let intervalId: number | undefined;

        const fetchData = async () => {
            if (!enabled) return;

            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                if (isMounted) {
                    setData(result);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError(
                        err instanceof Error
                            ? err
                            : new Error("An error occurred")
                    );
                    setData(null);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchData();

        if (refetchInterval) {
            intervalId = window.setInterval(fetchData, refetchInterval);
        }

        return () => {
            isMounted = false;
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [url, enabled, refetchInterval]);

    return { data, isLoading, error };
}
