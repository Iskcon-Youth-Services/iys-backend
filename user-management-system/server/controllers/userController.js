const userModels = require('../models/userModels')
const userServices = require('../services/userServices')

const welcome = (req, res) => {
    // console.log(req.session);
    // req.session.passport=req.session.passport;
    if(req.session.username)
    res.send(`Welcome to the User Management System! ${req.session.username}`);
    else if(req.session.passport)
    res.send(`Welcome to the User Management System! ${req.session.passport.user}`);
    else
    res.send("Unauthorised not login yet");
};
const users = async (req, res) => {
    let data = [];
    // console.log(req.session);
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


const submitSadhanaForm = async (req,res) => {
    const {nidraToBed, nidraWakeUp, nidraDaySleep, japa, pathanMin,sravanMin} = req.body;
  
    var scoreMap=[25,20,15,10,5,0,-5];
    let nidraToBedScore=scoreMap[nidraToBed];
    let nidraWakeUpScore=scoreMap[nidraWakeUp];
    let nidraDaySleepScore=scoreMap[nidraDaySleep];
    let japaScore=scoreMap[japa];
    
    let pathanScore=userServices.calculatePathanScore(parseInt(pathanMin[0]),parseInt(pathanMin[1]),parseInt(pathanMin[2]));
    let sravanScore=userServices.calculateSravanScore(parseInt(sravanMin[0]),parseInt(sravanMin[1]),parseInt(sravanMin[2]));
    let total=nidraToBedScore+nidraWakeUpScore+nidraDaySleepScore+japaScore+pathanScore+sravanScore;
    let user_id=await userServices.getUserId(req);
    let score={user_id,nidraToBedScore,nidraWakeUpScore,nidraDaySleepScore,japaScore,pathanScore,sravanScore,total};

   

  
   
    
    
    await userModels.submitSadhanaForm(score);
    res.status(201).json({ message: 'Sadhana form submitted successfully' });
}

const getSadhanaReport = async (req, res) => {
    let data = [];
    try {
       
        let user_id=userServices.getUserId(req);
        
        data =  await userModels.getSadhanaReport([user_id,req.body.startDate,req.body.endDate]);
        res.send({report:data});
        console.log({report: data});
    } catch (err) {
        res.json({msg: err, data: []});
    }
};

const submitUserDetails = async (req, res) => {
    try {
        console.log('Session Data:', req.session);
        // Extract details from the form submission
        const {
            first_name, last_name, email, mobile, date_of_birth,
            address_line1, address_line2, city, state, postal_code,
            country, gender, profile_picture_url, bio
        } = req.body;

        // Debugging session data
        console.log('Session Data:', req.user);

        let user_id=await userServices.getUserId(req);

        // Create a userData object to pass to the model
        const userData = {
            user_id, first_name, last_name, email, mobile, date_of_birth,
            address_line1, address_line2, city, state, postal_code,
            country, gender, profile_picture_url, bio
        };

        // Insert the user into the database
        const newUser = await userModels.submitUserDetails(userData);
        console.log('User inserted:', newUser);

        res.send('User details submitted successfully!');
    } catch (err) {
        console.error('Error inserting user:', err.message);
        res.status(500).send('Internal Server Error');
    }
};


const updateUserDetails =  async (req, res) => {
    try {
        // Extract details from the form submission
        const {
            first_name,last_name, email, mobile, date_of_birth,
            address_line1, address_line2, city, state, postal_code,
            country, gender, profile_picture_url, bio
        } = req.body;

        let user_id=await userServices.getUserId(req);
        // Create a userData object to pass to the model
        const userData = {
            user_id, first_name,last_name, email, mobile, date_of_birth,
            address_line1, address_line2, city, state, postal_code,
            country, gender, profile_picture_url, bio
        };

        // Insert the user into the database
        const newUser = await userModels.updateUserDetails(userData);
        console.log('User profile updated:', newUser);

        res.send('User details submitted successfully!');
    } catch (err) {
        console.error('Error inserting user:', err);
        res.status(500).send('Internal Server Error');
    }
};

const getTopSadhanaScorer = async (req, res) => {
    let data = [];
    try {
       
        let user_id=userServices.getUserId(req);
        
        data =  await userModels.getTopSadhanaScorer([user_id,req.body.startDate,req.body.endDate,req.body.numberOfTopScorers]);
        res.send({report:data});
        console.log({report: data});
    } catch (err) {
        res.json({msg: err, data: []});
    }
};
// Export the function
module.exports = { welcome,users , signup,login,submitSadhanaForm,logout , getSadhanaReport, submitUserDetails, updateUserDetails ,getTopSadhanaScorer};

