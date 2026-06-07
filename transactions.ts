const transactionBodyElements = document.querySelectorAll(".common")! ;
const transactionListHeight = document.querySelector(".tablecommon")! as HTMLDivElement;
const sidebarsButton = document.querySelectorAll(".nav-item")! ;
const viewAll = document.querySelector(".viewAll")! as HTMLAnchorElement;
let click: boolean = false;

// function that is used to hide the dashboard elements and show the all transactions list
function HideShow(click: boolean): void {
    if(click===false) {
        transactionListHeight.style.height = "730px";
        transactionListHeight.style.overflow = "scroll";
        for(let element of transactionBodyElements) {
            (element as HTMLElement).style.display = "none";
        }
        click = true;
        return;
    }
    return;
}

// Function when user clicks sidebar transaction button
(sidebarsButton[1] as HTMLAnchorElement).addEventListener("click", (): void => {
    for(let btns of sidebarsButton) {
        btns.classList.remove("active");
    }
    (sidebarsButton[1] as HTMLElement).classList.add("active");
    HideShow(click);
    return;
});

// Function when user click viewAll in dashboard
viewAll.addEventListener("click", (): void => {
    for(let btns of sidebarsButton) {
        btns.classList.remove("active");
    }
    (sidebarsButton[1] as HTMLElement).classList.add("active");
    HideShow(click);
    return;
});

// Function when user clicks sidebar dashboard button
(sidebarsButton[0] as HTMLAnchorElement).addEventListener("click", (): void => {
    for(let btns of sidebarsButton) {
        btns.classList.remove("active");
    }
    (sidebarsButton[0] as HTMLElement).classList.add("active");
    transactionListHeight.scrollTop = 0;
    transactionListHeight.style.height = "365px";
    transactionListHeight.style.overflow = "hidden";
    for(let element of transactionBodyElements) {
        (element as HTMLElement).style.display = "";
    }
    click = false;
    return;
});
