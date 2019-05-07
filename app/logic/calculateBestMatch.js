module.exports = (req, friendsObjArray ) => {
    let userPhoto = req.body.photo
    let userAnswers = req.body.ansArray;
    let diffsArray = [];

    for (let i=0; i<friendsObjArray.length;i++){
        let friend = friendsObjArray[i]
        if (userPhoto == friend.photo) 
            return false
        let compareAnswers = friend.ansArray;
        let diffs = compareAnswers.map((ans, i ) => Math.abs(ans - userAnswers[i]));
        let diffsTotal = diffs.reduce((accumulator, currentValue) => accumulator + currentValue);
        diffsArray.push(diffsTotal);
    }

    let leastDiffs = Math.min(...diffsArray);
    let bestFriendMatchIndex = diffsArray.indexOf(leastDiffs);
    let bestFriendMatch = friendsObjArray[bestFriendMatchIndex];
    return {
        name: bestFriendMatch.name,
        photo: bestFriendMatch.photo
    };
}