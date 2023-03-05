let inputEl = document.querySelector("#password");
let passwordLength = 16;

const upperCaseCheckEl = document.querySelector("#uppercase-check");
const numbersCheckEl = document.querySelector("#numbers-check");
const symbolsCheckEl = document.querySelector("#symbol-check");

const bar = document.querySelector("#security-indicator-bar");

const generatePassword = () => {
  let chars = "abcdefghjklmnpqrstuvwxz";

  const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXZ";
  const numbersChars = "123456789";
  const symbolsChars = "?!@&*()[]";

  if (upperCaseCheckEl.checked) {
    chars += upperCaseChars;
  }
  if (numbersCheckEl.checked) {
    chars += numbersChars;
  }
  if (symbolsCheckEl.checked) {
    chars += symbolsChars;
  }

  let password = "";

  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);

    password += chars.substring(randomNumber, randomNumber + 1);
  }

  inputEl.value = password;
  calculateQuality();
  calculateFontSize();
};

function calculateQuality() {
  const percent = Math.round(
    (passwordLength / 64) * 25 +
      (upperCaseCheckEl.checked ? 15 : 0) +
      (numbersCheckEl.checked ? 25 : 0) +
      (symbolsCheckEl.checked ? 35 : 0)
  );

  bar.style.width = `${percent}%`;

  if (percent > 69) {
    bar.classList.remove("critical");
    bar.classList.remove("warning");
    bar.classList.add("safe");
  } else if (percent > 50) {
    bar.classList.remove("critical");
    bar.classList.remove("safe");
    bar.classList.add("warning");
  } else {
    bar.classList.remove("warning");
    bar.classList.remove("safe");
    bar.classList.add("critical");
  }

  if(percent >= 100){
    bar.classList.add("completed");
  }else{
    bar.classList.remove("completed");
  }
}

function calculateFontSize(){
  if(passwordLength > 45){
    inputEl.classList.remove("font-sm");
    inputEl.classList.remove("font-xs");
    inputEl.classList.add("font-xxs");
  }else if(passwordLength > 32) {
    inputEl.classList.remove("font-sm");
    inputEl.classList.add("font-xs");
    inputEl.classList.remove("font-xxs");
  }else if(passwordLength > 22 ){
    inputEl.classList.add("font-sm");
    inputEl.classList.remove("font-xs");
    inputEl.classList.remove("font-xxs");
  }else{
    inputEl.classList.remove("font-sm");
    inputEl.classList.remove("font-xs");
    inputEl.classList.remove("font-xxs");
  }
}

const passwordLengthEl = document.querySelector("#password-length");

passwordLengthEl.addEventListener("input", () => {
  passwordLength = passwordLengthEl.value;
  document.querySelector("#password-length-text").innerText =
    passwordLengthEl.value;
  generatePassword();
  console.log(passwordLength);
});

upperCaseCheckEl.addEventListener("click", generatePassword);
numbersCheckEl.addEventListener("click", generatePassword);
symbolsCheckEl.addEventListener("click", generatePassword);

function copy() {
  navigator.clipboard.writeText(inputEl.value);
}

document.querySelector("#copy-1").addEventListener("click", copy);
document.querySelector("#copy-2").addEventListener("click", copy);
document.querySelector('#renew').addEventListener('click', generatePassword);
generatePassword();
