var darkModeButton = document.getElementById("darkModeButton");
let darkModeToggled = false;

darkModeButton.onclick = function(){
    darkModeToggled = !darkModeToggled;
    if (darkModeToggled == true){
        document.body.className += " dark-mode";
    } 
    else{ 
        document.body.className -= " dark-mode"; // Note this is horrible practice and I apologize to my future self for this - 1/18/2026
    }
}