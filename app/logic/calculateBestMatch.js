module.exports = (req, friendsObjArray ) => {
    let userAnswers = req.body.ansArray;
    let diffsArray = [];

    friendsObjArray.forEach(friend => {
        let compareAnswers = friend.ansArray;
        let diffs = compareAnswers.map((ans, i ) => Math.abs(ans - userAnswers[i]));
        let diffsTotal = diffs.reduce((accumulator, currentValue) => accumulator + currentValue);
        diffsArray.push(diffsTotal);
    });

    let leastDiffs = Math.min(...diffsArray);
    let bestFriendMatchIndex = diffsArray.indexOf(leastDiffs);
    let bestFriendMatch = friendsObjArray[bestFriendMatchIndex];
    return {
        name: bestFriendMatch.name,
        photo: bestFriendMatch.photo
    };
}