const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

const c = console;
// lógica principal
buttons.forEach((btn) => {
    btn.addEventListener("click", async ()  => {
        if (btn.id === "=") {
            c.log(display.value, "//", eval(display.value))
            // o sendtodb precisa vir antes do eval pq se nao ele envia o mesmo valor como conta e resultado
            sendToDB();
            display.value = eval(display.value);
            
        } else if (btn.id === "ac") {
            display.value = "";
        } else if (btn.id == "de") {
            display.value = display.value.slice(0, -1);
        } else {
            display.value += btn.id;
        }
    });
});


// pega os valores do display e manda pro bd
function sendToDB() {
    // op = operação (conta)
    let display = document.querySelector("#display").value;
    let data = {
        type: "calc",
        conta: display,
        resultado: eval(display),
        data: new Date()
    }
    // console.log(data);

    fetch("/history", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })
        .then(async (data) => {
            console.log("Success:", data);
            await getHistory();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

// pega o historico do bd e mostra na tela
async function getHistory() {
    const url = "/history";
    const config = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }

    const historico = await(await fetch(url, config)).json();
    // console.log(historico);
    showHistory(historico);
}

function showHistory(data) {
    let history = document.querySelector("#historico");
    history.innerHTML = data.map(element => {
        if (element.type == "calc"){
            return `<p>${element.conta} = ${element.resultado}</p>`;
        }
        else if (element.type == "mdc"){
            return `<p>O MDC de ${element.num1} e ${element.num2} é ${element.resultado}.</p>`;
        }
        else if (element.type == "pa"){
            return `<p>PA: O ${element.termIndex}º é ${element.resultado}.</p>`;
        }
        else if (element.type == "pg"){
            return `<p>PG: O ${element.termIndex}º é ${element.resultado}.</p>`;
        }
        
    }).join('');
}