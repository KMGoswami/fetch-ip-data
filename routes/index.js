var express = require('express');
var router = express.Router();
const requestIp = require('request-ip');
const axios = require('axios');

router.get('/:ip', function(req, res, next) {
	let ipData = null;
	let asnData = null;
	let ipaddress = req.params.ip.toString();
	if  (!(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress))) {  
	    res.send({status: "Error", error: "You have specified invalid IPv4 addresss."});  
	}
	let url = "https://api.ipdata.co/"+ ipaddress +"?api-key=ENTER_YOUR_API_KEY";
	axios.get(url).then(response => {
		ipData = response.data;
		url = "https://api.bgpview.io/ip/"+ ipaddress;
		axios.get(url).then(asn => {
			asnData = asn.data;
			let userData = {};
			userData.status = "OK"
			userData.ipData = ipData;
			userData.asnData = asnData;
			res.send(userData);
		}).catch(error =>{
			console.log(error);
		});			
	}).catch(error =>{
		console.log(error);
	});

});

//If IP address is not mentioned in the request, use user's ip address.
router.get('/', function(req, res, next) {
	let userIP = requestIp.getClientIp(req);
	let ipData = null;
	let url = "https://api.ipdata.co/"+ userIP.toString() +"?api-key=ENTER_YOUR_API_KEY";

	axios.get(url).then(response => {
		ipData = response.data;
		url = "https://api.bgpview.io/ip/"+ userIP.toString();
		axios.get(url).then(asn => {
			asnData = asn.data;
			let userData = {};
			userData.status = "OK"
			userData.ipData = ipData;
			userData.asnData = asnData;
			res.send(userData);
		}).catch(error =>{
			console.log(error);
		});			
	}).catch(error =>{
		console.log(error);
	});
});

module.exports = router;
