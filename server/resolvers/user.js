import jwt from 'jsonwebtoken';

export default {
  Query: {
      getUser: (parent, { id }, { models }) => models.User.findOne({where: { id }}),
  },
  //args refer to the passed in params username, password
  Mutation: {
    register: (parent, { username, password }, { models }) => (
      new Promise (async (resolve, reject) => {
        try {
          const user = await models.User.saveUser({username, password});
          resolve({
            success: true, 
            message: 'Successfully Registered'
          });
        } catch (error) {
          reject(JSON.stringify({
            success: false, 
            message: error.message
          }));
        }
      })
    ),
    
    login: (parent, { username, password }, { models }) => (
      new Promise(async (resolve, reject) => {
        try {
          const user = await models.User.getUserByUsername(username);
          // if user does not exist
          if (!user) {
            reject(JSON.stringify({
              success: false, 
              message: 'User with that username and/or password does not exist'
            }));
          }

          const isMatch = await models.User.comparePasswords(password, user.password);
          // if the passwords match
          if (isMatch) {
            const { id, username } = user;
            const token = jwt.sign({id, username}, process.env.SECRET, {expiresIn: '24h'});

            resolve({
              success: true, 
              message: 'Login successful!', 
              token
            });
          } else {
            reject(JSON.stringify({
              success: false, 
              message: 'Incorrect credentials'
            }));
          }
        } catch (error) {
          reject(JSON.stringify({
            success: false, 
            message: error.message
          }));
        }
      })
    )
  },
};