import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Genre {
	id: number;
	name: string;
}

interface FetchGenresResponse {
	count: number;
	results: Genre[];
}

const useGenres = () => {
	const [genres, setGenres] = useState<Genre[]>([]);
	const [error, setError] = useState("");
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		const controller = new AbortController(); // Create an AbortController instance (DONT FORGET)

		setLoading(true);
		apiClient
			.get<FetchGenresResponse>("/genres", { signal: controller.signal }) // Pass the controller signal to the request
			.then((response) => {
				setGenres(response.data.results);
				setLoading(false);
			})
			.catch((error) => {
				if (error instanceof CanceledError) return; // Don't display error in case of an abort (1st render in Strict Mode).
				setError(error.message);
				setLoading(false);
			});

		return () => controller.abort(); // Cleanup function (DONT FORGET)
	}, []);

	return { genres, error, isLoading };
};

export default useGenres;
