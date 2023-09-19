require('dotenv').config();


const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');


// make surre our application can use/get json
app.use(express.json());


const posts = [
    {
        username: 'Dan',
        title: 'post 1'
    },
    {
        username: 'Mike',
        title: 'post 2'
    }
]



app.get('/posts', authenticateToken, (req,res) => {
    res.json(posts.filter(post => post.username === req.user.name) );

    // only the user thats logged in, gets the data allocarted to them
});


app.post('/login', (req, res) => {
    //authenticate userr
    const username = req.body.username;
    const user = { name: username }


    // sign: (payload)
    // serialize user obj
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

    // return access token as json
    res.send({ accessToken: accessToken})


    // when trying to log in, it checks if you are the authorised user then creates a jwt for the user and stores all the necessary details in the jwt.
})


function authenticateToken(req, res, next){
    // get the token, verify the token and return the user that the token belongs to
    const authheader = req.headers['authorization'];
    // get the token portion
    const token = authheader && authheader.split(' ')[1];
    // what the && does: if we have a 'authheader', return the token otherwise return null

    // check if null
    if(token == null){
        return sendStatus(401);
    }
    

    // verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        } else{
            req.user = user
            next();
        }
    })
    // Bearer TOKEN
}


app.listen(3131);