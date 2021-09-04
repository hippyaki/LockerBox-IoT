function servoWrite(pin,val) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState != 4 || xmlhttp.status != 200) {
            return;
        }
        //alert(xmlhttp.responseText);
        var obj = JSON.parse(xmlhttp.responseText);
        if(obj.success=="1"){
             //alert(obj.value);
        }
    };
    const api_key="XXXXX-XXXXX-XXXXXX-XXXXXX-XXXXXXX"
    const d_name="BOLTXXXXXXX"
    const base_url = "https://cloud.boltiot.com/remote/"

    xmlhttp.open("GET",base_url+api_key+"/servoWrite?pin="+pin+"&value="+val+"&deviceName="+d_name,true);
    xmlhttp.send();
}  

function closebox(){
        

        servoWrite(4, 40);
        
        window.sessionStorage.removeItem("AuthenticationState");
        //alert("yeah");
        setTimeout(relocate, 1000);
        function relocate(){
            window.location.href = "index.html";
        }
  
}
