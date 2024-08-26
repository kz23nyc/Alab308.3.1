// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };

  //Step 1 find users in the database using central
  const databaseName = await central(id);
  console.log(databaseName);

  // Step 2  user's basic info
  const basicInfo = await dbs[databaseName](id);
  console.log(basicInfo);

  // Step 3 access to vault an steal personal data
  const personalData = await vault(id);
  console.log(personalData);
  return{
    ...basicInfo, // const basicInfo
    ...personalData
  }
}

const user = await getUserData(9);
console.log(user);
