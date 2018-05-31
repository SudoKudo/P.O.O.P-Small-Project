function doLogin(){
  doShow("MainMenu");
}

// Select which screen is shown.
function doShow(pageName){
  if(pageName == "Add"){
    hideOrShow("buttons", false, true);
    hideOrShow("contactInfo", true, true);
    hideOrShow("buttonBreak")
    hideOrShow("addUserButton");
    hideOrShow("homeButton");
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
  }
  else if(pageName == "Register"){
    hideOrShow("buttons", false, true);
    hideOrShow("sign-in", true, true);
    hideOrShow("register", true, true);
    hideOrShow("buttonBreak")
    hideOrShow("logoutButton");
  }
  else if(pageName == "Search"){
    hideOrShow("buttons", false, true);
    hideOrShow("searchField", true, true);
    hideOrShow("buttonBreak")
    hideOrShow("homeButton");
    hideOrShow("viewButton");
  }
  else if(pageName == "View"){
    hideOrShow("buttons", false, true);
    hideOrShow("searchField", false, true);
    hideOrShow("contactInfo", true, true);
    hideOrShow("buttonBreak")
    hideOrShow("homeButton");
  }
  else if(pageName == "Login"){
    hideOrShow("buttons", false, true);
    hideOrShow("sign-in", true, true);
    hideOrShow("register", false, true);
    hideOrShow("buttonBreak")
    hideOrShow("loginButton");
    hideOrShow("registerButton");
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
	var dis = "block";

  // To hide the element(s)
  if(!show){
  	var dis = "none";
  }

  // The element is a class, so there will be a list of elements
  if(list){
    var elementList = document.getElementsByClassName(element)
    for (i = 0; i < elementList.length; i++) {
        elementList[i].style.display = dis;
    }
  }

  // element is identified by ID
  else{
    document.getElementById(element).style.display = dis;
  }
}
