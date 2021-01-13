const errorHandlig = (err, res) => res.status(400).json(`Error: ${err}`)

module.exports = errorHandlig