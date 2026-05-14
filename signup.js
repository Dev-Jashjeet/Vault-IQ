const Details = document.querySelectorAll("input");
const Button = document.querySelector("button");
const showPassImg = document.querySelectorAll("i");
const loader = document.querySelector(".loader-cont");
const spanError = document.querySelectorAll(".spanErr");
let show1 = true;
let show2 = true;
let tickCheck = false;
Details[5].addEventListener("change", () => {
    if (Details[5].checked) {
        tickCheck = true;
    }
    else {
        tickCheck = false;
    }
});
// CREATE ACCOUNT FUNCTION
Button.addEventListener("click", () => {
    let count = 0, passCount = 0, checkBox = 0;
    for (let i = 0; i < Details.length - 1; i++) {
        //Count value 5 if all have values
        if (Details[i].value !== "") {
            count++;
        }
    }
    if (Details[2].value.trim() ===
        Details[3].value.trim()) {
        //passCount value 1 if condition satisfied
        passCount++;
    }
    if (tickCheck) {
        if (count === 5 && passCount === 1) {
            loader.style.display = "flex";
            setTimeout(() => {
                for (let i = 0; i < spanError.length; i++) {
                    spanError[i].style.display = "none";
                }
                if (localStorage.getItem("usersDetails") === null) {
                    const usersData = [];
                    let user = {
                        name: Details[0].value,
                        email: Details[1].value.trim(),
                        password: Details[2].value.trim(),
                        salary: Number(Details[4].value.trim()),
                        transactions: [],
                    };
                    usersData.push(user);
                    let strUserData = JSON.stringify(usersData);
                    localStorage.setItem(`usersDetails`, strUserData);
                    sessionStorage.setItem("loginemail", (Details[1].value).trim());
                    window.location.replace("dashboard.html");
                }
                else {
                    let check = 0;
                    let strUserData = localStorage.getItem("usersDetails") || "[]";
                    let userArray = JSON.parse(strUserData);
                    for (let user in userArray) {
                        if (Details[1].value.trim() ===
                            userArray[user].email) {
                            alert("EMAIL ID ALREADY PRESENT PLEASE SIGN IN");
                            check++;
                            break;
                        }
                    }
                    if (check === 0) {
                        let user = {
                            name: Details[0].value,
                            email: Details[1].value.trim(),
                            password: Details[2].value.trim(),
                            salary: Number(Details[4].value.trim()),
                            transactions: [],
                        };
                        userArray.push(user);
                        let strUserData = JSON.stringify(userArray);
                        localStorage.setItem(`usersDetails`, strUserData);
                        sessionStorage.setItem("loginemail", (Details[1].value).trim());
                        window.location.replace("dashboard.html");
                    }
                }
                loader.style.display = "none";
            }, 2000);
        }
        else {
            for (let i = 0; i < spanError.length; i++) {
                spanError[i].style.display = "block";
            }
        }
    }
    else {
        spanError[5].style.display = "block";
    }
    return;
});
// CREATE ACCOUNT ENDED
// VIEW PASSWORD FUNCTION
showPassImg[0].addEventListener("click", () => {
    if (show1) {
        Details[2].type = "text";
        showPassImg[0].style.color = "#3f7df0";
        show1 = false;
    }
    else {
        Details[2].type = "password";
        showPassImg[0].style.color = "#9aa4b2";
        show1 = true;
    }
    return;
});
showPassImg[1].addEventListener("click", () => {
    if (show2) {
        Details[3].type = "text";
        showPassImg[1].style.color = "#3f7df0";
        show2 = false;
    }
    else {
        Details[3].type = "password";
        showPassImg[1].style.color = "#9aa4b2";
        show2 = true;
    }
    return;
});
export {};
// VIEW PASSWORD FUNCTION ENDED
