import express from 'express';
import cors from 'cors';

//routes import
import students from './src/routes/students';

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
	res.send('School Management System Database Server');

	next(err => {
		res.send(err);
	});
});

let isServer = false;

export function launchServer() {
	if (isServer == false) {
		return {
			dbserver: app.listen(port, () => {
				console.log(`Database Server: http://localhost:${port}`);
				isServer = true;
			})
		};
	}
}
launchServer(); // invoking function
