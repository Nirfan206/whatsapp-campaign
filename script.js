function processFile() {

const file = document.getElementById("fileInput").files[0];
const reader = new FileReader();

reader.onload = function(e){

const data = new Uint8Array(e.target.result);
const workbook = XLSX.read(data, {type:"array"});

const sheet = workbook.Sheets[workbook.SheetNames[0]];
const students = XLSX.utils.sheet_to_json(sheet);

const results = document.getElementById("results");
results.innerHTML = "";

students.forEach(student => {

const phone = student.Phone;
const name = student.Name;

const message = `Hello ${name}, Admissions Open for Inter / POLYCET / EAMCET Coaching. Limited seats available.`;

const link = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

const a = document.createElement("a");
a.href = link;
a.target = "_blank";
a.innerText = `Send to ${name} (${phone})`;

const div = document.createElement("div");
div.appendChild(a);

results.appendChild(div);

});

};

reader.readAsArrayBuffer(file);

}