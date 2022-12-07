const { log } = require("console");
const dataBase = require("../database/database");
// const lib = require("./lib");
const asyncHandler = require("express-async-handler");

// insert post  ----------------------------


/* ------------------------------------------ */
const showAll = asyncHandler(async (req, response) => {
  let sql = "SELECT * FROM genral_info";
  const [mydata] = await dataBase.myDB.execute(sql);
  console.log(mydata);
  response.send([mydata]);
});

const getInfo = asyncHandler(async (req, response) => {
  let sql = "SELECT * FROM genral_info";
  const [mydata] = await dataBase.myDB.execute(sql);
  console.log(mydata);
  response.send(mydata[0]);
});
const logoimage = "link";
const heroimage = "link";

async function saveNewInfo(req, response) {
//  console.log("files :>>>:",req.files)
const imageFiles=JSON.parse(JSON.stringify(req.files))
const logoImageFile=imageFiles.logoImage[0].destination+"/"+imageFiles.logoImage[0].originalname
const heroImageFile=imageFiles.heroImage[0].destination+"/"+imageFiles.heroImage[0].originalname
const mapImageFile=imageFiles.mapImage[0].destination+"/"+imageFiles.mapImage[0].originalname
 

 console.log("image data:",logoImageFile ,heroImageFile,mapImageFile)
 
  Rname = req.body.name;
  Rphone = req.body.phone;
  Rherotext = req.body.herotext;
  Rherodeail = req.body.herodeail;
  Remail = req.body.email;
  Rsnapsot = req.body.snapsot;
  Rwhatapp = req.body.whatapp;
  Rinstgram = req.body.instgram;
  Radrs = req.body.adrs;
  Rlocation = req.body.location;
  Rlat = req.body.lat;
  Ratt = req.body.att;
 
  let sql = `UPDATE genral_info  SET  name= ? ,phone=?, herotext=?, herodeail=?,email=?, snapsot=?, whatapp=?, instgram=?, adrs=? ,
   lat=?,
   att=? WHERE id = 1`;
  const [mydata] = await dataBase.myDB.execute(sql, [
    Rname,
    Rphone,
    Rherotext,
    Rherodeail,
    Remail,
    Rsnapsot,
    Rwhatapp,
    Rinstgram,
    Radrs,
    Rlat,
    Ratt,
  ]);
 
  // response.send(mydata[0]);
}
module.exports = {
 
  saveNewInfo,
  showAll,
  getInfo,
};
