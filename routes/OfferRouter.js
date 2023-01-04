var express = require("express");
var router = express.Router();
var OfferController = require("../controller/OfferController");
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
router.get("/offerid", OfferController.offerId);
router.get("/getcities", OfferController.getCitiesOnSelect);
router.get("/getdist", OfferController.getDistOnSelect);
router.get("/getofferstype", OfferController.getOffersType);
router.get("/getalloffers", OfferController.getAlloffers);
router.get("/getoffertoupdate", OfferController.getOfferToupdate);

router.post("/savenewoffer", OfferController.saveNewoffer);
router.put("/updateoffer", OfferController.updateOffer);





module.exports = router;
