let txt = document.querySelector('.txt');
let btn = document.querySelector('.btn');
let list = document.querySelector('.todolist');
//取data parse轉js object  getItem取出todoName(keycode) or []
let data = JSON.parse(localStorage.getItem("todoName")) || [];
let txtValue = txt.value;

//btn 按鈕監聽
btn.addEventListener('click', function (e) {
  if (txtValue == '' || txtValue == undefined || txtValue == null) {
    alert('請輸入文字');
    return;
  }
  let todo = {
    todotxt: txtValue
  }
  data.push(todo);
  updateList(data);
  localStorage.setItem("todoName", JSON.stringify(data));
  txt.value = '';
});
//txt enter鍵監聽
txt.addEventListener('keypress', function (e) {
  let txtValue = txt.value;
  if (e.keyCode == 13) {
    if (txtValue == '') {
      alert('請輸入文字');
      return;
    }
    let todo = {
      todotxt: txtValue
    }
    data.push(todo);
    updateList(data);
    localStorage.setItem("todoName", JSON.stringify(data));
    txt.value = '';
  }
});
//資料更新累加顯示
function updateList(data) {
  let str = '';
  let total = data.length;
  for (let i = 0; i < total; i++) {
    str += `<li class="todo">
        <p class="todo_p">${i + 1}. ${data[i].todotxt}</p>
        <a href='#' data-num=${i} class="deletBtn">
          <i class="bi bi-trash" style="font-size: 26px;"></i>
        </a>
      </li>`;
  }
  list.innerHTML = str;
}
updateList(data);

//刪除某筆dataset資料
list.addEventListener('click', e => {
  if (e.target.getAttribute('class') == "deletBtn") {
    let num = e.target.getAttribute('data-num');
    data.splice(num, 1);
    localStorage.setItem("todoName", JSON.stringify(data));
    updateList(data);
  }
})

//刪除全部 按鈕監聽和事件
let deleteAll = document.querySelector('.deleteAll');
deleteAll.addEventListener('click', (e) => {
  if (e.target.nodeName == "BUTTON") {
    localStorage.clear();
    data = [];
    localStorage.setItem("todoName", JSON.stringify(data));
    updateList(data);
    // location.reload(); codepen不能用 改用setItem
  }
})