/*
Credit Card Input

Description:

Implement a credit card input that accepts numerical inputs between length 12 and 16. See acceptance criteria for additional requirements.

Acceptance criteria:

* only accept values of length 12 - 16 inclusive
* cannot type more than 16 characters
* can only type numbers
* implement Luhn Check




Thought process:
Err Message : "Please enter Valid Card Number"

State:
 cardNumber and setCasrdNumber


Number(9999999999999999)

1 Input 
    type: number is it Number or String?
    min: 12
    max: 16
    99999999999...16

    onChange: handler
    validate fn input 
          cardNumber <=0 return false
          cardNumber < 12 return false
          cardNumber > 16 return false

          REGEX:
          /d/gi
          /[0-9]/gi
          
          
          6.28e23

          isNumber(cardNumber)
          00000000000
          00000000001
          -123
          3.14
          6.28e23
    




str.match(/d/gi)
/d/gi.test(str)

*/

/** 
Attention:
1. Card Number should be length 12-16
2. Card Number should be numerical 
3. Card Number should be Luhn Valid
4. Card Number should not be empty
5. Card Number should not be more than 16 digits
6. Card Number should not be less than 12 digits
7. Card Number should not have any special char
8. onBlur cardnumber is validated, to avoid error message while user typing
*/

import React, { useState } from "react";

function checkLuhn(cardNo) {
  let nDigits = cardNo.length;

  let nSum = 0;
  let isSecond = false;
  for (let i = nDigits - 1; i >= 0; i--) {
    let d = cardNo[i].charCodeAt() - "0".charCodeAt();

    if (isSecond == true) d = d * 2;

    // We add two digits to handle
    // cases that make two digits
    // after doubling
    nSum += parseInt(d / 10, 10);
    nSum += d % 10;

    isSecond = !isSecond;
  }
  return nSum % 10 == 0;
}

export default function App() {
  const [cardNumber, setCardNumber] = useState("");
  const [errMessage, setErrMessage] = useState(false);

  function handleChange(e) {
    let str = e.target.value;

    setErrMessage(false); //reset errMessage
    /*clear error once user starts typing, onBlur provide error <12 */

    str = str.replace(/\D/gi, ""); //if user paste code, then replace

    /*If user paste invalid char then just removing last char will not satify all conditions */

    /*This will work if user doesnot copy/paste anything */
    //NO MATCH; returns null
    //if all digits match return ['123', index: 0, input: '123', groups: undefined]
    //if (!str.match(/^\d+$/))  str = str.slice(0, str.length - 1);

    if (str.length > 16) {
      str = str.slice(0, 16);
    }

    setCardNumber(str);
  }

  function generateMessage() {
    if (
      cardNumber.length > 0 &&
      cardNumber.length < 12 &&
      checkLuhn(cardNumber) == false
    ) {
      setErrMessage(true);
    }
  }

  return (
    <main>
      React ⚛️ + Vite ⚡ + Replit
      <div>
        <input
          type="text"
          name="card"
          value={cardNumber}
          onChange={(e) => handleChange(e)}
          onBlur={() => generateMessage()}
        />
      </div>
      {errMessage && "Please enter Valid Card Number"}
    </main>
  );
}
