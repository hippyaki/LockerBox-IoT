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



class PinLogin {
    constructor ({el, maxNumbers = Infinity}) {
        this.el = {
            main: el,
            numPad: el.querySelector(".pin-login__numpad"),
            textDisplay: el.querySelector(".pin-login__text") };

        
        this.maxNumbers = maxNumbers;
        this.value = "";

        this._generatePad();
    }

    _generatePad() {
        const padLayout = [
            "1", "2", "3",
            "4", "5", "6",
            "7", "8", "9",
            "backspace", "0", "done"
        ];

        padLayout.forEach(key => {
            const insertBreak = key.search(/[369]/) !== -1;
            const keyEl = document.createElement("div");

            keyEl.classList.add("pin-login__key");
            keyEl.classList.toggle("material-icons", isNaN(key));
            keyEl.textContent = key;
            keyEl.addEventListener("click", () => { this._handleKeyPress(key) });
            this.el.numPad.appendChild(keyEl);

            if (insertBreak) {
                this.el.numPad.appendChild(document.createElement("br"));
            }
        });
    }

    _handleKeyPress(key) {
        switch (key) {
            case "backspace":
                this.value = this.value.substring(0, this.value.length - 1);
                break;
            case "done":
                this._attemptLogin();
                break;
            default:
                if (this.value.length < this.maxNumbers && !isNaN(key)) {
                    this.value += key;

                    this.el.textDisplay.classList.remove("pin-error");
                }
                break;
        }

        this._updateValueText();
    }

    _updateValueText() {
        this.el.textDisplay.value = "_".repeat(this.value.length);
        
    }

    _attemptLogin() {
        if (this.value.length > 0) {
            this.validate();
        }
    }

    validate(){
        
        var password = this.value;

        const pass=this.hashCode(password);

        const pin1="xxxxxxx"// replace with the hashed output of '1245' or whatever pin you require
        
        const url = "openbox.html"

        if (pass==pin1){         
            
            window.sessionStorage.setItem("AuthenticationState", "Authenticated");
            servoWrite(4, 140);

            setTimeout(relocate, 1000);
            function relocate(){
                window.location.href = url;
            }
            return false;
        }
         
        else{
            this.el.textDisplay.classList.add("pin-error");
            this.value = ""
        }
    }
    

    function hashCode(pin) {
        var hash = 0, i, chr;
        if (pin.length === 0){ 
            return hash;
        }
        for (i = 0; i < pin.length; i++) {
            chr = pin.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };

    // ******* NOTE ********

    var pin = hashCode("1245");// you will get hashed integer of the number '1245'
    console.log(pin);
    
    // ONCE THE PIN IS GENERATED, AND PASTED ON THE validate() function above, REMOVE THIS NOTE !!


    // *********************
}

new PinLogin({
    el: document.getElementById("mainPinLogin"),

    maxNumbers: 4
    
});

