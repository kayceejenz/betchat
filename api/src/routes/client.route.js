const router = require("express").Router();


// client routes
router.get("/auth/sign-in", (req,res) => res.sendFile(__dirname+"/api/public/client/pages/auth/sign-in.html"));
router.get("/auth/sign-up", (req,res) => res.sendFile(__dirname+"/api/public/client/pages/auth/sign-up.html"));
router.get("/feeds/index", (req,res) => res.sendFile(__dirname+"/api/public/client/pages/feeds/feeds.html"));

// images
router.get("/images/logo", (req,res) => res.sendFile(__dirname+"/api/public/client/images/logo.png"));

// css
router.get("/css/bootstrap", (req,res) => res.sendFile(__dirname+"/api/public/client/css/dist/bootstrap.min.css"));
router.get("/css/toastr", (req,res) => res.sendFile(__dirname+"/api/public/client/css/dist/toastr.min.css"));
router.get("/css/bootstrap-tagsinput", (req,res) => res.sendFile(__dirname+"/api/public/client/css/dist/bootstrap-tagsinput.css"));
router.get("/css/signin", (req,res) => res.sendFile(__dirname+"/api/public/client/css/pages/sign-in.css"));


// js
router.get("/js/jquery", (req,res) => res.sendFile(__dirname+"/api/public/client/js/libs/jquery.min.js"));
router.get("/js/toastr", (req,res) => res.sendFile(__dirname+"/api/public/client/js/libs/toastr.min.js"));
router.get("/js/bootstrap-tagsinput", (req,res) => res.sendFile(__dirname+"/api/public/client/js/libs/bootstrap-tagsinput.min.js"));
router.get("/js/signin", (req,res) => res.sendFile(__dirname+"/api/public/client/js/pages/sign-in.js"));
router.get("/js/signup", (req,res) => res.sendFile(__dirname+"/api/public/client/js/pages/sign-up.js"));
router.get("/js/feeds", (req,res) => res.sendFile(__dirname+"/api/public/client/js/pages/feeds.js"));


module.exports = router