let wrapperStyle = '', buttonStyle=''
wrapperStyle = "list-style: none; color: white; margin-bottom: 2rem; display: block; text-align: left"
buttonStyle= "px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"

function capitalize(str) {
  if (str.includes("_")) {
    const newStr = str.split("_");
    return newStr.reduce(
      (acc, cur) => acc + cur.charAt(0).toUpperCase() + cur.slice(1) + " ",
      ""
    );
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function ListItem(item, style) {
  const listItem = document.createElement("li");
  this.style = style

  listItem.style.cssText = this.style
  this.create = () => listItem;
}

function OrderedList() { 
  this.orderedList = document.createElement("ol");
  this.create = ()=>{
    return this.orderedList
  }
}

function Button(id, text, className) {
  const deleteButton = document.createElement("button");

  this.id = id;
  this.innerText = text;
  this.className = className

  deleteButton.id = this.id;
  deleteButton.innerText = this.innerText;
  deleteButton.className = this.className;

  deleteButton.addEventListener('click',(e)=>{
    const buttonId = e.target.id
    const displayedUsers = document.getElementById('displayUsers')
    const userToRemove = document.getElementById(`user-${buttonId}`)

    displayedUsers.removeChild(userToRemove)
  
  })

  this.create = () => deleteButton;
}

function Wrapper(items) {
  
  const wrapper = document.createElement('div')
  wrapper.className= 'user-input'

  const ol = new OrderedList().create()

  const displayedUsers = document.getElementById('displayUsers')
  let id = displayedUsers.getElementsByClassName('user-input').length
  wrapper.id=`user-${id}`

  let deleteButton = new Button(id, 'Delete', buttonStyle).create()
 
  Object.entries(items).forEach((item) => {
    const li = new ListItem(item , wrapperStyle).create();
    li.innerText = `${item[0]} : ${item[1]}`;
    ol.appendChild(li);
  });

  wrapper.appendChild(ol)
  wrapper.appendChild(deleteButton)

  this.create = ()=> wrapper
}

function UserList() {}

UserList.prototype.createList = function (items) {

  const listWrapper = new Wrapper(items).create();
  const displayedUsers = document.getElementById("displayUsers");

  displayedUsers.appendChild(listWrapper);
};

const List = new UserList(); //instantiate new list so we can use createList

function buildUsersList(users) {
  List.createList(users);
}

function handleSubmit() {
  const userForm = document.getElementById("userForm");
  const newUser = {};

  for (var i = 0; i < Object.entries(userForm).length; i++) {
    const key = userForm[i].name;
    const val = userForm[i].value;
    newUser[key] = val;
  }

  buildUsersList(newUser);

  Object.values(userForm).forEach((input) => {
    input.value = "";
  });
}
