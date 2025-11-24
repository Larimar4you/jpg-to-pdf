let filesArray = [];

const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("fileInput");
const fileList = document.getElementById("fileList");
const convertBtn = document.getElementById("convertBtn");

dropArea.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (e) =>
  addFiles(Array.from(e.target.files))
);

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("dragover");
});
dropArea.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dropArea.classList.remove("dragover");
});
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("dragover");
  addFiles(Array.from(e.dataTransfer.files));
});

function addFiles(newFiles) {
  newFiles.forEach((f) => filesArray.push(f));
  renderList();
}

// Рендер списка с миниатюрами и кнопкой удаления
function renderList() {
  fileList.innerHTML = "";
  filesArray.forEach((file, index) => {
    const row = document.createElement("div");
    row.className = "file-row";

    const rowContent = document.createElement("div");
    rowContent.className = "file-row-content";

    const img = document.createElement("img");
    const reader = new FileReader();
    reader.onload = (e) => (img.src = e.target.result);
    reader.readAsDataURL(file);

    const span = document.createElement("span");
    span.textContent = file.name;

    rowContent.appendChild(img);
    rowContent.appendChild(span);

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "Удалить";
    removeBtn.addEventListener("click", () => {
      filesArray.splice(index, 1);
      renderList();
    });

    row.appendChild(rowContent);
    row.appendChild(removeBtn);

    fileList.appendChild(row);
  });

  // Инициализируем Sortable.js на контейнере
  new Sortable(fileList, {
    animation: 150,
    onEnd: (evt) => {
      const movedItem = filesArray.splice(evt.oldIndex, 1)[0];
      filesArray.splice(evt.newIndex, 0, movedItem);
      renderList();
    },
  });
}

// Конвертация в PDF
convertBtn.addEventListener("click", async () => {
  if (filesArray.length === 0) {
    alert("Добавь хотя бы один файл");
    return;
  }
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = 210,
    pageH = 297,
    margin = 10;
  const pxToMm = (px) => (px * 25.4) / 96;

  for (let i = 0; i < filesArray.length; i++) {
    const file = filesArray[i];
    const imgData = await new Promise((resolve) => {
      const r = new FileReader();
      r.onload = (e) => resolve(e.target.result);
      r.readAsDataURL(file);
    });

    const img = new Image();
    img.src = imgData;
    await new Promise((res) => (img.onload = res));

    const w = pxToMm(img.width);
    const h = pxToMm(img.height);

    const availW = pageW - margin * 2;
    const availH = pageH - margin * 2;

    const ratio = Math.min(availW / w, availH / h);
    const drawW = w * ratio;
    const drawH = h * ratio;
    const x = (pageW - drawW) / 2;
    const y = (pageH - drawH) / 2;

    pdf.addImage(imgData, "JPEG", x, y, drawW, drawH);
    if (i < filesArray.length - 1) pdf.addPage();
  }

  pdf.save("converted.pdf");
  alert("Готово! PDF создан ");
});
