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
					res.status(501).send(err);
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
		res.send('Please provide valid id');
	}

	db.connPool.getConnection((err, connection) => {
		if (!err) {
			let sql = 'SELECT * FROM  db1.students WHERE id = ?;';

			connection.query(sql, [id], (error, result) => {
				if (error) {
					res.status(500).send(error);
				} else {
					res.send(result);
				}
			});
		} else {
			res.send(err);
		}
	});
});

router.post(
	'/create/:registrationID/:firstname/:surname/:gender/:birthdate/:guardianname/:address/:contact/:email',
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
			!contact
		) {
			res.send('Please Provided all the required fields');
		}

		db.connPool.getConnection((err, connection) => {
			if (!err) {
				let sql = `INSERT INTO db1.students 
        (RegistrationId, Firstname, Surname, Gender, Dateofbirth, Guardians, Contact, Address )
        VALUES
        ('?', '?', '?', '?', '?', '?', '?', '?');`;

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
							res.send(error);
						} else {
							res.send(result);
						}
					}
				);
			} else {
				res.send(err);
			}
		});
	}
);

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
			res.send('Please Provided all the required fields');
		}

		db.connPool.getConnection((err, connection) => {
			if (!err) {
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
							res.send(error);
						} else {
							res.send(result);
						}
					}
				);
			} else {
				res.send(err);
			}
		});
	}
);

router.delete('/delete/:id', (req, res) => {
	let id = req.params.id;

	db.connPool.getConnection((err, connection) => {
		if (!err) {
			let sql = 'DELETE FROM db1.students where id = ?';

			connection.query(sql, [id], (error, result) => {
				if (error) {
					res.send(error);
				} else {
					res.send(result);
				}
			});
		} else {
			res.send(err);
		}
	});
});

export default router;
