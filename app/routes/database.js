var mysql = require('mysql');

var pool = mysql.createPool({
  host     : '127.0.0.1',
  user     : 'Colin',
  password : 'SaltyTuna814',
  database : 'TeamTrack',
  connectionLimit: 10,
  supportBigNumbers: true
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
  var sql = "SELECT a.runnerID, CONCAT(a.firstname, ' ', a.lastname) as fullName, b.description AS schoolName FROM Runners a INNER JOIN Schools b ON a.fk_schoolID = b.id WHERE a.fk_schoolID = ?";

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
  var sql = "SELECT id, description FROM States";

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
  var sql = "SELECT id, description FROM Schools WHERE fk_stateID = ?";

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
  var sql = "SELECT CONCAT(firstname, ' ', lastname) as fullName FROM Users WHERE fk_schoolID = ?";

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


































