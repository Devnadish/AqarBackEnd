var express = require("express");
var router = express.Router();
var aqarController = require("../controller/aqarController");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/general");
  },

  filename: (req, file, cb) => {
    if (file.fieldname === "logoImage") {
      cb(null, "logo.jpg");
    } else if (file.fieldname === "heroImage") {
      cb(null, "heroimage.jpg");
    } else if (file.fieldname === "mapImage") {
      cb(null, "mapImage.jpg");
    }

    // const fileName = `${req.body.id}--${Date.now()}_${file.originalname.replace(/\s+/g,'-')}`
    // cb(null, fileName)
  },
});

const upload = multer({ storage: storage });

var imageUpload = upload.fields([
  { name: "logoImage", maxCount: 1 },
  { name: "heroImage", maxCount: 1 },
  { name: "mapImage", maxCount: 1 },
]);

router.get("/showall", aqarController.showAll);
/* ----------------------------------------- */
router.get("/getdata", aqarController.getInfo);
router.post(
  "/savenewinfo",imageUpload,aqarController.saveNewInfo);
// router.post("/savenewinfo" ,imageUpload, aqarController.saveNewInfo)

module.exports = router;
