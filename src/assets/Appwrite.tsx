import { Account, Client, Databases, Query } from "appwrite";
import { ID } from "appwrite";
import { Models } from "appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
type movie = {
  id: number;
  poster_path: string;
};
export type MovieSearchDocument = Models.Document & {
  searchTerm: string;
  count: number;
  movie_id: number;
  poster_url: string;
};

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject(PROJECT_ID);

export const account = new Account(client);
export default client;

const database = new Databases(client);

export const updateSearchCount = async (
  searchTerm: string,
  movie: movie
): Promise<void> => {
  try {
    const result = await database.listDocuments<MovieSearchDocument>(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal("searchTerm", searchTerm)]
    );

    if (result.documents.length > 0) {
      const doc = result.documents[0];
      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });
    } else {
      await database.createDocument<MovieSearchDocument>(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          searchTerm,
          count: 1,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          movie_id: movie.id,
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTrendingMovies = async (): Promise<MovieSearchDocument[]> => {
  try {
    const result = await database.listDocuments<MovieSearchDocument>(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.limit(5), Query.orderDesc("count")]
    );
    return result.documents;
  } catch (error) {
    console.log(error);
    return [];
  }
};
