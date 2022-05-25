const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");


// List of all the faculty.
recordRoutes.route("/faculty").get(async function (req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("faculty")
    .find({}).project({ Emp_No: 1, Name: 1, Department: 1, Present_Designation: 1 })
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching faculty!");
      } else {
        res.json(result);
      }
    });
});

// List of all the faculty by _id
recordRoutes.route("/faculty/:_id").get(async function (req, res) {
  const dbConnect = dbo.getDb();
  const facultyQuery = { _id: req.params._id };

  dbConnect
    .collection("faculty")
    .findOne(facultyQuery, function (err, result) {
      if (err) {
        res.status(400).send({ error: 'Error fetching individual faculty!' })
      } else {
        res.json(result);
      }
    });
});

// List of all the faculty by Emp_No
recordRoutes.route("/faculty/byEmpno/:empno").get(async function (req, res) {
  const dbConnect = dbo.getDb();
  const facultyQuery = { Emp_No: req.params.empno };

  dbConnect
    .collection("faculty")
    .findOne(facultyQuery, function (err, result) {
      if (err) {
        res.status(400).send({ error: 'Error fetching individual faculty!' })
      } else {
        res.json(result);
      }
    });
});

// List of all the faculty by Faculty Name
recordRoutes.route("/faculty/search/:term").get(async function (req, res) {
  const dbConnect = dbo.getDb();
  var regex = new RegExp(req.params.term , 'i')
  
  const facultyQuery = { Name: regex };
  console.log(facultyQuery);

  dbConnect
    .collection("faculty")
    .find(facultyQuery).project({ Emp_No: 1, Name: 1, Department: 1, Present_Designation: 1 })
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching faculty!");
      } else {
        res.json(result);
      }
    });
});




// This section will help you create a new record.
recordRoutes.route("/faculty/create").post(function (req, res) {
  const dbConnect = dbo.getDb();
  const facultyDocument = {
    listing_id: req.body.id,
    last_modified: new Date(),
    session_id: req.body.session_id,
    direction: req.body.direction
  };

  dbConnect
    .collection("faculty")
    .insertOne(facultyDocument, function (err, result) {
      if (err) {
        res.status(400).send("Error inserting faculty!");
      } else {
        console.log(`Added a new faculty with id ${result.insertedId}`);
        res.status(204).send();
      }
    });
});

// This section will help you update a record by id.
recordRoutes.route("/faculty/update").post(function (req, res) {
  const dbConnect = dbo.getDb();
  const facultyQuery = { _id: req.body.id };
  const updates = {
    last_updated: new Date()
  }

  dbConnect
    .collection("faculty")
    .updateOne(facultyQuery, updates, function (err, _result) {
      if (err) {
        res.status(400).send(`Error updating faculty with id ${listingQuery.id}!`);
      } else {
        console.log("1 document updated");
      }
    });
});

// This section will help you delete a record by id
recordRoutes.route("/faculty/delete/:id").delete((req, res) => {
  const dbConnect = dbo.getDb();
  const facultyQuery = { faculty_id: req.body.id };

  dbConnect
    .collection("faculty")
    .deleteOne(facultyQuery, function (err, _result) {
      if (err) {
        res.status(400).send(`Error deleting faculty with id ${facultyQuery.faculty_id}!`);
      } else {
        console.log("1 document deleted");
      }
    });
});



// This section will help you get a list of all the records.
recordRoutes.route("/listings").get(async function (req, res) {
  // Get records
});

// This section will help you create a new record.
recordRoutes.route("/listings/recordSwipe").post(function (req, res) {
  // Insert swipe informations
});

// This section will help you update a record by id.
recordRoutes.route("/listings/updateLike").post(function (req, res) {
  // Update likes
});

// This section will help you delete a record
recordRoutes.route("/listings/delete").delete((req, res) => {
  // Delete documents
});

module.exports = recordRoutes;
