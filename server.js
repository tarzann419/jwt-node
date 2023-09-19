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



app.get('/posts', (req,res) => {
    res.json(posts);
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

app.listen(3131);