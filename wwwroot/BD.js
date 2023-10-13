        //Получение всех пользоватедей
    async function getUsers() {
            //отправляет запрос и получаем ответ
            const spinnerBord = document.querySelector('.spinnerWrapper');
    const response = await fetch("/api/users", {
        method: "GET",
    headers: {"Accept": "application/json" }
            });
    //если запрос прошёл нормально
    if (response.ok === true) {
        setTimeout(async () => {
            spinnerBord.style.opacity = '0';
            spinnerBord.style.display = 'none';
            //получаем данные
            const users = await response.json();
            const rows = document.querySelector("tbody");
            //добавляем полученные элементы в таблицу
            users.forEach(user => rows.append(row(user)));
        }, 1000);
            }
    else {
        setTimeout(() => {
            spinnerBord.style.opacity = '0';
            spinnerBord.style.display = 'none';
        }, 1000);
            }
        }

    //получение одного пользователя
    async function getUser(id) {
            const response = await fetch(`/api/users/${id}`, {
        method: "GET",
    headers: {"Accept": "application/json" }
            });
    if (response.ok === true) {
                const user = await response.json();
    document.getElementById("userId").value = user.id;
    document.getElementById("userName").value = user.name;
    document.getElementById("userAge").value = user.age;
            }
    else {
                //если произошла ошибка, получаем сообщение об ошибке
                const error = await response.json();
    console.log(error.message);
            }
        }

    //добавление пользователя
    async function createUser(userName, userAge) {
            const response = await fetch("/api/users", {
        method: "Post",
    headers: {"Accept": "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
        name: userName, age: parseInt(userAge, 10)
                })
            });
    if (response.ok === true) {
                const user = await response.json();
    document.querySelector("tbody").append(row(user));
            }
    else {
                const error = await response.json();
    console.log(error.message);
            }
        }

    //изменение пользователя
    async function editUser(userId, userName, userAge) {
            const response = await fetch("/api/users", {
        method: "PUT",
    headers: {"Accpet": "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
        id: userId,
    name: userName,
    age: parseInt(userAge, 10)
                })
            });
    if (response.ok === true) {
                const user = await response.json();
    document.querySelector(`tr[data-rowid='${userId}']`).replaceWith(row(user));
            }
    else {
                const error = await response.json();
    console.log(error.message);
            }
        }

    //удаление пользователя
    async function deleteUser(id) {
            const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
    headers: {"Accept":"application/json"}
            });

    if (response.ok === true) {
                const user = await response.json();
    document.querySelector(`tr[data-rowid='${user.id}']`).remove();
            }
    else {
                const error = await response.json();
    console.log(error.message);
            }
        }

    //сброс данных формы после отправки
    function reset() {
        document.getElementById("userId").value =
        document.getElementById("userName").value =
        document.getElementById("userAge").value = "";
        }

    //создание строки для таблицы
    function row(user) {
            const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", user.id);

    const nameTd = document.createElement("td");
    nameTd.append(user.name);
    tr.append(nameTd);

    const ageTd = document.createElement("td");
    ageTd.append(user.age);
    tr.append(ageTd);

    const linksTd = document.createElement("td");

    const editLink = document.createElement("button");
    editLink.append("изменить");
    editLink.classList.add("tdButton","btn","btn-primary");
            editLink.addEventListener("click", async () => await getUser(user.id));
    linksTd.append(editLink);

    const removeLink = document.createElement("button");
    removeLink.append("удалить");
    removeLink.classList.add("tdButton" ,"btn", "btn-danger");
            removeLink.addEventListener("click", async () => await deleteUser(user.id));
    linksTd.append(removeLink);
    linksTd.classList.add("tdClass");

    tr.appendChild(linksTd);

    return tr;
        }

        //сброс значений формы
        document.getElementById("resetBtn").addEventListener("click", () => reset());

        //отправка формы
        document.getElementById("saveBtn").addEventListener("click", async () => {

            const id = document.getElementById("userId").value;
    const name = document.getElementById("userName").value;
    const age = document.getElementById("userAge").value;
    if (id === "")
    await createUser(name, age);
    else
    await editUser(id, name, age);

    reset();
            
        });




    //загрузка пользователей 
    getUsers();
