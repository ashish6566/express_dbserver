import express from 'express';
import cors from 'cors';

//routes import
import students from './assets/routes/students';

const app = express();
let port = 3000 || process.env.PORT;

app.use(
	express.urlencoded({
		extended: true
	})
);
app.use(cors());

//use imorted routes from below
app.use('/students', students);

app.get('/', (req, res, next) => {
	res.status(200).send('School Management System Database Server');

	next(err => {
		res.status(500).send(err);
	});
});

let isServer = false; // is Server listening: false

let dbServer; //later after express app starts listening will return instance of Server

function launchServer() {
	if (isServer == false) {
		dbServer = app.listen(port, () => {
			console.log(`Database Server: http://localhost:${port}`);
			isServer = true;
		});
	}
}

launchServer(); // invoking function

//exports
export { dbServer, isServer, launchServer };
