import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface FetchResponse<T> {
	count: number;
	results: T[];
}

const useData = <T>(endpoint: string) => {
	const [data, setData] = useState<T[]>([]);
	const [error, setError] = useState("");
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		const controller = new AbortController(); // Create an AbortController instance (DONT FORGET)

		setLoading(true);
		apiClient
			.get<FetchResponse<T>>(endpoint, { signal: controller.signal }) // Pass the controller signal to the request
			.then((response) => {
				setData(response.data.results);
				setLoading(false);
			})
			.catch((error) => {
				if (error instanceof CanceledError) return; // Don't display error in case of an abort (1st render in Strict Mode).
				setError(error.message);
				setLoading(false);
			});

		return () => controller.abort(); // Cleanup function (DONT FORGET)
	}, []);

	return { data, error, isLoading };
};

export default useData;
