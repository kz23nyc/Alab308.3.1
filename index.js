// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";
//db1, db2, and db3: These databases contain the user's basic information, including username, website, and company. Accessing these databases will return an object with these properties. If one of these databases encounters an error, your function should return a rejected promise indicating which database failed.

// Define the "getUserData" function with id parametr and return a Promise that resolves to an object containing the user's data. Create an object dbs to map the database names to their corresponding functions.
async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };

  try {
    //Step 1: Find which database the users is in using the central function
    const databaseName = await central(id);
    console.log(databaseName);

    // Step 2:  Get the user's basic info from the appropriate database
    const basicInfo = await dbs[databaseName](id);
    console.log(basicInfo);

    // Step 3: Get the user's personal data from the vault
    const personalData = await vault(id);

    // Step 5: Combine the data into a single object
    const userData = {
      id: id,
      ...basicInfo,
      ...personalData,
    };
  } catch (error) {
    // Handle errors (e.g., invalid ID, database errors)
    return Promise.reject(error.message);
  }
}

getUserData(9)
  .then((user) => console.log(9))
  .catch((error) => console.error(error));

getUserData(2).then((user) => console.log(2));
getUserData(3).then((user) => console.log(3));
getUserData(5).then((user) => console.log(5));
getUserData(11).then((user) => console.log(11));
