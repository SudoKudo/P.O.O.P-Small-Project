<?php

	$inData = getRequestInfo();

	$id = 0;
	$FirstName = "";
	$LastName = "";
	$Address1 = "";
	$Address2 = "";
	$City = "";
	$State = "";
	$Zip = "";
	$PhoneNumber = "";
	$Email = "";

	$conn = new mysqli("fdb21.awardspace.net", "2738589_webapp", "Webdev999", "2738589_webapp");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "SELECT UserID,FirstName,LastName,Address1,Address2,City,State,Zip,PhoneNumber,Email FROM UserInfo where UserID='" . $inData["UserId"] . "' and FirstName='" . $inData["FirstName"] . "' and LastName='" . $inData["LastName"] . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
			$id = $row["UserID"];
			$FirstName = $row["FirstName"];
			$LastName = $row["LastName"];
			$Address1 = $row["Address1"];
			$Address2 = $row["Address2"];
			$City = $row["City"];
			$State = $row["State"];
			$Zip = $row["Zip"];
			$PhoneNumber = $row["PhoneNumber"];
			$Email = $row["Email"];
			
		}
		else
		{
			returnWithError( "No Records Found" );
		}
		$conn->close();
	}

	returnWithInfo($userName, $password, $id );

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError( $err )
	{
		$retValue = '{"UserID":0,"FirstName":"","LastName":"","Address1":"","Address2":"","City":"","State":"","Zip":"","PhoneNumber":"","Email":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $username, $password, $id )
	{
		$retValue = '{"UserID":' . $id . ',"FirstName":"' . $FirstName . '","LastName":"' . $LastName . ',"Address1":"' . $Address1 . ',"Address2":"' . $Address2 . ',"City":"' . $City . ',"State":"' . $State . ',"Zip":"' . $Zip . ',"PhoneNumber":"' . $PhoneNumber . ',"Email":"' . $Email . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>