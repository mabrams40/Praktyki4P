function addOnLoadEvent(func){
    if(typeof window.onload != "function"){
        window.onload = func;
    }
    else{
        document.addEventListener('DOMContentLoaded', (e) => {
            func();
        });
    }
}
addOnLoadEvent(checkCookie)

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + 60*1000);//(exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cookieName) {
    let name = cookieName + "=";
    let decoded = decodeURIComponent(document.cookie);
    let cookiesArray = decoded.split(';');
    for(let i = 0; i <cookiesArray.length; i++) {
        let cookie = cookiesArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return false;
}

function checkCookie() {
    let visits = getCookie("visits");
    if (visits) {
        let footer = document.getElementsByTagName("footer")[0];
        footer.innerText += ` - your ${visits} visit here`;
        setCookie("visits", ++visits, 0);
    }
    else {
        setCookie("visits", 1, 0);
    }
}