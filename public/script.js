async function uploadFile() {

const fileInput = document.getElementById("fileInput");
const file = fileInput.files[0];

const formData = new FormData();
formData.append("file", file);

const response = await fetch("/upload", {
method: "POST",
body: formData
});

const data = await response.json();

const resultsDiv = document.getElementById("results");
resultsDiv.innerHTML = "";

data.forEach(student => {

const link = document.createElement("a");
link.href = student.link;
link.target = "_blank";
link.innerText = `Send to ${student.name} (${student.phone})`;

const div = document.createElement("div");
div.appendChild(link);

resultsDiv.appendChild(div);

});

} 