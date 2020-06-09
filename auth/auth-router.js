const router = require('express').Router();
const Users = require('../users/users-model');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {

    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    // Users.add(user)
    //     .then(saved => {
    //         res.status(201).json(saved);
    //     })
    //     .catch(error => {
    //         res.status(500).json(error);
    //     })
    try {
        const saved = await Users.add(user);
        res.status(201).json(saved);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.post('/login', async (req, res) => {
    let { username, password } = req.body;

    try {
        const user = await Users.findBy({ username }).first();

        if (user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({ message: `Welcome ${username}!` });
        } else {
			res.status(401).json({ message: 'invalid credentials' });
        }
    } catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
    // Users.findBy({ username })
    //     .first()
    //     .then(user => {
    //         if (user && bcrypt.compareSync(password, user.password)) {
    //             req.session.userid = user.id;
    //             res.status(200).json({ message: `Welcome ${user.username}` });
    //         } else {
    //             res.status(401).json({ message: 'No access for you!'});
    //         }
    //     })
    //     .catch(error => {
    //         res.status(500).json(error);
    //     })
})

module.exports = router;