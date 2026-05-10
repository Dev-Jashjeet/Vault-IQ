interface transaction {
    readonly date: string,
    readonly amount: number,
    readonly type: "Income"|"Expense",
}

interface user {
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly salary: number,
    transactions: transaction[],
}

const strPerson: string = localStorage.getItem("usersDetails")!;
const Persons = JSON.parse(strPerson);
const sPersonEmail = sessionStorage.getItem("loginemail");
let Person!: user;
let Expenses: Array<number> = [];

for(let user of Persons) {
    if(user.email === sPersonEmail) {
        Person = user;
    }
}

if(Person) {
    for(let exp of Person.transactions) {
        if(exp.type === "Expense") {
            Expenses.push(exp.amount);
        }
    }
}

declare var Chart: any;

const lineCanvas = document.querySelector("#lineChart") as HTMLCanvasElement;

const chart = new Chart(lineCanvas, {
    type: "line",

    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

        datasets: [
            {
                label: "Monthly Expenses",

                data: [5000, 7000, 4000, 9000, 6000, 11000],

                borderColor: "#3b82f6",

                backgroundColor: "rgba(59, 130, 246, 0.2)",

                fill: true,

                tension: 0.15,

                borderWidth: 3,

                pointBackgroundColor: "#3b82f6",

                pointRadius: 5
            }
        ]
    },

    options: {
        responsive: true,

        maintainAspectRatio: false,

        plugins: {
            legend: {
                position: "bottom"
            }
        },

        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
