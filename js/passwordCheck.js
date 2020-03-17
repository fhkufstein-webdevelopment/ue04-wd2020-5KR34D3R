function PasswordChecker(wrapperId, passwordInputFieldId, passwordSubmitButtonId) {

    //following are attributes which could be seen as "constants"
    this.successClass = "success";
    this.warningClass = "warning";
    this.errorClass = "error";

    this.minLength = 8; //this is what we defined and what we need to consider in our length check

    //this attributes are set with our constructor
    this.wrapperField = document.getElementById(wrapperId);
    this.passwordField = document.getElementById(passwordInputFieldId);
    this.passwordSubmitButton = document.getElementById(passwordSubmitButtonId);


    var that = this; //a trick because this is a keyword and means different things in a new context! Especially when you work with events or if you call functions outside your class "this" won't mean you!

    //TODO start
    //now for the events which should fire:
    //if we leave the password field (focus is lost) - JavaScript Method "onblur" for an input field in our case the field this.passwordField
    this.passwordField.addEventListener("mouseout", function(){ // ist wenn man herausfährt, ohne dass man darauf geclickt hat
       that.check();
    });
    this.passwordField.addEventListener("focusout",function () { // ist wenn man darauf geclickt hat und danach woanders hinclickt
        that.check();
    });
    //if we enter the password field (focus is set) - JavaScript Method "onfocus" for an input field - again in our case the field this.passwordField
    this.passwordField.addEventListener("mouseenter",function () { // ist wenn die maus hineinfährt
        that.check();
    });
    this.passwordField.addEventListener("focusin", function () { // ist wenn mit der Maus in die Inputbox geclickt wird
        that.check();
    });
    //if we are in the password field an enter text - JavaScript Method "onkeyup" or "onkeup" - again in our case the field this.passwordField
    this.passwordField.addEventListener("keyup",function () { // ist wenn eien Taste geruckt wird // immer wieder
        that.check();
    });
    this.passwordField.addEventListener("keydown", function () { // ist wenn die gedrückte Taste losgelassen wird // 1mal
        that.check();
    })
    //if we try to click the submit button - JavaScript Method "onclick" - in our case this.passwordSubmitButton
    this.passwordSubmitButton.addEventListener("click",function () { // ist wenn auf den button gelickt wird.
        that.check();
    });

    this.passwordField.onblur = function() {
        //the keyword "this" is always referring to its context.
        //onblur is an event which happens in "passwordField" -> so the keyword "this" would refer to the passwordField NOT to our class
        //therefore we previously saved "this" in a variable called "that"
        that.check();
    };

    //TODO implement the other events in the exact same way!
    /*
    Im oberen bereich deklariert
    this.passwordField.onmouseout = function () {that.check();};
    this.passwordField.onmouseenter = function () {that.check();};
    this.passwordField.onkeydown = function () {that.check();};
    this.passwordField.onkeyup = function () {that.check();};
    */


    //TODO end

    this.check = function() {
        //we can only check if every field which with given Id exists
        //one of them would be null if one Id wouldn't exist therefore following statement would fail
        if(this.wrapperField && this.passwordField && this.passwordSubmitButton) {

            var longEnough = this.checkForLength();
            var hasSpecialChars = this.checkForSpecialCharacters();

            //if it is long enough and has a special character - everything is fine
            if(longEnough && hasSpecialChars) {
                this.wrapperField.className = this.successClass;
                this.passwordSubmitButton.disabled = false;
            } else if(!hasSpecialChars && longEnough) { //if it is long enough but it has no special character set class warning
                this.wrapperField.className = this.warningClass;
                this.passwordSubmitButton.disabled = true;
            } else { //if it is not long enough set class error
                this.wrapperField.className = this.errorClass;
                this.passwordSubmitButton.disabled = true;
            }


        } else {
            //obviously a field is null (we weren't able to find it)
            console.error("A Id given to PasswordChecker doesn't exist!");

            //one could improve this by telling the Developer which Id(s) are null...
        }
    };

    /*
    This method should return true if the length of passwordField value is greater or equal to this.minLength
     */
    this.checkForLength = function() {
        //@todo
        if(this.passwordField.value.length >= this.minLength){
            return true;
        }else{
            return false;
        }
        //have a look at javascript string methods and properties
        //return true; //this needs to be replaced!
    };

    /*
    This method returns true if no special Character "!§$_.:,;" is found in this.password - otherwise false
     */
    this.checkForSpecialCharacters = function() {
        //@todo
        var regex = /[!§$_.:,;]/; // wird escapted /[ ]/ und in ein array gepackt
        if(this.passwordField.value.match(regex)){
            return true;
        }else{
            return false;
        }
        //have a look at javascript string methods and properties
        //you could probably "match" it somehow
        //return true; //this needs to be replaced!
    };
}


