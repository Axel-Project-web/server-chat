function register(request, response) {
    console.log(request.body);
    response.json(request.body);
}

module.exports = { register };