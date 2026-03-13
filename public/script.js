const API = "https://redirector-vm66ea.fly.dev";

async function register() {
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
        if (data.errors) {
            const errorMessages = data.errors
                .map(error => `${error.field}: ${error.message}`)
                .join(", ");
            alert(`Validation Error: ${errorMessages}`);
        } else {
            alert(`Error: ${data.message || 'An unknown error occurred'}`);
        }
    } else {
        alert(data.message);
    }
}

async function login() {

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    alert(data.message);
}

async function logout() {

    const res = await fetch(`${API}/auth/logout`, {
        method: "POST",
        credentials: "include"
    });

    const data = await res.json();

    alert(data.message);
}

async function createUrl() {

    const url = document.getElementById("urlInput").value;

    const res = await fetch(`${API}/url/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ url })
    });

    const data = await res.json();

    document.getElementById("shortUrl").innerText =
        API + "/url/" + data.url.code;
}

async function getAnalytics() {

    const code = document.getElementById("codeInput").value;

    const res = await fetch(`${API}/analytics/${code}`, {
        method: "GET",
        credentials: "include"
    });

    const data = await res.json();

    document.getElementById("analyticsResult").innerText =
        JSON.stringify(data, null, 2);
}