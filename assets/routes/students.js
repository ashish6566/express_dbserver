import express from 'express';
import db from './../db/connection';

const router = express.Router();

router.get('/', (req, res) => {
	db.connPool.getConnection((err, connection) => {
		if (err) {
			res.status(500).send(err);
		} else {
			let sql = 'SELECT * FROM db1.students;';

			connection.query(sql, (err, result) => {
				if (err) {
					res.status(500).send(err);
				} else {
					res.status(200).send(result);
				}
			});
		}
	});
});

router.get('/:id', (req, res) => {
	let id = req.params.id;

	if (!id) {
		res.status(400).send('Please provide valid id');
	}

	db.connPool.getConnection((err, connection) => {
		if (err) {
			res.status(500).send(err);
		} else {
			let sql = 'SELECT * FROM  db1.students WHERE id = ?;';

			connection.query(sql, [id], (error, result) => {
				if (error) {
					res.status(500).send(error);
				} else {
					res.status(200).send(result);
				}
			});
		}
	});
});

router.post('/create', (req, res) => {
	//required values
	let registrationID = req.body.registrationID;
	let firstname = req.body.firstname;
	let surname = req.body.surname;
	let gender = req.body.gender;
	let birthdate = req.body.birthdate;
	let guardianname = req.body.guardianname;
	let address = req.body.address;
	let contact = req.body.contact;
	let email;
	if (req.body.email == '' || !req.body.email) {
		email = null; //set email to null if not given or empty
	} else {
		email = req.body.email;
	}
	//validating required values
	if (
		registrationID == '' ||
		firstname == '' ||
		surname == '' ||
		gender == '' ||
		birthdate == '' ||
		guardianname == '' ||
		address == '' ||
		contact == ''
	) {
		res.status(400).send('Please Provided all the required fields');
	}

	db.connPool.getConnection((err, connection) => {
		if (err) {
			res.status(500).send(err);
		} else {
			let sql =
				'INSERT INTO db1.students (RegistrationId, Firstname, Surname, Gender, Dateofbirth, Guardians, Address, Contact, Email ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';

			connection.query(
				sql,
				[
					registrationID,
					firstname,
					surname,
					gender,
					birthdate,
					guardianname,
					address,
					contact,
					email
				],
				(error, result) => {
					if (error) {
						res.status(500).send(error);
					} else {
						res.status(200).send(result);
					}
				}
			);
		}
	});
});

router.put(
	'/update/:registrationID/:firstname/:surname/:gender/:birthdate/:guardianname/:address/:contact/:email',
	(req, res) => {
		let registrationID = req.params.registrationID;
		let firstname = req.params.firstname;
		let surname = req.params.surname;
		let gender = req.params.gender;
		let birthdate = req.params.birthdate;
		let guardianname = req.params.guardianname;
		let address = req.params.address;
		let contact = req.params.contact;
		let email = req.params.email;

		if (
			!registrationID ||
			!firstname ||
			!surname ||
			!gender ||
			!birthdate ||
			!guardianname ||
			!address ||
			!contact ||
			!email
		) {
			res.status(400).send('Please Provided all the required fields');
		}

		db.connPool.getConnection((err, connection) => {
			if (err) {
				res.status(500).send(err);
			} else {
				let sql = 'UPDATE db1.students SET ';

				connection.query(
					sql,
					[
						registrationID,
						firstname,
						surname,
						gender,
						birthdate,
						guardianname,
						address,
						contact,
						email
					],
					(error, result) => {
						if (error) {
							res.status(500).send(error);
						} else {
							res.status(200).send(result);
						}
					}
				);
			}
		});
	}
);

router.delete('/delete/:id', (req, res) => {
	let id = req.params.id;

	db.connPool.getConnection((err, connection) => {
		if (err) {
			res.status(500).send(err);
		} else {
			let sql = 'DELETE FROM db1.students where id = ?';

			connection.query(sql, [id], (error, result) => {
				if (error) {
					res.status(500).send(error);
				} else {
					res.status(200).send(result);
				}
			});
		}
	});
});

export default router;
