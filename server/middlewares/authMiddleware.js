const isAuthenticated = (req, res, next) => {
    if (req.session &&( req.session.username || req.session.passport)) {
        // User is authenticated
        next();
    } else {
        // User is not authenticated
        res.status(401).json({ message: 'Unauthorized: Please log in' });
    }
};

module.exports = { isAuthenticated };
