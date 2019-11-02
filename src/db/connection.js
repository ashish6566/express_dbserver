import mysql from 'mysql';

const config = {
	host: 'localhost',
	user: 'system',
	password: 'password',
	connectionLimit: 12,
	multipleStatements: true,
	debug: true,
	database: 'db1'
};

const conn = mysql.createConnection(config); //single connection

const connPool = mysql.createPool(config); //connection Pool

//monitor database connection
//connect
conn.on('connect', () => {
	console.log('Connection established');
});

//error
conn.on('error', mysqlerror => {
	console.log(mysqlerror);
});

//end
conn.on('end', mysqlerror => {
	console.log(mysqlerror);
});

//monitor database connection pool
//connection
connPool.on('connection', connection => {
	console.log('Connection Pool created');

	connection.on('error', mysqlerror => {
		console.log(mysqlerror);
	});
});

//error
connPool.on('error', mysqlerror => {
	console.log(mysqlerror);
});

//release
connPool.on('release', connection => {
	console.log('Connection Pool Released');

	connection.on('error', mysqlerror => {
		console.log(mysqlerror);
	});
});

export default { conn, connPool };
