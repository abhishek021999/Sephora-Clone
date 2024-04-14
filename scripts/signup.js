let form = document.querySelector("form");
let data = [];

function saveData() {
    localStorage.setItem('data', JSON.stringify(data));
}

function loadData() {
    let savedData = JSON.parse(localStorage.getItem("data"));

    if (savedData) {
        data = savedData;
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    let targetElement = e.target;
    let username = targetElement[0].value;
    let email = targetElement[1].value;
    let password = targetElement[2].value;
    let confirm = targetElement[3].value;

    if (password === confirm) {
        let isUsernameTaken = data.some(function (item) {
            return item.user === username;
        });

        if (isUsernameTaken) {
            alert("Username is already taken.");
        } else {
            let newUser = {
                user: username,
                email: email,
                password: password
            };

            data.push(newUser);
            saveData();
            alert("Registration successful");
            window.location.href = "login.html";
        }
    } else {
        alert("Passwords do not match.");
    }
}

form.addEventListener("submit", handleFormSubmit);
loadData();
