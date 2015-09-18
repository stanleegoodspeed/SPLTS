<?php
require '../vendor/autoload.php';

$app = new \Slim\Slim();

function db_connect() {

    // Define connection as a static variable, to avoid connecting more than once 
    static $connection;

    // Try and connect to the database, if a connection has not been established yet
    if(!isset($connection)) {
         // Load configuration as an array. Use the actual location of your configuration file
        $config = parse_ini_file('../Config/config.ini'); 
        $connection = new mysqli($config['host'],$config['username'],$config['password'],$config['dbname']);
    }

    // If connection was not successful, handle the error
    if($connection === false) {
        // Handle error - notify administrator, log to a file, show an error screen, etc.
        return mysqli_connect_error(); 
    }
    return $connection;
}

// Helper method to get a string description for an HTTP status code
// From http://www.gen-x-design.com/archives/create-a-rest-api-with-php/ 
function getStatusCodeMessage($status)
{
    // these could be stored in a .ini file and loaded
    // via parse_ini_file()... however, this will suffice
    // for an example
    $codes = Array(
        100 => 'Continue',
        101 => 'Switching Protocols',
        200 => 'OK',
        201 => 'Created',
        202 => 'Accepted',
        203 => 'Non-Authoritative Information',
        204 => 'No Content',
        205 => 'Reset Content',
        206 => 'Partial Content',
        300 => 'Multiple Choices',
        301 => 'Moved Permanently',
        302 => 'Found',
        303 => 'See Other',
        304 => 'Not Modified',
        305 => 'Use Proxy',
        306 => '(Unused)',
        307 => 'Temporary Redirect',
        400 => 'Bad Request',
        401 => 'Unauthorized',
        402 => 'Payment Required',
        403 => 'Forbidden',
        404 => 'Not Found',
        405 => 'Method Not Allowed',
        406 => 'Not Acceptable',
        407 => 'Proxy Authentication Required',
        408 => 'Request Timeout',
        409 => 'Conflict',
        410 => 'Gone',
        411 => 'Length Required',
        412 => 'Precondition Failed',
        413 => 'Request Entity Too Large',
        414 => 'Request-URI Too Long',
        415 => 'Unsupported Media Type',
        416 => 'Requested Range Not Satisfiable',
        417 => 'Expectation Failed',
        500 => 'Internal Server Error',
        501 => 'Not Implemented',
        502 => 'Bad Gateway',
        503 => 'Service Unavailable',
        504 => 'Gateway Timeout',
        505 => 'HTTP Version Not Supported'
    );
 
    return (isset($codes[$status])) ? $codes[$status] : '';
}
 
// Helper method to send a HTTP response code/message
function sendResponse($status = 200, $body = '', $content_type = 'text/html')
{
    $status_header = 'HTTP/1.1 ' . $status . ' ' . getStatusCodeMessage($status);
    header($status_header);
    header('Content-type: ' . $content_type);
    echo $body;
}

// GET Runners
$app->get('/getrunners', function() {
        
        $db = db_connect();
        $result = array();
        $sql= "SELECT r.runnerID, r.firstName, r.lastName, x.description AS stateName, s.description AS schoolName 
        FROM Runners r 
        JOIN Schools s ON r.fk_schoolID = s.id 
        JOIN States x ON x.id = s.fk_stateID"; 
        
        $r = $db->query($sql);
        while($runner = $r->fetch_assoc()){
            
            $result[] = $runner;
        }

        // return JSON encoded array
        echo json_encode($result);
});

// GET Runners filtered
$app->get('/runners/:name', function($name) {
        
        $db = db_connect();
        $result = array();
        $sql= "SELECT r.runnerID, r.firstName, r.lastName, x.description AS stateName, s.description AS schoolName 
        FROM Runners r 
        JOIN Schools s ON s.id = r.fk_schoolID
        JOIN States x ON x.id = s.fk_stateID
        WHERE r.lastName LIKE '$name%'";
        
        $r = $db->query($sql);
        while($runner = $r->fetch_assoc()){
            
            $result[] = $runner;
        }

        // return JSON encoded array
        echo json_encode($result);
});


// POST Runner
$app->post('/runners', function() use ($app) {
    
    $db = db_connect();
    $request = (array) json_decode($app->request()->getBody());

    // Retrieve input values - put into local vars
    $fName = $request['firstName'];
    $lName = $request['lastName'];
    $sCode = $request['fk_schoolID'];
    $gName = $request['genderName'];

    try {
        // Prepare statement
        $stmt = $db->prepare("INSERT INTO Runners (firstName,lastName,fk_schoolID, gender) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssis", $fName, $lName, $sCode, $gName);
        $stmt->execute();
        $stmt->close();

        // Send success code
        sendResponse(200, json_encode('Success'));
        
    } catch(PDOException $e) {
        // Send error code
        sendResponse(400, '. $e->getMessage() .');
    }
});

// POST Runner
$app->post('/postrunnertime', function() use ($app) {
    
    $db = db_connect();
    $request = (array) json_decode($app->request()->getBody());

    // Retrieve input values - put into local vars
    $finishTime = $request['finishTime'];
    $runInRaceID = $request['runInRaceID'];

    try {
        // Prepare statement
        $stmt = $db->prepare("UPDATE RunnersInRace SET finishTime = ?  WHERE runInRaceID = ?");
        $stmt->bind_param("di", $finishTime,$runInRaceID);
        $stmt->execute();
        $stmt->close();

        // Send success code
        sendResponse(200, json_encode('Success'));
        
    } catch(PDOException $e) {
        // Send error code
        sendResponse(400, '. $e->getMessage() .');
    }
});

// POST Runner
$app->post('/postrunnersplit', function() use ($app) {
    
    $db = db_connect();
    $request = (array) json_decode($app->request()->getBody());

    // Retrieve input values - put into local vars
    $runInRaceID= $request['runInRaceID'];
    $splitNumber = $request['splitNumber'];
    $splitTime = $request['splitTime'];

    try {
        // Prepare statement
        $stmt = $db->prepare("INSERT INTO Splits (fk_runInRaceID, splitNumber, splitTime) VALUES (?, ?, ?)");
        $stmt->bind_param("iid", $runInRaceID, $splitNumber, $splitTime);
        $stmt->execute();
        $stmt->close();

        // Send success code
        sendResponse(200, json_encode('Success'));
        
    } catch(PDOException $e) {
        // Send error code
        sendResponse(400, '. $e->getMessage() .');
    }
});

// POST Race
$app->post('/postrace', function() use ($app) {
    
    date_default_timezone_set('America/New_York');
    
    $db = db_connect();
    $request = (array) json_decode($app->request()->getBody());

    // Retrieve input values - put into local vars
    $workoutName = $request['workoutName'];
    $eventName= $request['eventName'];
    $today = date("Y-m-d H:i:s");
    $createdBy = $request['createdBy'];
    $type = $request['type'];

    try {
        // Prepare statement
        $stmt = $db->prepare("INSERT INTO Races (raceName, eventName, raceDate, createdBy, type) VALUES (?, ?, ?, ? , ?)");
        $stmt->bind_param("sssii", $workoutName, $eventName, $today, $createdBy, $type);
        $stmt->execute();
        $stmt->close();

        $lastId = $db->insert_id;

        // Send success code
        sendResponse(200, json_encode($lastId));
        
    } catch(PDOException $e) {
        // Send error code
        sendResponse(400, '. $e->getMessage() .');
    }
});

// POST Race
$app->post('/postrunnerinrace', function() use ($app) {
        
    $db = db_connect();
    $request = (array) json_decode($app->request()->getBody());

    // Retrieve input values - put into local vars
    $fkRaceID = $request['fkRaceID'];
    $fkRunnerID = $request['fkRunnerID'];

    try {
        // Prepare statement
        $stmt = $db->prepare("INSERT INTO RunnersInRace (fk_raceID, fk_runnerID) VALUES (?, ?)");
        $stmt->bind_param("ii", $fkRaceID, $fkRunnerID);
        $stmt->execute();
        $stmt->close();

        $lastId = $db->insert_id;
        $arr = array('runInRaceID' => $lastId, 'runnerID' => $fkRunnerID);

        // Send success code
        sendResponse(200, json_encode($arr));
        
    } catch(PDOException $e) {
        // Send error code
        sendResponse(400, '. $e->getMessage() .');
    }
});

// POST Team
$app->post('/teams', function() use ($app)  {
    
    $db = db_connect();
    $request = (array) json_decode($app->request()->getBody());
    
    // Retrieve input values - put into local vars
    $teamName = $request['teamName'];
    $fk_coachID = $request['fk_coachID'];
    $fk_schoolID = $request['fk_schoolID'];

    try {
        // Prepare statement
        $stmt = $db->prepare("INSERT INTO Teams (teamName, fk_coachID, fk_schoolID) VALUES (?,?,?)");
        $stmt->bind_param("sii", $teamName, $fk_coachID, $fk_schoolID);
        $stmt->execute();
        $stmt->close();

        $lastId = $db->insert_id;
        
        // Send success code
        sendResponse(200, json_encode($lastId));

    } catch(PDOException $e) {
        // Send error code
        sendResponse(400, '. $e->getMessage() .');
    }

    
});

// POST Team roster
$app->post('/teamroster', function() use ($app) {
    
    $db = db_connect();
    $request = (array) json_decode($app->request()->getBody());
    
    // Retrieve input values - put into local vars
    $fk_teamID = $request['fk_teamID'];
    $fk_runnerID = $request['fk_runnerID'];

    try {
        // Prepare statement
        $stmt = $db->prepare("INSERT INTO TeamRoster (fk_teamID, fk_runnerID) VALUES (?,?)");
        $stmt->bind_param("ii", $fk_teamID, $fk_runnerID);
        $stmt->execute();
        $stmt->close();
        
        // Send success code
        sendResponse(200, json_encode('Success'));

    } catch(PDOException $e) {
        // Send error code
        sendResponse(400, '. $e->getMessage() .');
    }

    
});

// GET Teams
$app->get('/myteams', function() {
        
        $db = db_connect();
        $result = array();
        $sql= "SELECT r.teamID, r.teamName, x.description AS stateName, s.description AS schoolName 
        FROM Teams r 
        JOIN Schools s ON s.id = r.fk_schoolID 
        JOIN States x ON x.id = s.fk_stateID"; 
        
        $r = $db->query($sql);
        while($team = $r->fetch_assoc()){
            
            $result[] = $team;
        }

        // return JSON encoded array
        echo json_encode($result);
});

// GET dmn_Schools
$app->get('/dmnSchools', function()  {
        
        $db = db_connect();  
        $result = array();
        $sql= "SELECT id, description FROM Schools"; 
        
        $r = $db->query($sql);
        while($domainVal = $r->fetch_assoc()){
            
            $result[] = $domainVal;
        }

        // return JSON encoded array
        echo json_encode($result);
});


// GET dmn_States
$app->get('/dmnStates', function() {
        
        $db = db_connect();  
        $result = array();
        $sql= "SELECT id, description FROM States"; 
        
        $r = $db->query($sql);
        while($domainVal = $r->fetch_assoc()){
            
            $result[] = $domainVal;
        }

        // return JSON encoded array
        echo json_encode($result);
});

// GET dmn_States
$app->get('/dmnGender', function() {
        
        $db = db_connect();  
        $result = array();
        $sql= "SELECT id, description FROM Gender"; 
        
        $r = $db->query($sql);
        while($domainVal = $r->fetch_assoc()){
            
            $result[] = $domainVal;
        }

        // return JSON encoded array
        echo json_encode($result);
});

// GET schools per state
$app->get('/dmnSchools/:id', function($id)  {
        
        $db = db_connect();  
        $result = array();
        $sql= "SELECT id, description FROM Schools WHERE fk_stateID = $id"; 

        $r = $db->query($sql);
        while($domainVal = $r->fetch_assoc()){
            
            $result[] = $domainVal;
        }

        // return JSON encoded array
        echo json_encode($result);
});


// GET schools per state
$app->get('/getprofile/:id', function($id)  {
        
        $db = db_connect();  
        $result = array();
        $sql= "SELECT a.firstName, a.lastName, b.description AS schoolName, c.description AS stateName FROM Runners a
               INNER JOIN Schools b ON a.fk_schoolID = b.id
               INNER JOIN States c ON b.fk_stateID = c.id
               WHERE a.runnerID = $id"; 

        $r = $db->query($sql);
        while($domainVal = $r->fetch_assoc()){
            
            $result[] = $domainVal;
        }

        // return JSON encoded array
        echo json_encode($result);
});

// GET races per coach
$app->get('/getracespercoach/:id', function($id)  {
        
        $db = db_connect();  
        $result = array();
        $sql = "SELECT raceID, raceName, raceDate                 
                FROM Races
                WHERE createdBy = $id";

        $r = $db->query($sql);
        while($domainVal = $r->fetch_assoc()){
            
            $result[] = $domainVal;
        }

        // return JSON encoded array
        echo json_encode($result);
});

// GET races per athlete
$app->get('/getraces/:id', function($id)  {
        
        $db = db_connect();  
        $result = array();
        //$sql= "SELECT raceDate, raceName FROM Races WHERE id = $id";
        $sql = "SELECT a.runInRaceID, b.raceDate, b.raceName, b.eventName, TIME(a.finishTime) AS finishTime
                 FROM RunnersInRace a 
                 INNER JOIN Races b ON a.fk_raceID = b.raceID 
                 WHERE a.fk_runnerID = $id";

        $r = $db->query($sql);
        while($domainVal = $r->fetch_assoc()){
            
            $result[] = $domainVal;
        }

        // return JSON encoded array
        echo json_encode($result);
});

// GET splits per race
$app->get('/getsplits/:id', function($id)  {
        
        $db = db_connect();  
        $result = array();
        $sql = "SELECT splitID, splitNumber AS splitIndex, TIME(splitTime) AS splitTime, fk_runInRaceID
                FROM Splits
                WHERE fk_runInRaceID = $id";

        $r = $db->query($sql);
        while($domainVal = $r->fetch_assoc()){
            
            $result[] = $domainVal;
        }

        // return JSON encoded array
        echo json_encode($result);
});

// GET splits per race
$app->get('/getrunnerswithsplits/:id', function($id)  {
        
        $db = db_connect();  
        $result = array();
        $sql = "SELECT a.runInRaceID, a.finishTime, splitNumber AS splitIndex, splitTime AS splitTime, c.firstName, c.lastName
                FROM RunnersInRace a
                INNER JOIN Splits b ON a.runInRaceID = b.fk_runInRaceID
                INNER JOIN Runners c ON a.fk_runnerID = c.runnerID
                WHERE a.fk_raceID = $id";

        $r = $db->query($sql);
        while($domainVal = $r->fetch_assoc()){
            
            $result[] = $domainVal;
        }

        // return JSON encoded array
        echo json_encode($result);
});

// GET runners per race
$app->get('/getruninrace/:id', function($id)  {
        
        $db = db_connect();  
        $result = array();
        $sql = "SELECT a.runInRaceID, c.raceID, c.raceDate, c.raceName, c.eventName, b.firstName, b.lastName, a.finishTime, b.runnerID
                FROM RunnersInRace a
                INNER JOIN Runners b ON b.runnerID = a.fk_runnerID
                INNER JOIN Races c ON c.raceID = a.fk_raceID
                WHERE fk_raceID = $id";

        $r = $db->query($sql);
        while($domainVal = $r->fetch_assoc()){
            
            $result[] = $domainVal;
        }

        // return JSON encoded array
        echo json_encode($result);
});

// GET runners per race
$app->get('/getrunnersperschool/:id', function($id)  {
        
        $db = db_connect();  
        $result = array();
        $sql = "SELECT a.runnerID, a.firstName, a.lastName, b.description AS schoolName, a.gender
                FROM Runners a
                INNER JOIN Schools b ON b.id = a.fk_schoolID
                WHERE a.fk_schoolID = $id"; 

        $r = $db->query($sql);
        while($domainVal = $r->fetch_assoc()){
            
            $result[] = $domainVal;
        }

        // return JSON encoded array
        echo json_encode($result);
});

// GET runners per race
$app->get('/getteamsperrunner/:id', function($id)  {
        
        $db = db_connect();  
        $result = array();
        $sql = "SELECT b.teamName, b.fk_coachID
                FROM TeamRoster a 
                INNER JOIN Teams b ON a.fk_teamID = b.teamID 
                WHERE a.fk_runnerID = 1";

        $r = $db->query($sql);
        while($domainVal = $r->fetch_assoc()){
            
            $result[] = $domainVal;
        }

        // return JSON encoded array
        echo json_encode($result);
});

// GET runners per coach
$app->get('/getteamspercoach/:id', function($id)  {
        
        $db = db_connect();  
        $result = array();
        $sql = "SELECT a.teamID, a.teamName, b.description AS schoolName
                FROM Teams a 
                INNER JOIN Schools b ON a.fk_schoolID = b.id
                WHERE a.fk_coachID = $id";

        $r = $db->query($sql);
        while($domainVal = $r->fetch_assoc()){
            
            $result[] = $domainVal;
        }

        // return JSON encoded array
        echo json_encode($result);
});

// GET runners per team
$app->get('/getrunnersperteam/:id', function($id)  {
        
        $db = db_connect();  
        $result = array();
        $sql = "SELECT a.runnerID, a.firstName, a.lastName
                FROM Runners a
                INNER JOIN TeamRoster b ON a.runnerID = b.fk_runnerID
                WHERE b.fk_teamID = $id"; 

        $r = $db->query($sql);
        while($domainVal = $r->fetch_assoc()){
            
            $result[] = $domainVal;
        }

        // return JSON encoded array
        echo json_encode($result);
});



$app->run();

?>