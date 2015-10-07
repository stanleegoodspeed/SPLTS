var mysql = require('mysql');

// var pool = mysql.createPool({
//   host     : '127.0.0.1',
//   user     : 'Colin',
//   password : 'SaltyTuna814',
//   database : 'TeamTrack',
//   connectionLimit: 100,
//   supportBigNumbers: true
// });

//PRODUCTION
var pool = mysql.createPool({
  host     : process.env.MYHOST,
  port     : process.env.MYPORT,
  user     : process.env.MYUSER,
  password : process.env.MYPASS,
  database : process.env.MYDB
});

// Get workouts for athlete
exports.getWorkouts = function(id, callback) {
  var sql = "SELECT a.runInRaceID, DATE_FORMAT(b.raceDate,'%m-%d-%y') AS raceDate, d.description AS raceType, b.raceName, c.description AS eventName, TRUNCATE(a.finishTime,2) AS finishTime FROM RunnersInRace a INNER JOIN Races b ON a.fk_raceID = b.raceID INNER JOIN Events c ON b.fk_eventID = c.id INNER JOIN RaceTypes d ON b.fk_typeID = d.id WHERE a.fk_runnerID = ?";

  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    
    if(err) { 
      console.log(err); 
      callback(true); 
      return; 
    }

    connection.query(sql, [id], function(err, results) {
      connection.release();
      if(err) { 
        console.log(err); 
        callback(true); 
        return; 
      }
      callback(false, results);
    });
  });
};

// Get splits for workout
exports.getSplits = function(id, callback) {
  var sql = "SELECT splitID, splitNumber AS splitIndex, TRUNCATE(splitTime,2) AS splitTime, fk_runInRaceID FROM Splits WHERE fk_runInRaceID = ? ORDER BY splitIndex;";

  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    
    if(err) { 
      console.log(err); 
      callback(true); 
      return; 
    }

    connection.query(sql, [id], function(err, results) {
      connection.release();
      if(err) { 
        console.log(err); 
        callback(true); 
        return; 
      }

      callback(false, results);
    });
  });
};


// Get athletes for coach
exports.getAthletes = function(id, callback) {
  //var sql = "SELECT a.runnerID, a.firstName, a.lastName, CONCAT(a.firstname, ' ', a.lastname) as fullName, b.description AS schoolName FROM Runners a INNER JOIN Schools b ON a.fk_schoolID = b.id WHERE a.fk_schoolID = ?";

  var sql = "SELECT a.runnerID, a.firstName, a.lastName, CONCAT(a.firstname, ' ', a.lastname) as fullName, b.description AS schoolName FROM Runners a INNER JOIN Schools b ON a.fk_schoolID = b.id INNER JOIN Users c ON c.id = ? WHERE a.fk_schoolID = c.fk_schoolID";
  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    
    if(err) { 
      console.log(err); 
      callback(true); 
      return; 
    }

    connection.query(sql, [id], function(err, results) {
      connection.release();
      if(err) { 
        console.log(err); 
        callback(true); 
        return; 
      }

      callback(false, results);
    });
  });
};


// Get coach snapshot
exports.getCoachData = function(id, callback) {
  var sql = "SELECT CONCAT(a.firstname, ' ', a.lastname) as fullName, a.fk_schoolID, b.description AS schoolName, DATE_FORMAT(a.createdDate,'%m-%d-%y') AS createdDate, c.description AS userType FROM Users a INNER JOIN Schools b ON a.fk_schoolID = b.id INNER JOIN UserTypes c ON a.fk_userType = c.id WHERE a.id = ?";

  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    
    if(err) { 
      console.log(err); 
      callback(true); 
      return; 
    }

    connection.query(sql, [id], function(err, results) {
      connection.release();
      if(err) { 
        console.log(err); 
        callback(true); 
        return; 
      }
      callback(false, results);
    });
  });
};

// Get coach snapshot
exports.getAthleteData = function(id, callback) {
  var sql = "SELECT CONCAT(a.firstname, ' ', a.lastname) as fullName, a.fk_schoolID, b.description AS schoolName, DATE_FORMAT(a.createdDate,'%m-%d-%y') AS createdDate FROM Runners a INNER JOIN Schools b ON a.fk_schoolID = b.id WHERE a.runnerID = ?";

  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    
    if(err) { 
      console.log(err); 
      callback(true); 
      return; 
    }

    connection.query(sql, [id], function(err, results) {
      connection.release();
      if(err) { 
        console.log(err); 
        callback(true); 
        return; 
      }
      callback(false, results);
    });
  });
};

// Get states
exports.getStates = function(callback) {
  var sql = "SELECT id, description FROM States ORDER BY description";

  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    
    if(err) { 
      console.log(err); 
      callback(true); 
      return; 
    }

    connection.query(sql, function(err, results) {
      connection.release();
      if(err) { 
        console.log(err); 
        callback(true); 
        return; 
      }
      callback(false, results);
    });
  });
};



// Get schools for state
exports.getSchools = function(id, callback) {
  var sql = "SELECT id, description FROM Schools WHERE fk_stateID = ? ORDER BY description";

  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    
    if(err) { 
      console.log(err); 
      callback(true); 
      return; 
    }

    connection.query(sql, [id], function(err, results) {
      connection.release();
      if(err) { 
        console.log(err); 
        callback(true); 
        return; 
      }
      callback(false, results);
    });
  });
};

// Get events
exports.getEvents = function(callback) {
  var sql = "SELECT id AS myCode, description AS myDescription FROM Events ORDER BY myDescription * 1";

  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    
    if(err) { 
      console.log(err); 
      callback(true); 
      return; 
    }

    connection.query(sql, function(err, results) {
      connection.release();
      if(err) { 
        console.log(err); 
        callback(true); 
        return; 
      }
      callback(false, results);
    });
  });
};

// Get race types
exports.getTypes = function(callback) {
  var sql = "SELECT id AS myCode, description AS myDescription FROM RaceTypes";

  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    
    if(err) { 
      console.log(err); 
      callback(true); 
      return; 
    }

    connection.query(sql, function(err, results) {
      connection.release();
      if(err) { 
        console.log(err); 
        callback(true); 
        return; 
      }
      callback(false, results);
    });
  });
};

// Get workouts created by coach
exports.getWorkoutsCoach = function(id, callback) {
  var sql = "SELECT a.raceID, a.raceName, DATE_FORMAT(a.raceDate,'%m-%d-%y') AS raceDate, b.description AS raceType, c.description AS eventName FROM Races a INNER JOIN RaceTypes b ON a.fk_typeID = b.id INNER JOIN Events c ON a.fk_eventID = c.id WHERE createdBy = ?";

  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    
    if(err) { 
      console.log(err); 
      callback(true); 
      return; 
    }

    connection.query(sql, [id], function(err, results) {
      connection.release();
      if(err) { 
        console.log(err); 
        callback(true); 
        return; 
      }
      callback(false, results);
    });
  });
};

// Get athletes for coach
exports.getAthletesInRace = function(id, callback) {
  var sql = "SELECT a.runInRaceID, a.fk_runnerID AS runnerID, CONCAT(b.firstname, ' ', b.lastname) as fullName, TRUNCATE(a.finishTime,2) AS finishTime FROM RunnersInRace a INNER JOIN Runners b ON a.fk_runnerID = b.runnerID WHERE a.fk_raceID = ?";

  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    
    if(err) { 
      console.log(err); 
      callback(true); 
      return; 
    }

    connection.query(sql, [id], function(err, results) {
      connection.release();
      if(err) { 
        console.log(err); 
        callback(true); 
        return; 
      }

      callback(false, results);
    });
  });
};

// Insert new athlete
exports.createAthlete = function(post, callback) {

  var sql = "INSERT INTO Runners SET ?";

  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    
    if(err) { 
      console.log(err); 
      callback(true); 
      return; 
    }

    connection.query(sql, [post], function(err, results) {
      connection.release();
      if(err) { 
        console.log(err); 
        callback(true); 
        return; 
      }

      callback(false, results);
    });
  });
};

// Get athletes for coach
exports.getCoaches = function(id, callback) {
  var sql = "SELECT CONCAT(firstname, ' ', lastname) as fullName FROM Users WHERE fk_schoolID = ? AND fk_userType = 1";

  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    
    if(err) { 
      console.log(err); 
      callback(true); 
      return; 
    }

    connection.query(sql, [id], function(err, results) {
      connection.release();
      if(err) { 
        console.log(err); 
        callback(true); 
        return; 
      }

      callback(false, results);
    });
  });
};

// Add school
exports.addSchool = function(post, callback) {

  var sql = "INSERT INTO Schools SET ?";

  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    
    if(err) { 
      console.log(err); 
      callback(true); 
      return; 
    }

    connection.query(sql, [post], function(err, results) {
      connection.release();
      if(err) { 
        console.log(err); 
        callback(true); 
        return; 
      }

      callback(false, results);
    });
  });
};

// Insert new athlete
exports.checkProfile = function(get, callback) {

  var sql = "SELECT * FROM Runners WHERE runnerID = ? AND fk_schoolID = ?";

  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    
    if(err) { 
      console.log(err); 
      callback(true); 
      return; 
    }

    connection.query(sql, [get.athleteID, get.schoolID], function(err, results) {
      connection.release();
      if(err) { 
        console.log(err); 
        callback(true); 
        return; 
      }

      callback(false, results);
    });
  });
};


// Create workout via app
exports.createWorkout = function(post, callback) {

  var sql = "INSERT INTO Races SET ?";

  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    
    if(err) { 
      console.log(err); 
      callback(true); 
      return; 
    }

    connection.query(sql, [post], function(err, results) {
      connection.release();
      if(err) { 
        console.log(err); 
        callback(true); 
        return; 
      }

      callback(false, results);
    });
  });
};

// Add athlete to workout
exports.addAthleteToWorkout = function(post, callback) {

  var sql = "INSERT INTO RunnersInRace SET ?";

  console.log('post obj in addAthleteToWorkout is: ' + post);

  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    
    if(err) { 
      console.log(err); 
      callback(true); 
      return; 
    }

    connection.query(sql, [post], function(err, results) {
      connection.release();
      if(err) {   
        console.log(err); 
        callback(true); 
        return; 
      }

      var response = {
          runInRaceID: results.insertId,
          runnerID: post.fk_runnerID
      };

      callback(false, response);
    });
  });
};

// Save finish time for workout
exports.postWorkoutTime = function(post, callback) {

  var sql = "UPDATE RunnersInRace SET finishTime = ? WHERE runInRaceID = ?";

  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    
    if(err) { 
      console.log(err); 
      callback(true); 
      return; 
    }

    connection.query(sql, [post.finishTime, post.runInRaceID], function(err, results) {
      connection.release();
      if(err) { 
        console.log(err); 
        callback(true); 
        return; 
      }

      callback(false, results);
    });
  });
};

// Add new split for workout
exports.postSplit = function(post, callback) {

  var sql = "INSERT INTO Splits SET ?";

  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    
    if(err) { 
      console.log(err); 
      callback(true); 
      return; 
    }

    connection.query(sql, [post], function(err, results) {
      connection.release();
      if(err) { 
        console.log(err); 
        callback(true); 
        return; 
      }

      callback(false, results);
    });
  });
};

// Add new split for workout
exports.getAthletesWithSplits = function(id, callback) {

  var sql = "SELECT a.runInRaceID, a.finishTime, splitNumber AS splitIndex, splitTime AS splitTime, c.firstName, c.lastName FROM RunnersInRace a INNER JOIN Splits b ON a.runInRaceID = b.fk_runInRaceID INNER JOIN Runners c ON a.fk_runnerID = c.runnerID WHERE a.fk_raceID = ?";

  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    
    if(err) { 
      console.log(err); 
      callback(true); 
      return; 
    }

    connection.query(sql, [id], function(err, results) {
      connection.release();
      if(err) { 
        console.log(err); 
        callback(true); 
        return; 
      }

      callback(false, results);
    });
  });
};

// Add new split for workout
exports.getUsers = function(callback) {

  var sql = "SELECT id AS userID, CONCAT(firstname, ' ', lastname) as fullName FROM Users WHERE fk_userType = 1";

  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    
    if(err) { 
      console.log(err); 
      callback(true); 
      return; 
    }

    connection.query(sql, function(err, results) {
      connection.release();
      if(err) { 
        console.log(err); 
        callback(true); 
        return; 
      }

      callback(false, results);
    });
  });
};

// Create workout via app
exports.editAthlete = function(post, callback) {

  var sql = "UPDATE Runners SET firstName = ?, lastName = ? WHERE runnerID = ?";

  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    
    if(err) { 
      console.log(err); 
      callback(true); 
      return; 
    }

    connection.query(sql, [post.firstName, post.lastName, post.runnerID ], function(err, results) {
      connection.release();
      if(err) { 
        console.log(err); 
        callback(true); 
        return; 
      }

      callback(false, results);
    });
  });
};

// Create workout via app
exports.deleteAthlete = function(post, callback) {

  var sql = "UPDATE Runners SET fk_schoolID = -1 WHERE runnerID = ?";

  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    
    if(err) { 
      console.log(err); 
      callback(true); 
      return; 
    }

    connection.query(sql, [post.runnerID], function(err, results) {
      connection.release();
      if(err) { 
        console.log(err); 
        callback(true); 
        return; 
      }

      callback(false, results);
    });
  });
};
































