function calculate() {
    var firstTerm = parseInt(document.getElementById("first-term").value);
    var commonRatio = parseInt(document.getElementById("common-ratio").value);
    var termIndex = parseInt(document.getElementById("term-index").value);
    var termValue = firstTerm + (termIndex - 1) * commonRatio;
    sendToDB(firstTerm, commonRatio, termIndex, termValue);
    document.getElementById("result").innerHTML = "O " + termIndex + "º termo é " + termValue + ".";
}

function sendToDB(firstTerm, commonRatio, termIndex, termValue) {
    let data = {
        type: "pa",
        ip: "4002.8922",
        firstTerm: firstTerm,
        commonRatio: commonRatio,
        termIndex: termIndex,
        resultado: termValue,
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