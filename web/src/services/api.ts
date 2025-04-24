import axios from "axios";

export const api = axios.create({
	// TODO: .ENV
	baseURL: "https://brevly.onrender.com/", // ou http://localhost:3333
	headers: {
		"Content-Type": "application/json",
	},
});
