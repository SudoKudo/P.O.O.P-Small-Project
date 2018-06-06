var urlBase = 'http://m4rks.site/LAMPAPI';
var extension = "php";

var userId = 0;

function doRegister()
{

  var uName = document.getElementById("userName").value; // Retrieve username
  var pWord = document.getElementById("passWord").value; // Retrieve password

  var hashpass = sha1(pWord); // Encrypt the password

  // Convert to json string to pass to API
  var jsonPayload = '{"uName" : "' + uName + '","pWord" : "' + hashpass + '", "userId" : "' + userId + '"}';
  var url = urlBase + '/Register.' + extension; // Call API code

  console.log(url);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  try
  {
    xhr.onreadystatechange = function()
    {
      if (this.readyState == 4 && this.status == 200)
      {
        document.getElementById("loginResult").innerHTML = "User has been added!";
      }
    };
    xhr.send(jsonPayload);
  }
  catch(err)
  {
    document.getElementById("loginResult").innerHTML = "Unable to add user";
  }


}
// Login function in the main screen
function doLogin()
{
  userId = 0;

  var login = document.getElementById("userName").value; // Takes in username from login
  var password = document.getElementById("passWord").value; // Takes in password

  var hashpass = sha1(password); // Encrypt the password

  document.getElementById("loginResult").innerHTML = "";

  var jsonPayload = '{"login" : "' + login + '", "password" : "' + hashpass + '"}';
  var url = urlBase + '/Login.' + extension;

  var xhr = new XMLHttpRequest();
        
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try
  {
    xhr.send(jsonPayload);

    var jsonObject = JSON.parse( xhr.responseText );

    userId = jsonObject.UserID;

    if( userId < 1 )
    {
      document.getElementById("loginResult").innerHTML = "Inncorrect Username/Password";
      return;
    }

    login = jsonObject.UserName;
    password = jsonObject.Password;

    // Call hideOrShow Function
    doShow("MainMenu");
  }
  catch(err)
  {
    document.getElementById("loginResult").innerHTML = "Incorrect Username/Password";
  }

} // End of the doLogin function

// View function
function doView()
{
        
        //Get first and last name of contact to view
  var firstName = document.getElementById("").value; // Takes in firstName from UI
  var lastName = document.getElementById("").value; // Takes in lastName from UI

  //document.getElementById("").innerHTML = "";

  var jsonPayload = '{"UserId" : "' + userId + '", "FirstName" : "' + firstName + '", "LastName" : "' + lastName + '"}';
  var url = urlBase + '/View.' + extension;

  var xhr = new XMLHttpRequest();
        
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try
  {
    xhr.send(jsonPayload);

    var jsonObject = JSON.parse( xhr.responseText );

                //Get contact information from jsonObject
    var resultsCheck = jsonObject.UserID;
                var FirstName = jsonObject.FirstName;
                var LastName = jsonOjbect.LastName;
                var Address1 = jsonObject.Address1;
                var Address2 = jsonObject.Address2;
                var City = jsonObject.City;
                var State = jsonObject.State;
                var Zip = jsonObject.Zip;
                var PhoneNumber = jsonObject.PhoneNumber;
                var Email = jsonObject.Email;

    if( resultsCheck == 0 )
    {
      document.getElementById("").innerHTML = "No results";
      return;
    }
                
    //Add information to UI
    
  }
  catch(err)
  {
    document.getElementById("").innerHTML = "An error occured";
  }

} // End of the View function

// Begin doLogout function
function doLogout()
{
  userId = 0;
  userName = "";
  passWord = "";

  document.getElementById("userName").value = userName;
  document.getElementById("passWord").value = passWord;

  doShow("Login");
} // End doLogout function

// Select which element(s) are shown or hidden.
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
    doShow("Add");
}

function doAddUser()
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
        
        //Validate Input
        var invalidInput = "";
        if(zip.replace(/\s/g, '').length)
        {
                if((/^\d+$/.test(zip)) == false)
                {
                        invalidInput = "Invalid zip";
                        console.log("Invalid zip");
                }
        }
        if(!lName.replace(/\s/g, '').length)
        {
                invalidInput = "Invalid Last Name";
                console.log("Invalid first name");
        }
        if(!fName.replace(/\s/g, '').length)
        {
                invalidInput = "Invalid First Name";
                console.log("Invalid last name");
        }
        
        
  document.getElementById("loginResult").innerHTML = invalidInput;
        
        if(invalidInput == "")
        {
                // Convert to json string to pass to API
                var jsonPayload = '{"fName" : "' + fName + '","lName" : "' + lName + '","addrOne" : "' + addrOne + '","addrTwo" : "' + addrTwo + '","city" : "' + city + '","state" : "' + state + '","zip" : "' + zip + '","phone" : "' + phone + '","email" : "' + email + '","userId" : "' + userId + '"}';
                var url = urlBase + '/Add.' + extension; // Call API code

                console.log(jsonPayload);

                var xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
                try
                {
                        xhr.onreadystatechange = function()
                        {
                                if (this.readyState == 4 && this.status == 200)
                                {
                                        document.getElementById("loginResult").innerHTML = "Contact has been added!";
                                        
                                        //Clear form after contact was successfully added
                                          document.getElementById("fName").value = "";
                                          document.getElementById("lName").value = "";
                                          document.getElementById("addr1").value = "";
                                          document.getElementById("addr2").value = "";
                                          document.getElementById("city").value = "";
                                          document.getElementById("state").value = "";
                                          document.getElementById("zip").value = "";
                                          document.getElementById("phone").value = "";
                                          document.getElementById("email").value = "";
                                }
                        };
                        xhr.send(jsonPayload);
                }
                catch(err)
                {
                        document.getElementById("loginResult").innerHTML = err.message;
                }
                
        }//End of invalidInput if statement
        
} // End doAdd function

// Begin doDelete function to delete a contact in the contact manager
function doDelete()
{

} // End doDelete function

// Begin doSearch function to search for a contact in the database
function doSearch()
{
  var srch = document.getElementById("searchName").value;
  //document.getElementById("loginResult").innerHTML = "";

  var nameList = document.getElementById("nameList");
  //nameList.innerHTML = "";

  var jsonPayload = '{"search" : "' + srch + '"}';
  var url = urlBase + '/Search.' + extension;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
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
    //document.getElementById("loginResult").innerHTML = err.message;
  }

} // End doSearch Function

// Returns to Main Menu from any view while logged in.
function doHome(){
  document.getElementById("loginResult").innerHTML = "";
  doShow("MainMenu");
}

// Begind doShow function show a contact from the search function
// Select which screen is shown.
function doShow(pageName){
  if(pageName == "Add"){
    hideOrShow("buttons", false, true);
    hideOrShow("contactInfo", true, true);
    hideOrShow("buttonBreak")
    hideOrShow("addUserButton");
    hideOrShow("homeButton");
    document.getElementById("pageName").innerHTML = "Add Contact";
  }
  else if(pageName == "MainMenu"){
    hideOrShow("sign-in", false, true);
    hideOrShow("buttons", false, true);
    hideOrShow("searchField", false, true);
    hideOrShow("contactInfo", false, true);
    hideOrShow("buttonBreak", false);
    hideOrShow("addButton");
    hideOrShow("searchButton");
    hideOrShow("logoutButton");
    document.getElementById("pageName").innerHTML = "Main Menu";
  }
  else if(pageName == "Register"){
    hideOrShow("buttons", false, true);
    hideOrShow("sign-in", true, true);
    hideOrShow("register", true, true);
    hideOrShow("buttonBreak")
    hideOrShow("logoutButton");
    document.getElementById("pageName").innerHTML = "Register";
  }
  else if(pageName == "Search"){
    hideOrShow("buttons", false, true);
    hideOrShow("searchField", true, true);
    hideOrShow("buttonBreak")
    hideOrShow("homeButton");
    hideOrShow("viewButton");
    document.getElementById("pageName").innerHTML = "Search Contacts";
  }
  else if(pageName == "View"){
    hideOrShow("buttons", false, true);
    hideOrShow("searchField", false, true);
    hideOrShow("contactInfo", true, true);
    hideOrShow("buttonBreak")
    hideOrShow("homeButton");
    document.getElementById("pageName").innerHTML = "Contact Info";
  }
  else if(pageName == "Login"){
    hideOrShow("buttons", false, true);
    hideOrShow("sign-in", true, true);
    hideOrShow("register", false, true);
    hideOrShow("buttonBreak")
    hideOrShow("loginButton");
    hideOrShow("registerButton");
    document.getElementById("pageName").innerHTML = "Contact Manager";
  }
} // End doShow function

// Begin sha1 encryption method to encrypt the password, credit to Ashwin Ramaswami from stackexchange
function sha1(msg)
{
  function rotl(n,s) { return n<<s|n>>>32-s; };
  function tohex(i) { for(var h="", s=28;;s-=4) { h+=(i>>>s&0xf).toString(16); if(!s) return h; } };

  var H0=0x67452301, H1=0xEFCDAB89, H2=0x98BADCFE, H3=0x10325476, H4=0xC3D2E1F0, M=0x0ffffffff;
  var i, t, W=new Array(80), ml=msg.length, wa=new Array();
  msg += String.fromCharCode(0x80);
  while(msg.length%4) msg+=String.fromCharCode(0);
  for(i=0;i<msg.length;i+=4) wa.push(msg.charCodeAt(i)<<24|msg.charCodeAt(i+1)<<16|msg.charCodeAt(i+2)<<8|msg.charCodeAt(i+3));
  while(wa.length%16!=14) wa.push(0);
  wa.push(ml>>>29),wa.push((ml<<3)&M);
  for( var bo=0;bo<wa.length;bo+=16 ) {
    for(i=0;i<16;i++) W[i]=wa[bo+i];
    for(i=16;i<=79;i++) W[i]=rotl(W[i-3]^W[i-8]^W[i-14]^W[i-16],1);
    var A=H0, B=H1, C=H2, D=H3, E=H4;
    for(i=0 ;i<=19;i++) t=(rotl(A,5)+(B&C|~B&D)+E+W[i]+0x5A827999)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
    for(i=20;i<=39;i++) t=(rotl(A,5)+(B^C^D)+E+W[i]+0x6ED9EBA1)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
    for(i=40;i<=59;i++) t=(rotl(A,5)+(B&C|B&D|C&D)+E+W[i]+0x8F1BBCDC)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
    for(i=60;i<=79;i++) t=(rotl(A,5)+(B^C^D)+E+W[i]+0xCA62C1D6)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
    H0=H0+A&M;H1=H1+B&M;H2=H2+C&M;H3=H3+D&M;H4=H4+E&M;
  }
  return tohex(H0)+tohex(H1)+tohex(H2)+tohex(H3)+tohex(H4);
} // End sha1 function

function doSecret(){
  document.body.style.backgroundImage ="url('images/easteregg.png')";
  document.getElementsByClassName("middle")[0].style.backgroundColor = "pink";
}