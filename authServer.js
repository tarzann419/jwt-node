// this server is for auth



require('dotenv').config();


const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');


// make surre our application can use/get json
app.use(express.json());


app.post('/login', (req, res) => {
    //authenticate userr
    const username = req.body.username;
    const user = { name: username }


    // sign: (payload)
    // serialize user obj
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET) 

    // return access token as json
    res.send({ accessToken: accessToken, refreshToken: refreshToken})


    // when trying to log in, it checks if you are the authorised user then creates a jwt for the user and stores all the necessary details in the jwt.
})



function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}


app.listen(3030);