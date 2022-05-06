window.onload = getHome();
function getListWifi(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        document.getElementById('main').innerHTML = this.responseText;
        }
    };
    xhttp.open('GET', '/list-wifi',true);
    xhttp.send();
}