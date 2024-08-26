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
const submitSadhanaForm = async(req,res) => {
    const {nidraToBed, nidraWakeUp, nidraDaySleep, japa, pathan,sravan} = req.body;
    var scoreMap=[25,20,15,10,5,0,-5];
    let nidraToBedScore=scoreMap[nidraToBed];
    let nidraWakeUpScore=scoreMap[nidraWakeUp];
    let nidraDaySleepScore=scoreMap[nidraDaySleep];
    let japaScore=scoreMap[japa];
    let username=req.session.username;
    let score={username,nidraToBedScore,nidraWakeUpScore,nidraDaySleepScore,japaScore,pathan,sravan};
    
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

