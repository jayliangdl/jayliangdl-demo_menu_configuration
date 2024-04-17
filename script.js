let draggedElement = null;
let currentDivId = '';

window.onload = function() {
  createInitialDivs();
};

function createInitialDivs() {
  const container = document.getElementById('container');
  let count = 1;
  for (let row = 0; row < 3; row++) {
    for (let col = 1; col <= 10; col++) {
      const char = String.fromCharCode('A'.charCodeAt(0) + row);
      const div = document.createElement('div');
      div.className = 'div';
      div.id = `${char}${col}`;
      div.title = `${char}${col}`;
      div.innerText = `菜单${count}`;
      setupDiv(div);
      container.appendChild(div);
      count++;
    }
  }
}

function setupDiv(div) {
  div.draggable = true;
  div.addEventListener('dragstart', dragStart);
  div.addEventListener('dragover', dragOver);
  div.addEventListener('dragenter', (event) => event.preventDefault());
  div.addEventListener('dragleave', dragLeave);
  div.addEventListener('drop', drop);
  div.addEventListener('click', () => openModal(div.id));
}

function addMenu() {
  document.getElementById('addModal').style.display = 'block';
}

function submitNewMenu() {
  const newName = document.getElementById('addName').value.trim();
  if (newName) {
    const container = document.getElementById('container');
    const totalDivs = container.querySelectorAll('.div').length;
    const newRow = Math.floor(totalDivs / 10);
    const newCol = (totalDivs % 10) + 1;
    const char = String.fromCharCode('A'.charCodeAt(0) + newRow);
    const div = document.createElement('div');
    div.className = 'div';
    div.id = `${char}${newCol}`;
    div.title = `${char}${newCol}`;
    div.innerText = newName;
    setupDiv(div);
    container.appendChild(div);
    document.getElementById('addModal').style.display = 'none';
    document.getElementById('addName').value = '';
  } else {
    alert('请输入菜单名称');
  }
}

function openModal(id) {
  currentDivId = id;
  document.getElementById('modal').style.display = 'block';
  document.getElementById('newName').value = document.getElementById(id).innerText;
}

function saveName() {
  const newName = document.getElementById('newName').value.trim();
  if (newName) {
    document.getElementById(currentDivId).innerText = newName;
    document.getElementById('modal').style.display = 'none';
  } else {
    alert('名称不能为空！');
  }
}

function dragStart(event) {
  draggedElement = event.target;
}

function dragOver(event) {
  event.preventDefault();
}

function dragLeave(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  if (draggedElement !== event.target) {
    let temp = event.target.innerText;
    event.target.innerText = draggedElement.innerText;
    draggedElement.innerText = temp;
  }
}
