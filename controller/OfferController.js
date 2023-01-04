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
const getOffersType = asyncHandler(async (req, response) => {
  const checkMe = parseInt(req.query.cityId);
  console.log(checkMe);
  let sql = `SELECT * FROM offertype;`;
  const [mydata] = await dataBase.myDB.execute(sql);
  const newData = reArrangeofferType(mydata);
  response.send(newData);
});
/* ------------------------------------------------------------------ */

const saveNewoffer = asyncHandler(async (req, response) => {
console.log(req.body);

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
    req.body.offerDate,
  ];
  let sql = `INSERT INTO offers (id_offer, clientid, type_offer, regon, city, 
                              dist, price, ispriceshown, iscomment, isowner
                              , title , detail,map,cover_offerimage,offer_date
                               ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)`;

  const [mydata] = await dataBase.myDB.execute(sql, offerData);
  response.send("file saved");
});
/* -------------------------------------- */
const saveGallery = (id,gallery)=>{
console.log("id_offer :",id)

gallery.forEach(async element => {
  console.log("image_offer :",element.filename)

imageData=["100",id,element.filename]

  let offerImage = `INSERT INTO images (clientid, offer_id, image ) VALUES (?, ?, ?)`;
  const [mydata] = await dataBase.myDB.execute(offerImage, imageData);
  
});
}

/* ------------------------------------------------------------------ */
const getAlloffers = asyncHandler(async (req, response) => {
  
  // let sql = `SELECT * FROM offers ORDER BY(cr_date)`;

  let sql = `SELECT  id,  offer_date,  id_offer,  clientid,  
  (SELECT  region_name  FROM   reigon  WHERE  offers.regon = reigon.region_id) AS regoin,
  (SELECT  city_name    FROM   city    WHERE  offers.city = city.city_id) AS city,
  (SELECT  dist_name    FROM   dist    WHERE  offers.dist = dist_id) AS dist,
  (SELECT  offertype_name    FROM   offertype    WHERE  offers.type_offer = offertype_id) AS offertype,
  (SELECT  typeofoffer    FROM   offertype    WHERE  offers.type_offer = offertype_id) AS offertypeCat,
   map, cover_offerimage, price,ispriceshown,iscomment, detail,isowner, title
   FROM   offers ORDER BY (id_offer) DESC;`



  const [mydata] = await dataBase.myDB.execute(sql);
  // const newData = reArrangeDist(mydata);
  response.send(mydata);
});
/* ------------------------------------------------------------------ */



const getOfferToupdate = asyncHandler(async (req, response) => {
  const checkMe = parseInt(req.query.offerId);

  console.log(".....getOfferToupdate.........: ", req.body);
  console.log(".....getOfferToupdate.........: ", req.query.offerId);
  // const checkMe = 196;
  // let sql = `SELECT * FROM offers  where id_offer=198 `;
  let sql = `SELECT * FROM offers  where id_offer=${checkMe} `;
  const [mydata] = await dataBase.myDB.execute(sql);

  let imgx = `SELECT * FROM images  where offer_id=${checkMe} `;
  const [offerImg] = await dataBase.myDB.execute(imgx);
  console.log(offerImg);

  // response.send(mydata);
  response.send({ offerData: mydata, offerImage: offerImg });
});


/* ------------------------------------------------------------------ */
const updateOffer = asyncHandler(async (req, response) => {
  console.log("req.query.offerId>>>>>>>>>>>>>>>>>>>>>>>.......  : ",req.query.offerId)
  console.log("req.query.offerId>>>>>>>>>>>>>>>>>>>>>>>.......  : ",req.body)
  const updKEY=parseInt(req.query.offerId)

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

  // var offerData = ["07001"];
  // let sql = `UPDATE offers SET clientid=?  WHERE id_offer = ${updKEY}`

  // const [mydata] = await dataBase.myDB.execute(sql, offerData)
  //     .then(()=>{ response.send(`offer updated successfully ${req.query.offerId}`)}).catch(err => {console.log(err)});






  
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
        req.body.offerDate,
      ];
      let sql = `UPDATE offers SET  id_offer=?, clientid=?, type_offer=?, regon=?, city=?
                                   ,dist=?, price=?, ispriceshown=?, iscomment=?, isowner=?,title=?
                                   ,detail=?,map=?,cover_offerimage=?,offer_date=?       WHERE id_offer = ${updKEY}`
    
      const [mydata] = await dataBase.myDB.execute(sql, offerData)
          .then(()=>{ response.send(`offer updated successfully ${req.query.offerId}`)}).catch(err => {console.log(err)});
   
       
  });
  /* -------------------------------------- */
  



module.exports = {
  offerId,
  getCitiesOnSelect,
  getDistOnSelect,
  saveNewoffer,
  getAlloffers,
  getOffersType,
  getOfferToupdate,
  updateOffer
};

/* ------------------------------------------------------------------ */
const reArrangeCity = (data) => {
  const newCitys = [];
  data?.forEach((el) => {
    newCitys.push({ id: el.city_id, label: el.city_name, value: el.city_name });
  });
  return newCitys;
};

/* ------------------------------------------------------------------ */
const reArrangeDist = (data) => {
  const newCitys = [];
  data?.forEach((el) => {
    newCitys.push({ id: el.dist_id, label: el.dist_name, value: el.dist_name });
  });
  return newCitys;
};


const reArrangeofferType = (data) => {
  const newCitys = [];
  data?.forEach((el) => {
    newCitys.push({ id: el.offertype_id, label: el.offertype_name, value: el.offertype_name });
  });
  return newCitys;
};

 