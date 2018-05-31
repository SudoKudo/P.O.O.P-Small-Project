
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
		doShow("MainMenu");
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

	doShow("Login");
} // End doLogout function

// Select which elemen(s) are shown or hidden.
// hidden elements still remain on the page and can be targeted by other
// functions.
function hideOrShow(element, show=true, list=false){
  // Default is to show the element(s)
  var vis = "visible";
	var dis = "block";

  // To hide the element(s)
  if(!show){
    var vis = "hidden";
  	var dis = "none";
  }

  // The element is a class, so there will be a list of elements
  if(list){
    var elementList = document.getElementsByClassName(element)
    for (i = 0; i < elementList.length; i++) {
        elementList[i].style.visibility = vis;
        elementList[i].style.display = dis;
    }
  }

  // element is identified by ID
  else{
    document.getElementById(element).style.visibility = vis;
    document.getElementById(element).style.display = dis;
  }
  document.getElementById("addButton").style.visibility = "visible";
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
// Select which screen is shown.
function doShow(pageName){
  if(pageName == "Add"){
    hideOrShow("buttons", false, true);
    hideOrShow("contactInfo", true, true);
    hideOrShow("addUserButton", true, false);
    hideOrShow("homeButton", true, false);
  }
  else if(pageName == "MainMenu"){
    hideOrShow("sign-in", false, true);
    hideOrShow("buttons", false, true);
    hideOrShow("searchField", false, true);
    hideOrShow("contactInfo", false, true);
    hideOrShow("addButton", true, false);
    hideOrShow("searchButton", true, false);
    hideOrShow("logoutButton", true, false);
  }
  else if(pageName == "Register"){
    hideOrShow("fName", true, false);
    hideOrShow("lName", true, false);
    hideOrShow("userName", true, false);
    hideOrShow("passWord", true, false);
  }
  else if(pageName == "Search"){
    hideOrShow("buttons", false, true);
    hideOrShow("searchField", true, true);
    hideOrShow("homeButton", true, false);
    hideOrShow("viewButton", true, false);
  }
  else if(pageName == "View"){
    hideOrShow("buttons", false, true);
    hideOrShow("searchField", false, true);
    hideOrShow("contactInfo", true, true);
    hideOrShow("homeButton", true, false);
  }
  else if(pageName == "Login"){
    hideOrShow("buttons", false, true);
    hideOrShow("loginButton", true, false);
    hideOrShow("registerButton", true, false);
  }
} // End doShow function
