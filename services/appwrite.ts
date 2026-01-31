// services/appwrite.ts
import { Client, Databases, ID, Query } from "appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (
  searchTerm: string,
  movie: Movie
) => {
  if (!searchTerm.trim() || !movie) return;

  try {
    const result = await database.listDocuments({
      databaseId: DATABASE_ID,
      collectionId: COLLECTION_ID,
      queries: [Query.equal("searchTerm", searchTerm)]
    });

    if (result.documents.length > 0) {
      const existingDoc = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingDoc.$id,
        {
          count: existingDoc.count + 1,
        }
      );
    } else {
      await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          title: movie.title,
          searchTerm,
          movie_id: movie.id,
          count: 1,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }
      );
    }
  } catch (error) {
    console.error("Appwrite Search Count Error:", error);
    throw error;
  }
};


export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> =>{
    try{
        const result = await database.listDocuments({
            databaseId: DATABASE_ID,
            collectionId: COLLECTION_ID,
            queries: [Query.limit(5), 
            Query.orderDesc('count'),
            ]
          });
          return result.documents as unknown as TrendingMovie[];
    }catch(error){
        console.log(error);
        return undefined;
    }
}