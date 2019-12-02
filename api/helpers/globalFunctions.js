class globalFunctions {
    checkRequiredFields(req, requiredFields, source = false) {
        if (source === 'techStackCreate') {
            if (req.body.dos) {
                if (!(req.body.dos && req.body.dos instanceof Array && req.body.dos.length > 0)) {
                    delete req.body.dos;
                }
            }
            if (req.body.donts) {
                if (!(req.body.donts && req.body.donts instanceof Array && req.body.donts.length > 0)) {
                    delete req.body.donts;
                }
            }
        }
        if (source === 'deleteDoAndDonot') {
            if (req.url === '/dos') {
                requiredFields.push('dos');
                req.body.donots;
            }
            else {
                requiredFields.push('donots');
                req.body.dos;
            }
        }

        let noMissingFields = requiredFields.reduce((result, item) =>
            result && (item in req.body), true);
        if (!noMissingFields) {
            let missingFields = this.getMissingFields(req.body, requiredFields);
            return {
                status: false,
                missingFields: missingFields
            };
        } else {
            return {
                status: true
            };
        }
    }
    log() {
        for (let i in arguments) {
            console.log(arguments[i])
        }
    }
    getMissingFields(requestedJsonInput, requiredFields) {
        let missingFields;
        missingFields = requiredFields.map(function (value, index) {
            if (!(value in requestedJsonInput))
                return value;
        });

        function removeUndefined(value) {
            return value !== undefined;
        }

        return missingFields.filter(removeUndefined);
    }
    out(res, statusCode, resultData = false) {

        if (statusCode === 401) {
            res.status(statusCode).json({
                message: 'Unauthorized user'
            });
        } else if (statusCode === 500) {
            if (resultData)
                this.log(resultData);
            res.status(statusCode).json({
                message: 'Internal server error Or Invalid data'
            });
        } else if (statusCode === 400) {
            res.status(statusCode).json({
                message: 'Required fields missing',
                fields: resultData
            });
        } else if (statusCode === 300) {
            res.status(statusCode).json({
                message: resultData
            });
        } else { /*200*/
            if (typeof resultData === 'object' && resultData && (resultData.message || resultData.data)) { /*with data or messgae */
                res.status(statusCode).json(resultData);
            } else if (typeof resultData === 'object' && resultData) { /*only object without data prop*/
                res.status(statusCode).json({
                    data: resultData
                });
            } else { /*only string */
                if (resultData === null) {/*no data found for particular id (GET) */
                    res.status(statusCode).json({
                        message: 'No data found',
                        data: {}
                    });
                }
                else {
                    res.status(statusCode).json({
                        message: resultData ? resultData : 'success'
                    });
                }
            }
        }
    }
}
globalFunctions = new globalFunctions();
module.exports = globalFunctions;