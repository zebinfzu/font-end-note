let message = "Hello World";
// 2. 将数据展示在页面中
const titleEl = document.getElementsByClassName("title")[0];
titleEl.innerHTML = message;
// 3. 点击按钮，界面数据发生改变
const btnEl = document.getElementsByClassName("btn")[0];
btnEl.addEventListener("click", (e) => {
  console.log("按钮发生了点击");
  message = "Hello React";
  titleEl.innerHTML = message;
});
