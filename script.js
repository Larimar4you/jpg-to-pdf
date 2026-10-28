const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("fileInput");
const fileList = document.getElementById("fileList");
const convertBtn = document.getElementById("convertBtn");

let filesArray = [];

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("active");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("active");

  errorMessage.hidden = true;

  const dropped = Array.from(e.dataTransfer.files).filter((file) =>
    validateFile(file),
  );

  filesArray.push(...dropped);
  renderFileList();
});

fileInput.addEventListener("change", (e) => {
  errorMessage.hidden = true;

  const selected = Array.from(e.target.files).filter((file) =>
    validateFile(file),
  );

  filesArray.push(...selected);
  renderFileList();
});

function renderFileList() {
  fileList.innerHTML = "";

  filesArray.forEach((file, index) => {
    const url = URL.createObjectURL(file);

    const item = document.createElement("div");
    item.className = "file-item";

    item.innerHTML = `
      <img src="${url}" alt="preview">
      <span>${file.name}</span>
      <button class="delete-btn" data-index="${index}">✖</button>
    `;

    fileList.appendChild(item);
  });
}

fileList.addEventListener("click", (e) => {
  if (!e.target.classList.contains("delete-btn")) return;

  const index = e.target.dataset.index;
  filesArray.splice(index, 1);
  renderFileList();
});

convertBtn.addEventListener("click", async () => {
  if (filesArray.length === 0) {
    showToast(
      "🤣 Yo dude! I'm a converter, not a magician! Upload an image first!",
    );
    return;
  }

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ unit: "mm", format: "a4" });

  for (let i = 0; i < filesArray.length; i++) {
    const imgData = await readFileAsDataURL(filesArray[i]);

    const img = new Image();

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = imgData;
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const ratio = Math.min(pageWidth / img.width, pageHeight / img.height);
    const w = img.width * ratio;
    const h = img.height * ratio;
    const x = (pageWidth - w) / 2;
    const y = (pageHeight - h) / 2;

    pdf.addImage(imgData, "JPEG", x, y, w, h);
    if (i < filesArray.length - 1) pdf.addPage();
  }

  pdf.save("output.pdf");
  showToast("PDF is ready!");
});

function readFileAsDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

const errorMessage = document.getElementById("errorMessage");

function validateFile(file) {
  if (file.type !== "image/jpeg") {
    errorMessage.textContent = "😂 Hey dude! Wrong file! Upload a JPG or JPEG!";
    errorMessage.hidden = false;
    return false;
  }

  return true;
}

let toastTimeout;

function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
