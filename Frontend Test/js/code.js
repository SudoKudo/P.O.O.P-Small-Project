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
    document.getElementById("pageName").innerHTML = "Add User";
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
    document.getElementById("pageName").innerHTML = "Database Title";
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
	var dis = "inline";

  // To hide the element(s)
  if(!show){
  	var dis = "none";
  }

  // The element is a class, so there will be a list of elements
  if(list){
    var elementList = document.getElementsByClassName(element)
    for (i = 0; i < elementList.length; i++) {
        elementList[i].style.display = dis;
        if (show){
          elementList[i].style.display = "grid";
        }
    }
  }

  // element is identified by ID
  else{
    document.getElementById(element).style.display = dis;
    if (show){
      document.getElementById(element).style.display = "inline-grid";
    }
  }
}

function doSecret(){
  document.body.style.backgroundImage ="url('images/easteregg.png')";
  document.getElementById("pageName").style.fontSize = "80px";
  document.getElementById("pageName").style.textShadow = "2px 2px white";
  document.getElementsByClassName("middle")[0].style.backgroundColor = "pink";
}
