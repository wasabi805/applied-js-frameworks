function capitalize(str) {
    if (str.includes("_")) {
        var newStr = str.split("_");
        return newStr.reduce(function (acc, cur) { return acc + cur.charAt(0).toUpperCase() + cur.slice(1) + " "; }, "");
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function buildUsersList(users) {
    var displayedUsers = document.getElementById("displayUsers");
    var text;
    var listWrapper = document.createElement("div");
    listWrapper.id = "user_".concat(displayedUsers.childNodes.length);
    listWrapper.className =
        "block max-w-sm h-56 text-center bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700";
    listWrapper.style.cssText =
        "margin: 2rem; min-width: 14rem; max-width: 14rem; padding: 1em";
    var deleteButton = document.createElement("button");
    deleteButton.id = "user_".concat(displayedUsers.childNodes.length);
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function (e) {
        var deleteUser = document.getElementById(e.target.id);
        deleteUser.remove();
    };
    deleteButton.className =
        "px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2";
    var list = document.createElement("o");
    list.style.cssText =
        "list-style: none; margin-bottom: 2rem; display: block; text-align: left;";
    /* Turn Object into ordered list */
    Object.entries(users).forEach(function (item) {
        var listItem = document.createElement("li");
        listItem.style.cssText = "color: white;";
        text = document.createTextNode("".concat(capitalize(item[0]), " : ").concat(item[1]));
        listItem.append(text);
        list.appendChild(listItem);
    });
    listWrapper.appendChild(list);
    listWrapper.append(deleteButton);
    document.getElementById("displayUsers").appendChild(listWrapper);
}
function handleSubmit() {
    var userForm = document.getElementById("userForm");
    var newUser = {};
    for (var i = 0; i < Object.entries(userForm).length; i++) {
        var key = userForm[i].name;
        var val = userForm[i].value;
        console.log(key, '&&&&&&');
        newUser[key] = val;
    }
    buildUsersList(newUser);
    Object.values(userForm).forEach(function (input) {
        input.value = "";
    });
}
