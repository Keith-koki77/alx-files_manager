import DBClient from '../utils/db.js';
import { hashPassword } from '../utils/auth.js'; 

async function postNew(req, res) {

  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({"error": "Missing email"});
  }

  if(!password) {
    return res.status(400).json({"error": "Missing password"}); 
  }

  const user = await DBClient.findUserByEmail(email);
  
  if (user) {
    return res.status(400).json({"error": "Already exists"});  
  }

  const hashedPassword = hashPassword(password);

  const newUser = await DBClient.insertUser(email, hashedPassword);
  
  return res.status(201).json({
    id: newUser._id,
    email: newUser.email
  });

}

export default { postNew };
