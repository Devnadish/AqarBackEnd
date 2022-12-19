const { log } = require("console");
const dataBase = require("../database/database");
const asyncHandler = require("express-async-handler");

/* ------------------------------------------ */
const showAll = asyncHandler(async (req, response) => {
  let sql = "SELECT * FROM genral_info";
  const [mydata] = await dataBase.myDB.execute(sql);
  console.log(mydata);
  response.send([mydata]);
});
/* ------------------------------------------ */

const getInfo = asyncHandler(async (req, response) => {
  let sql = "SELECT * FROM genral_info";
  const [mydata] = await dataBase.myDB.execute(sql);
  console.log(mydata);
  response.send(mydata[0]);
});
/* ------------------------------------------ */

const saveNewInfo = asyncHandler(async (req, response) => {
  const Rname = req.body.name;
  const Rphone = req.body.phone;
  const Rherotext = req.body.herotext;
  const Rherodeail = req.body.herodeail;
  const Remail = req.body.email;
  const Rsnapsot = req.body.snapsot;
  const Rwhatapp = req.body.whatapp;
  const Rinstgram = req.body.instgram;
  const Radrs = req.body.adrs;
  const Rlocation = req.body.location;
  const Rlat = req.body.lat;
  const Ratt = req.body.att;
  /* 
  * Not Save Image in that base because it not dynmic but knon name
  */
  const RlogoImageFile = null;
  const RheroImageFile = null;
  const RmapImageFile = null;
  let sql = `UPDATE genral_info  SET  name= ? ,phone=?, herotext=?, herodeail=?,email=?, snapsot=?, whatapp=?, instgram=?, adrs=? ,
   lat=?,att=?,logoimage=?,heroimage=?,location=? WHERE id = 1`;
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
    RlogoImageFile,
    RheroImageFile,
    RmapImageFile,
  ]);
});
module.exports = {
  saveNewInfo,
  showAll,
  getInfo,
};
