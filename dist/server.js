"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.launchServer = launchServer;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _connection = _interopRequireDefault(require("./src/db/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = 3000 || process.env.PORT;
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _cors["default"])());
app.get('/', function (req, res, next) {
  res.send('School Management System Database Server');
  next(function (err) {
    res.send(err);
  });
});
var isServer = false;

function launchServer() {
  if (isServer == false) {
    return {
      dbserver: app.listen(port, function () {
        console.log("Database Server: http://localhost:".concat(port));
        isServer = true;
      })
    };
  }
}

launchServer(); // app.listen(port, () => {
// 	console.log(`Database Server: http://localhost:${port}`);
// 	isServer = true;
// });

_connection["default"].monitorConnection();