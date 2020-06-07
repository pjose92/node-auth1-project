const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model');

router.post('/register', (req, res) => {

    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.userid = user.id;
                res.status(200).json({ message: `Welcome ${user.username}` });
            } else {
                res.status(401).json({ message: 'No access for you!'});
            }
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

module.exports = router;