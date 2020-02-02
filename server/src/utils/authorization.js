/**
 * Moduł używany jako middleware w ścieżkach autoryzowanych, udostępnia w argumencie żadania req pole req.user
 * zawierające informacje o obecnie zalogowanym użytkowniku.
 * <br><br>
 * W przypadku braku nagłówka "authorization" lub "x-access-token" middleware ten odmawia dostępu do danego zasobu.
 * @module utils/authorization
 */

const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers["authorization"];
    if(!token) res.status(401).json({
        status: "error",
        error: "Odmowa dostępu. Nie znaleziono tokenu."
    })

    try {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        req.user = decoded;
        next();
    } catch(err) {
        res.status(400).json({
            status: "error",
            name: err.name,
            err: err.message
        });
    };
}    
