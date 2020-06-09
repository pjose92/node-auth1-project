module.exports = (req, req, next) => {
    if (require.session && req.session.userid) {
        next();
    } else {
        res.status(401).json({ message: 'No access for you!' });
    }
}