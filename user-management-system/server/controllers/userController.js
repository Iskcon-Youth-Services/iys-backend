const userModels = require('../models/userModels')
const welcome = (req, res) => {
    if(req.session.username)
    res.send(`Welcome to the User Management System! ${req.session.username}`);
    else
    res.send("Unauthorised not login yet");
};
const users = getUsers = async (req, res) => {
    let data = [];
    try {
        data = await userModels.getUsers();
        res.send({users:data});
        console.log({users: data});
    } catch (err) {
        res.json({msg: err, data: []});
    }
};


const signup = async(req, res) => {
    
    await userModels.signupUsers(req.body);
    
    
    
    res.status(201).json({ message: 'User signed up successfully' });
};
const login = async (req,res)=> {
    try{
   const userDetails= await userModels.loginUser(req.body.username,req.body.password);
//    req.session.userId = user.id;
   req.session.username = req.body.username;
   res.status(201).json({ message: 'login successfully done' , user: userDetails});
    }
    catch(err){
        res.status(401).json({ message: 'wrong username and password' });
    }
}
const logout = async (req,res)=> {
  

        req.session.destroy((err) => {
            if (err) {
                console.error('Session destruction failed:', err);
                return res.status(500).json({ message: 'Session destruction failed' });
            }

            res.clearCookie('connect.sid'); // Clear the session cookie
            res.status(200).json({ message: 'Logged out successfully' });
        });
    
}
function calculatePathanScore(spBooksMinutes, otherBooksMinutes, slokaMinutes) {
    let score = 0;
    spBooksMinutes=spBooksMinutes*7;
    otherBooksMinutes=otherBooksMinutes*7;
    slokaMinutes=slokaMinutes*7;

    
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

    return score/7;
}

function calculateSravanScore(guruMinutes, spMinutes, otherMinutes) {
    let score = 0;
    guruMinutes=guruMinutes*7;
    spMinutes=spMinutes*7;
    otherMinutes=otherMinutes*7;
    
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

    return score/7;
}

const submitSadhanaForm = async(req,res) => {
    const {nidraToBed, nidraWakeUp, nidraDaySleep, japa, pathanMin,sravanMin} = req.body;
    var scoreMap=[25,20,15,10,5,0,-5];
    let nidraToBedScore=scoreMap[nidraToBed];
    let nidraWakeUpScore=scoreMap[nidraWakeUp];
    let nidraDaySleepScore=scoreMap[nidraDaySleep];
    let japaScore=scoreMap[japa];
    let username=req.session.username;
    let pathanScore=calculatePathanScore(parseInt(pathanMin[0]),parseInt(pathanMin[1]),parseInt(pathanMin[2]));
    let sravanScore=calculateSravanScore(parseInt(sravanMin[0]),parseInt(sravanMin[1]),parseInt(sravanMin[2]));
    let total=nidraToBedScore+nidraWakeUpScore+nidraDaySleepScore+japaScore+pathanScore+sravanScore;
    let score={username,nidraToBedScore,nidraWakeUpScore,nidraDaySleepScore,japaScore,pathanScore,sravanScore,total};
    
    await userModels.submitSadhanaForm(score);
    res.status(201).json({ message: 'Sadhana form submitted successfully' });
}

const getSadhanaReport = async (req, res) => {
    let data = [];
    try {
        let username=req.session.username;
        data = await userModels.getSadhanaReport([username,req.body.startDate,req.body.endDate]);
        res.send({report:data});
        console.log({report: data});
    } catch (err) {
        res.json({msg: err, data: []});
    }
};
// Export the function
module.exports = { welcome,users , signup,login,submitSadhanaForm,logout , getSadhanaReport };

