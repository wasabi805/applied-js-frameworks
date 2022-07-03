function capitalize(str: string) {
  if (str.includes("_")) {
    const newStr = str.split("_");
    return newStr.reduce(
      (acc, cur) => acc + cur.charAt(0).toUpperCase() + cur.slice(1) + " ",
      ""
    );
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

interface Iusers {
  first_name?: string;
  last_name?: string;
  city?: string;
  state?: string;
  zip_code?: string;
}
function buildUsersList(users: Iusers) {
  const displayedUsers = document.getElementById("displayUsers");

  let text: Node;
  const listWrapper = document.createElement("div");
  listWrapper.id = `user_${displayedUsers.childNodes.length}`;
  listWrapper.className =
    "block max-w-sm h-56 text-center bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700";
  listWrapper.style.cssText =
    "margin: 2rem; min-width: 14rem; max-width: 14rem; padding: 1em";

  const deleteButton: HTMLButtonElement = document.createElement("button");
  deleteButton.id = `user_${displayedUsers.childNodes.length}`;
  deleteButton.innerHTML = "Delete";

  deleteButton.onclick = (e: MouseEvent) => {
    const {id} = e.target as HTMLButtonElement //https://stackoverflow.com/a/55389799/7857134
    
    const deleteUser = document.getElementById(id);
    deleteUser.remove();
  };

  deleteButton.className =
    "px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2";

  const list = document.createElement("o");
  list.style.cssText =
    "list-style: none; margin-bottom: 2rem; display: block; text-align: left;";

  /* Turn Object into ordered list */
  Object.entries(users).forEach((item: string[]) => {
    const listItem = document.createElement("li");
    listItem.style.cssText = "color: white;";

    text = document.createTextNode(`${capitalize(item[0])} : ${item[1]}`);

    listItem.append(text);

    list.appendChild(listItem);
  });

  listWrapper.appendChild(list);
  listWrapper.append(deleteButton);
  document.getElementById("displayUsers").appendChild(listWrapper);
}


interface Iinput{
  value: string
}
function handleSubmit() {
  const userForm = document.getElementById("userForm");
  const newUser: Iusers = {};

  for (var i = 0; i < Object.entries(userForm).length; i++) {
    const key: string = userForm[i].name;
    const val: string = userForm[i].value;
    newUser[key] = val;
  }

  buildUsersList(newUser);

  Object.values(userForm).forEach((input: Iinput) => {
    input.value = "";
  });
}
