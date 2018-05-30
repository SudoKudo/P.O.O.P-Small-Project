
var urlBase = 'http://COP4331-3.com/LAMPAPI';
var extension = "php";

var userId = 0;
var firstName = "";
var lastName = "";

function doRegister()
{
 var firstName = document.getElementById("firstName").value; // Retrieve first name
 var lastName = document.getElementById("lastName").value; // Retrieve last name
 var uName = document.getElementById("uName").value; // Retrieve username
 var pWord = document.getElementById("pWord").value; // Retrieve password
 var eMail = document.getElementById("eMail").value; // Retrieve email
 
	// Convert to json string to pass to API
	var jsonPayload = '{"firstName" : "' + firstName + '", "lastName" : "' + lastName + '","uName" : "' + uName + '","pWord" : "' + pWord + '","eMail" : "' + eMail + '", "userId" : ' + userId + '}';
	console.log(jsonPayload);
	var url = urlBase + '/AddColor.' + extension; // Call API code
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}
}
// Login function in the main screen
function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	var login = document.getElementById("userName").value; // Takes in username from login
	var password = document.getElementById("passWord").value; // Takes in password
	
	document.getElementById("loginResult").innerHTML = "";
	
	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/Login.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		
		var jsonObject = JSON.parse( xhr.responseText );
		
		userId = jsonObject.id;
		
		if( userId < 1 )
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}
		
		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;

		document.getElementById("userName").innerHTML = firstName + " " + lastName;
		
		document.getElementById("loginName").value = "";
		document.getElementById("loginPassword").value = "";
		
		// Call hideOrShow Function
		hideOrShow( "loggedInDiv", true);
		hideOrShow( "accessUIDiv", true);
		hideOrShow( "loginDiv", false);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
	
} // End of the doLogin function

// Begin doLogout function 
function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";	

	hideOrShow( "loggedInDiv", false);
	hideOrShow( "accessUIDiv", false);
	hideOrShow( "loginDiv", true);
} // End doLogout function

// SPECIAL: Need to update
function hideOrShow( elementId, showState )
{
	var vis = "visible";
	var dis = "block";
	if( !showState )
	{
		vis = "hidden";
		dis = "none";
	}
	
	document.getElementById( elementId ).style.visibility = vis;
	document.getElementById( elementId ).style.display = dis;
} // End hideOrShow function

// Begin doAdd Function to add a contact you the contact manager
function doAdd()
{
	var fName = document.getElementById("fName").value; // Retrieve first name
	var lName = document.getElementById("lName").value; // Retrieve last name
	var addrOne = document.getElementById("addr1").value; // Retrieve first line of address
	var addrTwo = document.getElementById("addr2").value; // Retrieve second line of address
	var city = document.getElementById("city").value; // Retrieve city
	var state = document.getElementById("state").value; // Retrieve state
	var zip = document.getElementById("zip").value; // Retrieve zip code
	var phone = document.getElementById("phone").value; // Retrieve phone number
	var email = document.getElementById("email").value; // Retrieve email address
	//document.getElementById("colorAddResult").innerHTML = "";
	
	// Convert to json string to pass to API
	var jsonPayload = '{"fName" : "' + fName + '", "lName" : "' + lName + '","addr1" : "' + addrOne + '","addr2" : "' + addrTwo + '","city" : "' + city + '","state" : "' + state + '", "zip" : "' + zip + '","phone" : "' + phone + '","email" : "' + email + '","userId" : ' + userId + '}';
	var url = urlBase + '/AddColor.' + extension; // Call API code
	
	/*
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}
	*/
} // End doAdd function

// Begind doDelete function to delete a contact in the contact manager
function doDelete()
{
	
} // End doDelete function

// Begin doSearch function to search for a contact in the database
function doSearch()
{
	var srch = document.getElementById("searchName").value;
	document.getElementById("colorSearchResult").innerHTML = "";
	
	var nameList = document.getElementById("nameList");
	nameList.innerHTML = "";
	
	var jsonPayload = '{"search" : "' + srch + '"}';
	var url = urlBase + '/SearchColors.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				hideOrShow( "colorList", true );
				
				document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				var jsonObject = JSON.parse( xhr.responseText );
				
				var i;
				for( i=0; i<jsonObject.results.length; i++ )
				{
					var opt = document.createElement("option");
					opt.text = jsonObject.results[i];
					opt.value = "";
					colorList.options.add(opt);
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}
	
} // End doSearch Function

// Begind doShow function show a contact from the search function
function doShow()
{
	
} // End doShow function