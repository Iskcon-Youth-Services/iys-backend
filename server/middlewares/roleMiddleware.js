const hasRole = (requiredRole) => (req, res, next) => {
    if (req.session && req.session.role === requiredRole) {
        // User has the required role
        next();
    } else {
        // User does not have the required role
        res.status(403).json({ message: 'Forbidden: You do not have the required permissions' });
    }
};



const hasAnyRole = (allowedRoles) => (req, res, next) => {
    if (allowedRoles.includes(req.session.role)) {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
};

// Usage
// router.post('/admin/getTopSadhanaScorer', isAuthenticated, hasAnyRole(['admin', 'manager']), userController.getTopSadhanaScorer);



module.exports = { hasRole, hasAnyRole};