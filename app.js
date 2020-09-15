const express = require("express");
const fetch = require('node-fetch');
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
//BODYPARSER MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));

//Static folder

app.use(express.static(path.join(__dirname, "public")));
// Sign up Route
app.post("/signup", (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.body;
  //Make sure fields are filled
  if (!firstName || !lastName || !email || !phoneNumber) {
    res.redirect("fail.html");
    return;
  }

  //construct request data
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
          PHONE: phoneNumber,
        },
      },
    ],
  };
  const postData = JSON.stringify(data);

  fetch('https://us2.api.mailchimp.com/3.0/lists/8633eb1fb2', {
    method: 'POST',
    headers: {
      Authorization: 'auth 6bc8ee0fdc3208d331be8baee1430dce-us2'
    },
    body: postData
  })
    .then(res.statusCode === 200 ?
      res.redirect('/success.html') :
      res.redirect('/fail.html'))
    .catch(err => console.log(err))
})









const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
