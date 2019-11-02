'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = void 0;

var _mysql = _interopRequireDefault(require('mysql'));

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var config = {
	host: 'localhost',
	user: 'system',
	password: 'password',
	connectionLimit: 12,
	multipleStatements: true,
	debug: true
};
var _default = {
	connection: _mysql['default'].createConnection(config),
	//single connection
	connectionPool: _mysql['default'].createPool(config),
	//connection Pool
	monitorConnection: function monitorConnection() {
		//monitor database connection
		//connect
		this.connection.on('connect', function() {
			console.log('Connection established');
		}); //error

		this.connection.on('error', function(mysqlerror) {
			console.log(mysqlerror);
		}); //end

		this.connection.on('end', function(mysqlerror) {
			console.log(mysqlerror);
		}); //monitor database connection pool
		//connection

		this.connectionPool.on('connection', function(connection) {
			console.log('Connection Pool created');
			connection.on('error', function(mysqlerror) {
				console.log(mysqlerror);
			});
		}); //error

		this.connectionPool.on('error', function(mysqlerror) {
			console.log(mysqlerror);
		}); //release

		this.connectionPool.on('release', function(connection) {
			console.log('Connection Pool Released');
			connection.on('error', function(mysqlerror) {
				console.log(mysqlerror);
			});
		});
	}
};
exports['default'] = _default;
