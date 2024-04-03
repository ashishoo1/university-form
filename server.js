const { query } = require("express");
const express = require("express"); //Line 1
const bodyParser = require("body-parser");
const axios = require("axios");
var cors = require("cors");

const app = express(); //Line 2
const queryExecutor = require("node-database-executor").promise;
// const async= require()
app.use(cors());
const port = process.env.PORT || 5000; //Line 3

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

app.use(express.json());
// create a GET route
// app.get("/express_backend", (req, res) => {
//   //Line 9
//   res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" }); //Line 10
// });

app.get("/", async (req, res) => {
  const returnValue = await queryRun();

  console.log(returnValue);

  res.send({ "Res": returnValue }); //Line 10
});

async function queryRun() {
  const queryForData = "select * from tbl_degreemaster";
  const queryConfig = {
    query: queryForData,
    dbConfig: {
      type: "database",
      databaseType: "mysql",
      engine: "mysql",
      database: "test_ashish",
      host: "localhost",
      port: "3306",
      user: "usr",
      password: "Eefeere1",
      connectionLimit: 0,
      acquireTimeout: 300000,
    },
  };
  const queryResultsForDeletedUserCount = await queryExecutor.executeRawQuery(
    queryConfig
  );
  return queryResultsForDeletedUserCount;
}

// app.get("/", async (req, res) => {
//   //Line 9
//   const returnValue = await queryRun();
//   console.log(returnValue);
//   res.send({ express: returnValue }); //Line 10
// });

// app.get("http://localhost:3000/", async (req, res) => {
//   const returnValue = await queryRun();
//   console.log(returnValue,req,res);
//   res.send(returnValue);
// });

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  next();
});

app.post("/submit-application", async (req, res) => {
  const {
    firstName,
    lastName,
    contactDetails,
    qualifications,
    addressDetails,
    annotation,
    score
  } = req.body;
  console.log("Application submitted successfully");
  const queryres = await queryRunForUpdate(
    firstName,
    lastName,
    contactDetails,
    qualifications,
    addressDetails,
    annotation,
    score
  );
  console.log(queryres);
  res.status(201).send("Application submitted");
});

async function queryRunForUpdate(
  firstName,
  lastName,
  contactDetails,
  qualifications,
  addressDetails,
  annotation,
  score
) {
  const queryForData = `INSERT INTO tbl_usermaster (annotation,firstName, lastName) VALUES("${annotation}","${firstName}","${lastName}")`;
  const queryConfig = {
    query: queryForData,
    dbConfig: {
      type: "database",
      databaseType: "mysql",
      engine: "mysql",
      database: "test_ashish",
      host: "localhost",
      port: "3306",
      user: "usr",
      password: "Eefeere1",
      connectionLimit: 0,
      acquireTimeout: 300000,
    },
  };
  const queryResultsForDeletedUserCount = await queryExecutor.executeRawQuery(
    queryConfig
  );
  const queryForcount = "SELECT COUNT(*) FROM tbl_usermaster";
  const queryConfigForcount = {
    query: queryForcount,
    dbConfig: {
      type: "database",
      databaseType: "mysql",
      engine: "mysql",
      database: "test_ashish",
      host: "localhost",
      port: "3306",
      user: "usr",
      password: "Eefeere1",
      connectionLimit: 0,
      acquireTimeout: 300000,
    },
  };
  const queryResultsForcount = await queryExecutor.executeRawQuery(
    queryConfigForcount
  );
  let count = queryResultsForcount[0]["COUNT(*)"];

  const queryForDataInNumber = `INSERT INTO tbl_numbermaster (fk_UserId,number) VALUES(${count},${contactDetails})`;
  const queryConfigForNumber = {
    query: queryForDataInNumber,
    dbConfig: {
      type: "database",
      databaseType: "mysql",
      engine: "mysql",
      database: "test_ashish",
      host: "localhost",
      port: "3306",
      user: "usr",
      password: "Eefeere1",
      connectionLimit: 0,
      acquireTimeout: 300000,
    },
  };
  const queryResultsForDeletedUserCountForNumber =
    await queryExecutor.executeRawQuery(queryConfigForNumber);
  const queryForDataInAddress = `INSERT INTO tbl_addressmaster (fk_UserId,address) VALUES(${count},"${addressDetails}")`;
  const queryConfigForAddress = {
    query: queryForDataInAddress,
    dbConfig: {
      type: "database",
      databaseType: "mysql",
      engine: "mysql",
      database: "test_ashish",
      host: "localhost",
      port: "3306",
      user: "usr",
      password: "Eefeere1",
      connectionLimit: 0,
      acquireTimeout: 300000,
    },
  };
  const queryResultsForDeletedUserAddress = await queryExecutor.executeRawQuery(
    queryConfigForAddress
  );

  const queryForDataInqualification = `INSERT INTO tbl_qualificationmaster (fk_UserId,degree,score) VALUES(${count},"${qualifications}","${score}")`;
  const queryConfigForqualification = {
    query: queryForDataInqualification,
    dbConfig: {
      type: "database",
      databaseType: "mysql",
      engine: "mysql",
      database: "test_ashish",
      host: "localhost",
      port: "3306",
      user: "usr",
      password: "Eefeere1",
      connectionLimit: 0,
      acquireTimeout: 300000,
    },
  };
  const queryResultsForDeletedUserqualification =
    await queryExecutor.executeRawQuery(queryConfigForqualification);

  return {
    queryResultsForDeletedUserCount,
    queryResultsForDeletedUserCountForNumber,
    queryResultsForcount,
    queryResultsForDeletedUserAddress,
    queryResultsForDeletedUserqualification,
  };
}

// executeRawQuery
