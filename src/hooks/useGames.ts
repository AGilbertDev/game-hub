import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Game {
	id: number;
	name: string;
}

interface FetchGamesResponse {
	count: number;
	results: Game[];
}

const useGames = () => {
	const [games, setGames] = useState<Game[]>([]);
	const [error, setError] = useState("");

	useEffect(() => {
		const controller = new AbortController(); // Create an AbortController instance (DONT FORGET)

		apiClient
			.get<FetchGamesResponse>("/games", { signal: controller.signal }) // Pass the controller signal to the request
			.then((response) => setGames(response.data.results))
			.catch((error) => {
				if (error instanceof CanceledError) return; // Don't display error in case of an abort (1st render in Strict Mode).
				setError(error.message);
			});

		return () => controller.abort(); // Cleanup function (DONT FORGET)
	}, []);

	return { games, error };
};

export default useGames;
