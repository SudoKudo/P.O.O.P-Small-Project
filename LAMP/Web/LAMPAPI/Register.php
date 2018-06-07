<?php
	$inData = getRequestInfo();
        
        $userName = $inData["uName"];
        $password = $inData["pWord"];


	$conn = new mysqli("fdb21.awardspace.net", "2738589_webapp", "Webdev999", "2738589_webapp");
	
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
        //User prepare statement to protect against sql injection attacks
		$stmt = $conn->prepare("INSERT INTO UserInfo (UserName,Password) VALUES (?, ?)");
        $stmt->bind_param("ss", $userName, $password);
                
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