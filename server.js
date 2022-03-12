require("express-async-errors");
const app = require("express")();
// const swaggerUi = require('swagger-ui-express'),
//     swaggerDocument = require('./swagger.json');
const { PORT } = process.env;

// Pre-route middlewares
require("./api/src/middlewares/pre-route.middleware")(app);

// API routes
app.use("/api", require("./api/src/routes"));

// client routes
app.get("/auth/sign-in", (req,res) => res.sendFile(__dirname+"/api/public/client/pages/auth/sign-in.html"));
app.get("/auth/sign-up", (req,res) => res.sendFile(__dirname+"/api/public/client/pages/auth/sign-up.html"));
app.get("/feeds/index", (req,res) => res.sendFile(__dirname+"/api/public/client/pages/feeds/feeds.html"));

// images
app.get("/images/logo", (req,res) => res.sendFile(__dirname+"/api/public/client/images/logo.png"));

// css
app.get("/css/bootstrap", (req,res) => res.sendFile(__dirname+"/api/public/client/css/dist/bootstrap.min.css"));
app.get("/css/toastr", (req,res) => res.sendFile(__dirname+"/api/public/client/css/dist/toastr.min.css"));
app.get("/css/bootstrap-tagsinput", (req,res) => res.sendFile(__dirname+"/api/public/client/css/dist/bootstrap-tagsinput.css"));
app.get("/css/signin", (req,res) => res.sendFile(__dirname+"/api/public/client/css/pages/sign-in.css"));


// js
app.get("/js/jquery", (req,res) => res.sendFile(__dirname+"/api/public/client/js/libs/jquery.min.js"));
app.get("/js/toastr", (req,res) => res.sendFile(__dirname+"/api/public/client/js/libs/toastr.min.js"));
app.get("/js/bootstrap-tagsinput", (req,res) => res.sendFile(__dirname+"/api/public/client/js/libs/bootstrap-tagsinput.min.js"));
app.get("/js/signin", (req,res) => res.sendFile(__dirname+"/api/public/client/js/pages/signin.js"));
app.get("/js/signup", (req,res) => res.sendFile(__dirname+"/api/public/client/js/pages/signup.js"));



// Serve swagger ui
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error middlewares
require("./api/src/middlewares/error.middleware")(app);

// Listen to server port
app.listen(PORT, async () => {
     //Initialize MongoDB
     await require("./api/src/config/mongo-db.config")()
     console.log(`:::> Server listening on port ${PORT} @ http://localhost:${PORT}`);
});

// On  server error
app.on("error", (error) => {
     console.error(`<::: An error occurred on the server: \n ${error}`);
});


module.exports = app