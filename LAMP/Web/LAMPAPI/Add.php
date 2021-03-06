<?php
	$inData = getRequestInfo();

	$fName = $inData["fName"];
	$lName = $inData["lName"];
        $addrOne = $inData["addrOne"];
	$addrTwo = $inData["addrTwo"];
        $city = $inData["city"];
	$state = $inData["state"];
        $zip = $inData["zip"];
        $phone = $inData["phone"];
	$email = $inData["email"];

        $userId = $inData["userId"];

	$conn = new mysqli("fdb21.awardspace.net", "2738589_webapp", "Webdev999", "2738589_webapp");

	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
                //Use prepare statement to protect against sql injection attacks
		$stmt = $conn->prepare("INSERT INTO Contact (FirstName,LastName,Address1,Address2,City,State,Zip,PhoneNumber,Email,UserID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->bind_param("ssssssissi", $fName, $lName, $addrOne, $addrTwo, $city, $state, $zip, $phone, $email, $userId);
                
                $stmt->execute();
                
                $result = $stmt->get_result();
                
		if( $result != TRUE )
		{
			returnWithError( $conn->error );
		}

		$conn->close();
	}

	returnWithError("");

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-Type: application/json');
                echo json_encode($obj);
	}

	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>