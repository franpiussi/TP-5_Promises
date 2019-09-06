
function loadTable(URL){
    return new Promise(function(resolve,reject){
        var request = new XMLHttpRequest();
        request.open('GET', URL);
        request.onload = function(){
            if (request.status == 200){
                resolve(request.response);
            }
            else{
                reject(Error('Info couldn\'t be loaded. Error: ' + request.statusText));
            }
        }
        request.onerror = function () {
            reject(Error('Oops! Network error'));
        }

        request.send();
    });
}

var tbody = document.getElementById("users");
loadTable("https://utn-2019-avanzada2-tp5.herokuapp.com/records")
    .then((response) =>{
       

           //tbody.append("<tr><td>"+element.id+"</td><td>"+element.first_name+"</td><td>"+element.last_name+"</td><td>"+element.email+"</td><td>"+element.gender+"</td><td>"+element.last_connected_ip+"</td></tr>");
    })


