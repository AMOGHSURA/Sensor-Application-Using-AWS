'use strict';
const AWS = require('aws-sdk');
 
exports.handler = async(event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();
 
    let responseBody = "";
    let statusCode = 0;
 
    const { id, productname } = JSON.parse(event.body);
 
    const params = {
        TableName: "sensor-data",
        Item: {
            id: id,
            intensity: intensity
        }
    };
 
    try {
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
    } catch (err) {
        responseBody = `Unable to put product: ${err}`;
        statusCode = 403;
    }
 
    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*"
        },
        body: responseBody
    };
 
    return response;