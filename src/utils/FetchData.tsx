export const MovieData: RequestInit = {
  method: "GET",

  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
};

export const FetchData = async (url: string) => {
  try {
    const response = await fetch(url, MovieData);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Erro Fetching ${error}`);
  }
};
