# fetch-ip-data

https://ipdata.co/ IP lookup service is used in this app. Please create an acoount there and get an API key which you will need. Add your API key in routes/index.js file.

To run this API on localhost, comment out this line in bin/www file. "module.exports = app;". And comment the following line- "module.exports.handler = serverless(app);" (DON'T do it if you're deploying app on AWS Lambda.)

To deploy this API on AWS Lambda, run <code>npm install</code> in the project directory. 
Once node modules are installed, run <code>serverless config credentials --provider aws --key ACCESS_KEY ?secret SECRET_KEY </code>
(Assign appropriate access roles to this IAM User.)

serverless.yml contains configurations for AWS API Gateway. Modify it as needed. For more information about serverless, visit https://www.npmjs.com/package/serverless .

To deploy app, on AWS Lambda run <code>serverless deploy</code> 
Done..! It will create AWS resources as needed and if everything goes well, you will get API endpoint on the console screen. 

If request is sent on AWS_ENDPOINT.com, then it will return details about origin's IP address.
If request is sent on AWS_ENDPOINT.com/IP_ADDRESS (ie. xxxxx123-api.us-east-2.amazonaws.com/123.45.67.78) then it will return details about IP address mentioned in the request.
