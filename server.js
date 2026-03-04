const express = require("express");
const multer = require("multer");
const XLSX = require("xlsx");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  const workbook = XLSX.readFile(req.file.path);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet);

  const results = data.map((row) => {
    const phone = row.Phone;
    const name = row.Name;

    const message =
      `Hello ${name}, Admissions Open for Inter / POLYCET / EAMCET Coaching. Limited Seats. Contact us now!`;

    const link = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    return { name, phone, link };
  });

  res.json(results);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
}); 