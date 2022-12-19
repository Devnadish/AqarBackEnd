const { log } = require("console");
const dataBase = require("../database/database");
const asyncHandler = require("express-async-handler");



const offerId = asyncHandler(async (req, response) => {
  let sql = "select max(id) as OfferId from offers";
  const [mydata] = await dataBase.myDB.execute(sql);
  // console.log(mydata[0]);
  response.send(mydata[0]);
});
/* ------------------------------------------ */
const getCitiesOnSelect = asyncHandler(async (req, response) => {
  const checkMe = req.query.regionId;
  let sql = `SELECT * FROM city where regoin_id=${checkMe} ORDER BY(city_name)`;
  const [mydata] = await dataBase.myDB.execute(sql);
  const newData = reArrangeCity(mydata);
  // console.log(newData);
  response.send(newData);
});

/* ------------------------------------------------------------------ */

const getDistOnSelect = asyncHandler(async (req, response) => {
  const checkMe = parseInt(req.query.cityId);
  console.log(checkMe);
  let sql = `SELECT * FROM dist where city_id=${checkMe} ORDER BY(dist_name)`;
  const [mydata] = await dataBase.myDB.execute(sql);
  const newData = reArrangeDist(mydata);
  response.send(newData);
});

/* ------------------------------------------------------------------ */

const saveNewoffer = asyncHandler(async (req, response) => {
  var VloactionImage = "No loaction";
  var VcoverImage = "No loaction";
  req.files.locationImage === undefined
    ? (VloactionImage = "No loaction")
    : (VloactionImage = req.files.locationImage[0].filename);
  req.files.coverImage === undefined
    ? (VcoverImage = "No loaction")
    : (VcoverImage = req.files.coverImage[0].filename);
/* --------------- save gallery to gallaerry table */
req.files.offerimages === undefined
? null:saveGallery(req.body.offerId,req.files.offerimages);




    
/*  */

  var offerData = [
    req.body.offerId,
    "001",
    req.body.offerType,
    req.body.regon,
    req.body.city,
    req.body.dist,
    req.body.price,
    req.body.isPriceShown,
    req.body.isComment,
    req.body.isOwner,
    req.body.title,
    req.body.detail,
    VloactionImage,
    VcoverImage, // req.files.coverImage[0].filename,
  ];
  let sql = `INSERT INTO offers (id_offer, clientid, type_offer, regon, city, 
                              dist, price, ispriceshown, iscomment, isowner
                              , title , detail,map,cover_offerimage
                               ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)`;

  const [mydata] = await dataBase.myDB.execute(sql, offerData);
  response.send("file saved");
});

const saveGallery = (id,gallery)=>{
console.log("id_offer :",id)
id, 



gallery.forEach(async element => {
  console.log("image_offer :",element.filename)

imageData=["100",id,element.filename]

  let offerImage = `INSERT INTO images (clientid, offer_id, image ) VALUES (?, ?, ?)`;
  const [mydata] = await dataBase.myDB.execute(offerImage, imageData);
  
});







}

module.exports = {
  offerId,
  getCitiesOnSelect,
  getDistOnSelect,
  saveNewoffer,
};

/* ------------------------------------------------------------------ */
const reArrangeCity = (data) => {
  const newCitys = [];
  data?.forEach((el) => {
    newCitys.push({ id: el.id, label: el.city_name, value: el.city_name });
  });
  return newCitys;
};

/* ------------------------------------------------------------------ */
const reArrangeDist = (data) => {
  const newCitys = [];
  data?.forEach((el) => {
    newCitys.push({ id: el.id, label: el.dist_name, value: el.dist_name });
  });
  return newCitys;
};
