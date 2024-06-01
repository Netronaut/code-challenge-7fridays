import { useEffect, useState } from "react";

export function useQuery<T>(
  query: string,
  variables: Record<string, unknown> = {}
) {
  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const body = JSON.stringify({ query, variables });
    fetch("/api", {
      method: "post",
      headers: { "content-type": "application/json" },
      body,
    })
      .then((res) => res.json() as Promise<{ data: T }>)
      .then(({ data }) => setData(data))
      .catch((err) => setError(err))
      .then(() => setIsPending(false));
  }, []);

  return { data, error, isPending };
}
