const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../expressError");

function authenticateJWT(req, res, next) {
    try {
        const authHeader = req.headers && req.headers.authorization;
        
        if (authHeader) {
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
        }
        return next();
    } catch (err) {
        return next();
    }
}

const loginRequired = (req, res, next) => {
    try {
        if (!res.locals.user) throw new UnauthorizedError();
        return next();
    } catch (err) {
        return next(err);
    }
};

function ensureCorrectUserOrAdmin(req, res, next) {
    try {
        const user = res.locals.user.user;
        if (!(user && (user.isAdmin || user.id === req.params.id))) {
            throw new UnauthorizedError();
        }
        return next();
    } catch (err) {
        return next(err);
    }
}

module.exports = { authenticateJWT, loginRequired, ensureCorrectUserOrAdmin };
