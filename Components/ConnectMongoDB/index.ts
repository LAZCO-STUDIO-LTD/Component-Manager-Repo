import mongoose from "mongoose";
import colors from "ansi-colors";

import Return, { dbName, mongoUri } from "./types/function";

/**
 * Connects to MongoDB and returns connection information.
 *
 * @param {mongoUri} mongoUri The MongoDB URI to connect to.
 * @param {dbName} dbName The name of the database to connect to.
 *
 * @return {Promise<Return>} A promise that resolves to an object containing the function name, title, and content.
 *
 * @example
 * const mongoUri = "mongodb://localhost:27017";
 * const result = await ConnectMongoDB(mongoUri);
 * console.log(result);
 * // "Successfully connected to MongoDB\nHost: "localhost"\nPort: "27017"\nDatabase name: "backend"`
 */
export async function connectMongoDB(
  mongoUri: mongoUri,
  dbName: dbName
): Promise<Return> {
  console.log(colors.yellow("Connecting to MongoDB..."));

  mongoose.set("strictQuery", false);
  await mongoose.connect(mongoUri, {
    dbName: dbName,
  });

  console.log(
    colors.green("Successfully connected to MongoDB") +
      colors.magenta("\nHost:\t\t") +
      colors.cyan(mongoose.connection.host) +
      colors.magenta("\nPort:\t\t") +
      colors.cyan(String(mongoose.connection.port)) +
      colors.magenta("\nDatabase name:\t") +
      colors.cyan(mongoose.connection.name)
  );
  console.log();

  return `Successfully connected to MongoDB\nHost: "${mongoose.connection.host}"\nPort: "${mongoose.connection.port}"\nDatabase name: "${mongoose.connection.name}"`;
}
