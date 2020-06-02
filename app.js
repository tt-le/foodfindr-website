const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const app = express();
require('dotenv').config();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/failure', (req, res) => {
    res.redirect('/');
})

app.post('/', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const list_id = process.env.MAILCHIMP_LIST_ID;
    const server = process.env.MAILCHIMP_SERVER;
    const api_key = process.env.MAILCHIMP_API_KEY;

    const url = `https://${server}.api.mailchimp.com/3.0/lists/${list_id}`;
    const options = {
        method: "POST",
        auth: `user:${api_key}`,
    }
    const request = https.request(url, options, function(response){
        response.statusCode == 200 ? res.sendFile(__dirname + "/success.html") :res.sendFile(__dirname + "/failure.html");
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();

    
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on ${process.env.PORT}`);
    
});