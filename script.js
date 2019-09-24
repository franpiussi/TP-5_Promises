var total = 0;
const limit = 100;


function get(URL) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.responseType = 'json';
        request.open('GET', URL);
        request.onload = () => {
            if (request.status == 200 && request.status < 300) {
                resolve(request.response);
            }
            else {
                reject(Error('Info couldn\'t be loaded. Error: ' + request.statusText));
            }
        }
        request.onerror = function () {
            reject(Error('Oops! Network error'));
        }

        request.send();
    });
}

function getTotal() {
    return get('https://utn-2019-avanzada2-tp5.herokuapp.com/records/total');
}

function getRecords(from, to) {
    return get("https://utn-2019-avanzada2-tp5.herokuapp.com/records?from=" + from + "&to=" + to);
}


function renderTable(response) {
    var tbody = document.getElementById("users");
    tbody.innerHTML = "";
    response.forEach(element => {
        var tr = document.createElement("tr");
        var th = document.createElement("th");
        th.setAttribute("scope", "row");
        th.textContent = element.id;
        var td_fname = document.createElement("td");
        td_fname.textContent = element.first_name;
        var td_lname = document.createElement("td");
        td_lname.textContent = element.last;
        var td_email = document.createElement("td");
        td_email.textContent = element.email;
        var td_gender = document.createElement("td");
        td_gender.textContent = element.gender;
        var td_last_connected_ip = document.createElement("td");
        td_last_connected_ip.textContent = element.last_connected_ip;
        tr.append(th, td_fname, td_lname, td_email, td_gender, td_last_connected_ip)
        tbody.append(tr);
    });
}

function next(from, to) {
    getRecords(from, to)
        .then(response => {
            renderTable(response)
        })
}

var pagination = document.getElementById("pagination");
function loadPagination(total) {
    for (let i = 0; i < total; (i+=limit)) {
        const li = document.createElement("li");
        li.setAttribute("class", "page-item");
        const a = document.createElement("a");
        a.setAttribute("class", "page-link");
        if(i > total){
            li.addEventListener("click", () => next(i,i-total));
            a.textContent = i/limit;
        }
        else{
            li.addEventListener("click", () => next(i,i+limit));
            a.textContent = (i/limit) +1 ;
        }
        li.appendChild(a);
        pagination.appendChild(li);
    }
}

x

    window.onload = () => {
        getTotal()
            .then(response => {
                loadPagination(response)
            })
            .catch(error => console.log(error))

        getRecords(0, limit)
            .then(response => renderTable(response))
            .catch(error => console.log(error))
    }