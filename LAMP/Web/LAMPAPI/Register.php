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
		$sql = "INSERT INTO UserInfo (UserName,Password) VALUES ('" . $userName . "','" . $password . "')";
                $conn->query($sql);
                $result = $conn->query($sql);
               
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