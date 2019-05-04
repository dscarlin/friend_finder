const friendsObjArray = require('../data/friends')

module.exports = (app) => {

    app.get('/api/friends', (req, res) => {
       res.json(friendsObjArray)
    })

    app.post('/api/friends', (req, res) => {
        console.log(req.body);
        let bestFriendMatchInfoObj = require('../logic/calculateBestMatch.js')(req, friendsObjArray)
        res.json(bestFriendMatchInfoObj);
        friendsObjArray.push(req.body);
    })
    
}