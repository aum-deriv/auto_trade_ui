import { useState } from "react";

/**
 * Result type for the useMutation hook
 * @template T The expected type of the response data
 * @template P The type of the payload data
 */
interface MutationResult<T, P> {
    /** The response data, null if not yet loaded or on error */
    data: T | null;
    /** Whether the mutation is currently in progress */
    isLoading: boolean;
    /** Any error that occurred during the mutation, null if no error */
    error: Error | null;
    /** Function to trigger the mutation with a payload */
    mutate: (payload: P) => Promise<void>;
}

/**
 * A custom hook for making POST requests to RESTful APIs
 *
 * @template T The expected type of the response data
 * @template P The type of the payload data
 * @param url The URL to send the POST request to
 * @returns An object containing the mutation state and mutate function
 *
 * @example
 * ```typescript
 * interface CreateUserPayload {
 *   name: string;
 *   email: string;
 * }
 *
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string;
 * }
 *
 * function CreateUserForm() {
 *   const { mutate, isLoading, error } = useMutation<User, CreateUserPayload>(
 *     "https://api.example.com/users"
 *   );
 *
 *   const handleSubmit = async (formData: CreateUserPayload) => {
 *     await mutate(formData);
 *   };
 *
 *   if (isLoading) return <div>Creating user...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return <form onSubmit={...}>...</form>;
 * }
 * ```
 */
export function useMutation<T, P>(url: string): MutationResult<T, P> {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const mutate = async (payload: P): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setData(result);
            setError(null);
        } catch (err) {
            setError(
                err instanceof Error ? err : new Error("An error occurred")
            );
            setData(null);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, error, mutate };
}
