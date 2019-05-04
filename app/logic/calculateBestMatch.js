module.exports = (req, friendsObjArray ) => {
    let userAnswers = req.body.ansArray;
    let scoresArray = [];

    friendsObjArray.forEach(friend => {
        let compareAnswers = friend.ansArray;
        
        let score = compareAnswers
        .filter((ans, i ) => {Math.abs(ans - userAnswers[i])})
        .reduce((accumulator, currentValue) => accumulator + currentValue);

        scoresArray.push(score);
    })
    
    let maxScore = Math.max(scoresArray);
    let bestFriendMatchIndex = scoresArray.indexOf(maxScore);
    let bestFriendMatch = friendsObjArray[bestFriendMatchIndex]
    return {
        name: bestFriendMatch.name,
        photo: bestFriendMatch.photo
    }
}