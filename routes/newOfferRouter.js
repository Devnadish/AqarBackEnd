var express = require("express");
var router = express.Router();
var newOfferController = require("../controller/newOfferController");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/offers");
  },
  

  filename: (req, file, cb) => {
// console.log("----================= :",req.body.offerIndex)
    if (file.fieldname === "locationImage") {
      const fileName = `map${req.body.offerId}.jpg`
      cb(null, fileName);
    } else if (file.fieldname === "coverImage") {
      const fileName = `cover${req.body.offerId}.jpg`
      cb(null,fileName);
    }  else if (file.fieldname === "offerimages"){
     
      const fileName = `offer-${req.body.offerId}-${file.originalname.replace(/\s+/g,'-')}`
      cb(null, fileName);
     


    }

    // const fileName = `${req.body.id}--${Date.now()}_${file.originalname.replace(/\s+/g,'-')}`
    // cb(null, fileName)
  },
});

const upload = multer({ storage: storage });



var imageUpload= upload.fields([
  { name: "locationImage", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
  { name: "offerimages", maxCount: 10 },
 
]);
/* 
* >>>>>>>>>>>>>>>> image middle ware
*/
router.use(imageUpload)

router.post('/xyx', function(req, res){
  // console.log(req.body); // form fields
  // console.log(req.file); // form files
  res.status(204).end();
});

/* ---------- GET OFFER ID ---------------- */
router.get("/offerid", newOfferController.offerId);
router.get("/getcities", newOfferController.getCitiesOnSelect);
router.get("/getdist", newOfferController.getDistOnSelect);
router.post("/savenewoffer", newOfferController.saveNewoffer);





module.exports = router;
