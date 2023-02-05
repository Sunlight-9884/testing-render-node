const usersInfoTag = document.querySelector(".usersInfo");
const showOnUI = (name, email) => {
  const userDiv = document.createElement("div");
  userDiv.classList.add("user");
  userDiv.innerHTML =
 ` < h2 > Welcome ${name}.</h2 > < p > Your Email is  ${email}.</p >`;
  usersInfoTag.append(userDiv);
};
const getUsersFromServer = async () => {
  const url = "http://localhost:3000/allUsers";
  const response = await fetch(url);
  const data = await response.json();

  for (let i = 0; i < data.length; i++) {
    let userName = data[i].name;
    let userEmail = data[i].email;
    showOnUI(userName, userEmail);
  }
};
getUsersFromServer();
const inputedName = document.querySelector(".newUserName");
const inputedEmail = document.querySelector(".newUserEmail");
let newUserEmail;
let newUserName;
let newUserobject;
inputedName.addEventListener("change", (e) => {
  newUserName = e.target.value.toString();
});
inputedEmail.addEventListener("change", (e) => {
  newUserEmail = e.target.value.toString();
});
const emptyInputvalue = () => {
  inputedName.value = "";
  inputedEmail.value = "";
};
const registerNewUser = async () => {
  newUserobject = {
    name: newUserName,
    email: newUserEmail,
  };

  if (newUserName || newUserEmail) {
    const response = await fetch("https://testing-render-node.onrender.com", {
      method: "POST",
      body: JSON.stringify(newUserobject),
    });
    const data = await response.json();
    let userName = data[data.length - 1].name;
    let userEmail = data[data.length - 1].email;
    showOnUI(userName, userEmail);
    emptyInputvalue();
  }
};
