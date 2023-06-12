function btnClickHandler() {

    console.log("btn clicked");
    var name = document.getElementById("name");
  
    if (name.value === "minal") {
        
      name.classList.add("green");
      name.classList.remove("red");
      document.getElementById("nameCheck").innerHTML=""
    } else if (name.value === "")
    {
      name.classList.add("red");
      document.getElementById("nameCheck").innerHTML="*enter name"
    }
    else {
        
      name.classList.add("red");
      document.getElementById("nameCheck").innerHTML="username not found"
    }
   
    var password = document.getElementById("password");
  if (password.value === "123") {
      
      password.classList.add("green");
      password.classList.remove("red");
      document.getElementById("passwordCheck").innerHTML=""
    } else if (password.value === "")
    { 
      password.classList.add("red");
      document.getElementById("passwordCheck").innerHTML="*enter password"
    }
    else {
        
      password.classList.add("red");
      document.getElementById("passwordCheck").innerHTML="invalid paswword"
    }   
      
    
}
  

