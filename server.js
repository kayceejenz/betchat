require("express-async-errors");
const app = require("express")();
// const swaggerUi = require('swagger-ui-express'),
//     swaggerDocument = require('./swagger.json');
const { PORT } = process.env;

// Pre-route middlewares
require("./api/src/middlewares/pre-route.middleware")(app);

// API routes
app.use("/api", require("./api/src/routes"));

// Ping route for testing connection
app.get("/ping", (req, res) => res.status(200).send("Hello world!"));
app.get("/auth/sign-in", (req,res) => res.sendFile(__dirname+"/public/client/pages/auth/sign-in.html"));

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