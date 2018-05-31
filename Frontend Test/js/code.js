function doLogin(){
  var userName = document.getElementById("userName").value;
  var passWord = document.getElementById("passWord").value;
  doShow("MainMenu");
}

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
    hideOrShow("sign-in", true, true);
    hideOrShow("loginButton", true, false);
    hideOrShow("registerButton", true, false);
  }
}

function doRegister(){
  doShow("Register");
}

function doAdd(){
  doShow("Add");
}

function doAddUser(){
  doShow("MainMenu");
}

function doView(){
  doShow("View");
}

function doSearch(){
  doShow("Search");
}

function doHome(){
  doShow("MainMenu");
}

function doLogout(){
  doShow("Login");
}

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
}
