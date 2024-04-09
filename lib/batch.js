
const axios = require("axios");

module.exports = function (req, res) {

    res.setHeader('Content-Type', 'application/json')
    res.setHeader('DataServiceVersion', '4.0')
    res.setHeader('OData-Version', '4.0')

    var responseMapper = function (response) {



        var _data = {};
        if (response.data && response.data.length > 0) {

            _data = response.data.value[0];
            _data["@odata.context"] = response.data["@odata.context"];;
        }

        var _response = {
            status: response.status,
            headers: response.headers,
            body: _data
        };
        return _response;
    };

    let convert = function (requestObject) {

        let method = requestObject.method;

        let operation;

        if (method == "GET") {

            operation = axios.get(requestObject.url, {

                params: {
                    ID: 150,
                    token: "BhazZqIw8qclEmcwzq5ZWTiUOEmCFK",
                },
            });



        } else if (method == "POST") {

            operation = axios.post(requestObject.url, requestObject.body);
        } else if (method == "DELETE") {

            operation = axios.delete(requestObject.url, {});
        } else if (method == "PATCH") {

            operation = axios.patch(requestObject.url, requestObject.body);
        }

        return operation;
    };

    if (req.body) {

        var requests = req.body.requests;

        const promisifiedObject = requests.map(convert);


        console.log(promisifiedObject);

        Promise.all(promisifiedObject).then(results => {

            console.log("RESULTS::::::::::::::::::::::::::::::::::::::::");



            const responses = { "responses": results.map(responseMapper) };
            return res.end(JSON.stringify(responses))
        }).catch(err => {
            console.log(err)
        });



    }



}