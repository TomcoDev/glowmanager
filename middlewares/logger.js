const loggerPeticiones = (req, res, next) => {
    const ahora = new Date().toLocaleString();
    console.log(`[${ahora}] ${req.method} en ${req.url}`);
    next();
};

module.exports = loggerPeticiones;