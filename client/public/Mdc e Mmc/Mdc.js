function calculate() {
    var num1 = parseInt(document.getElementById("num1").value);
    var num2 = parseInt(document.getElementById("num2").value);
    var mdc = getMDC(num1, num2);
    sendToDB(num1, num2, mdc);
    document.getElementById("result").innerHTML = "O MDC de " + num1 + " e " + num2 + " é " + mdc + ".";
}

function getMDC(a, b) {
    if (b == 0) {
        return a;
    } else {
        return getMDC(b, a % b);
    }
}

function sendToDB(num1, num2, mdc) {
    // op = operação (conta)
    let data = {
        type: "mdc",
        ip: "4002.8922",
        num1: num1,
        num2: num2,
        resultado: mdc,
        data: new Date()
    }
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
    console.log(historico);
    showHistory(historico);
}

function showHistory(data) {
    let history = document.querySelector("#historico");
    console.log(history)
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