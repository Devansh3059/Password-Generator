window.onload = function() {
  //dom elements
  var resultEL = document.getElementById("result");
  var lowercaseEL = document.getElementById("lowercase");
  var uppercaseEL = document.getElementById("uppercase");
  var numberEL = document.getElementById("number");
  var symbolEL = document.getElementById("symbol");
  var generateEL = document.getElementById("generate");
  var clipboardEL = document.getElementById("clipboard");
  var lengthEL = document.getElementById("length");

  generateEL.addEventListener("click", function() {
    const length = +lengthEL.value; //+ is used because typeof lengthEL.value returns string
    const hasLower = lowercaseEL.checked;
    const hasUpper = uppercaseEL.checked;
    const hasNumber = numberEL.checked;
    const hasSymbol = symbolEL.checked;

    resultEL.innerHTML = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
    // console.log(generatePassword())
  });

  function generatePassword(lower, upper, number, symbol,length) {
    var generatedPassword = "";
    const typesCount = lower + upper + number + symbol;
    // console.log(typesCount);

    // const typeArr = [lower, upper, number, symbol]
    // console.log(typeArr)
    //gives an array of true and false

    const typeArr = [{ lower }, { upper }, { number }, { symbol }].filter(
      item => Object.values(item)[0]
    );
    //console.log(typeArr);
    //gives an array of objects with value true and false
    //filters the values which are true

    if(typesCount == 0){
        return '';
    }
    else{  
        for(let i=0; i<length; i+=typesCount){
            typeArr.forEach(type => {
                const funcName = Object.keys(type)[0];
                // console.log(funcName);

                generatedPassword += randomFunc[funcName]();
                // console.log(generatedPassword.slice(0, length));
                //.slice is udes because when we give length 1, the output is of 4 characters because  i+=typesCount (if all 4 are checked)
            })
        }
        const finalPassword = generatedPassword.slice(0, length);
                return finalPassword;
    }
  }

  const randomFunc = {
    //object of all the functions
    lower:randomLower,
    upper:randomUpper,
    number:randomNumber,
    symbol:randomSymbol
  };
  function randomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }
  function randomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }
  function randomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10 + 48));
  }
  function randomSymbol() {
    var symbols = "!@#$%^&*(){}[]|~;:,.></?";
    return symbols[Math.floor(Math.random() * symbols.length)];
  }
  // console.log(randomLower()+randomNumber()+randomUpper()+randomSymbol());
};

//math.random gives a andom decimal number
