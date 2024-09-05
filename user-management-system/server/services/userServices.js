const calculatePathanScore = (spBooksMinutes, otherBooksMinutes, slokaMinutes) => {
    let score = 0;
    spBooksMinutes = spBooksMinutes * 7;
    otherBooksMinutes = otherBooksMinutes * 7;
    slokaMinutes = slokaMinutes * 7;

    if (spBooksMinutes >= 840) {
        score += 50;
    } else {
        score += Math.max(0, 50 - Math.floor((840 - spBooksMinutes) / 6));
    }

    if (otherBooksMinutes >= 240) {
        score += 40;
    } else {
        score += Math.max(0, 40 - Math.floor((240 - otherBooksMinutes) / 6));
    }

    if (slokaMinutes >= 60) {
        score += 10;
    } else {
        score += Math.max(0, 10 - Math.floor((60 - slokaMinutes) / 6));
    }

    return score / 7;
};

const calculateSravanScore = (guruMinutes, spMinutes, otherMinutes) => {
    let score = 0;
    guruMinutes = guruMinutes * 7;
    spMinutes = spMinutes * 7;
    otherMinutes = otherMinutes * 7;

    if (guruMinutes >= 100) {
        score += 40;
    } else {
        score += Math.max(0, 40 - Math.floor((100 - guruMinutes) / 5) * 2);
    }

    if (spMinutes >= 100) {
        score += 40;
    } else {
        score += Math.max(0, 40 - Math.floor((100 - spMinutes) / 5) * 2);
    }

    if (otherMinutes >= 50) {
        score += 20;
    } else {
        score += Math.max(0, 20 - Math.floor((50 - otherMinutes) / 5) * 2);
    }

    return score / 7;
};
const getUserId = (req) => {
  // Check if session data exists
  if (req.session && req.session.passport && req.session.passport.user) {
    const googleId = req.session.passport.user;
    user_id = googleId;
} else if (req.session && req.session.username) {
    user_id = req.session.username;
}

if (!user_id) {
    throw new Error('User ID is undefined');
}

user_id = String(user_id);
console.log('User ID:', user_id);
return user_id;
}

// Export the functions
module.exports = {
    calculatePathanScore,
    calculateSravanScore,
    getUserId
};
