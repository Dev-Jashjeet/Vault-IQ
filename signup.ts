import type { userData } from "./modules";

const Details = document.querySelectorAll("input")!;
const Button = document.querySelector("button")! as HTMLButtonElement;
const showPassImg = document.querySelectorAll("i")!;
const loader = document.querySelector(".loader-cont")! as HTMLDivElement;
const spanError = document.querySelectorAll(".spanErr")!;
let show1: boolean = true;
let show2: boolean = true;
let tickCheck: boolean = false;

Details[5]!.addEventListener("change", () => {
  if ((Details[5]! as HTMLInputElement).checked) {
    tickCheck = true;
  } else {
    tickCheck = false;
  }
});

// CREATE ACCOUNT FUNCTION
Button.addEventListener("click", (): void => {
  let count = 0,
    passCount = 0,
    checkBox = 0;
  for (let i = 0; i < Details.length - 1; i++) {
    //Count value 5 if all have values
    if ((Details[i]! as HTMLInputElement).value !== "") {
      count++;
    }
  }
  if (
    (Details[2]! as HTMLInputElement).value.trim() ===
    (Details[3]! as HTMLInputElement).value.trim()
  ) {
    //passCount value 1 if condition satisfied
    passCount++;
  }
  if (tickCheck) {
    if (count === 5 && passCount === 1) {
      loader.style.display = "flex";
      setTimeout((): void => {
        for (let i = 0; i < spanError.length; i++) {
          (spanError[i]! as HTMLSpanElement).style.display = "none";
        }
        if (localStorage.getItem("usersDetails") === null) {
          const usersData: userData[] = [];
          let user: userData = {
            name: (Details[0]! as HTMLInputElement).value,
            email: (Details[1]! as HTMLInputElement).value.trim(),
            password: (Details[2]! as HTMLInputElement).value.trim(),
            salary: Number((Details[4]! as HTMLInputElement).value.trim()),
            transactions: [],
          };
          usersData.push(user);
          let strUserData = JSON.stringify(usersData);
          localStorage.setItem(`usersDetails`, strUserData);
            sessionStorage.setItem("loginemail", (Details[1]!.value).trim());
          window.location.replace("dashboard.html");
        } 
        else {
          let check = 0;
          let strUserData: string =
          localStorage.getItem("usersDetails") || "[]";
          let userArray: userData[] = JSON.parse(strUserData);
          for (let user in userArray) {
            if (
              (Details[1]! as HTMLInputElement).value.trim() ===
              userArray[user]!.email
            ) {
              alert("EMAIL ID ALREADY PRESENT PLEASE SIGN IN");
              check++;
              break;
            }
          }
          if (check === 0) {
            let user: userData = {
              name: (Details[0]! as HTMLInputElement).value,
              email: (Details[1]! as HTMLInputElement).value.trim(),
              password: (Details[2]! as HTMLInputElement).value.trim(),
              salary: Number((Details[4]! as HTMLInputElement).value.trim()),
              transactions: [],
            };
            userArray.push(user);
            let strUserData = JSON.stringify(userArray);
            localStorage.setItem(`usersDetails`, strUserData);
            sessionStorage.setItem("loginemail", (Details[1]!.value).trim());
            window.location.replace("dashboard.html");
          }
        }
        loader.style.display = "none";
      }, 2000);
    } 
    else {
      for (let i = 0; i < spanError.length; i++) {
        (spanError[i]! as HTMLSpanElement).style.display = "block";
      }
    }
  } 
  else {
    (spanError[5]! as HTMLSpanElement).style.display = "block";
  }
  return;
});
// CREATE ACCOUNT ENDED

// VIEW PASSWORD FUNCTION
(showPassImg[0]! as HTMLElement).addEventListener("click", (): void => {
  if (show1) {
    (Details[2]! as HTMLInputElement).type = "text";
    (showPassImg[0]! as HTMLElement).style.color = "#3f7df0";
    show1 = false;
  } else {
    (Details[2]! as HTMLInputElement).type = "password";
    (showPassImg[0]! as HTMLElement).style.color = "#9aa4b2";
    show1 = true;
  }
  return;
});

(showPassImg[1]! as HTMLElement).addEventListener("click", (): void => {
  if (show2) {
    (Details[3]! as HTMLInputElement).type = "text";
    (showPassImg[1]! as HTMLElement).style.color = "#3f7df0";
    show2 = false;
  } else {
    (Details[3]! as HTMLInputElement).type = "password";
    (showPassImg[1]! as HTMLElement).style.color = "#9aa4b2";
    show2 = true;
  }
  return;
});
// VIEW PASSWORD FUNCTION ENDED
