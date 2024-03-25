function logger(message) {
    console.log(`${new Date().toISOString()} - Log: ${message}`);
}

module.exports = { logger };