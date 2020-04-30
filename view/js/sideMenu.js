// side menu navigator 
function openNav() {
    document.getElementById("mySidebar").style.width = "300px";
    document.getElementById("sideMenu").style.marginLeft = "250px";
     //   document.getElementById("search_text");
     document.getElementById('iframe').contentWindow.location.reload();

 
}
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("sideMenu").style.marginLeft = "0";

}


