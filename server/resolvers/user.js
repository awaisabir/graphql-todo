export default {
    Query: {
        getUser: (parent, {id}, {models}) => models.User.findOne({where: { id }}),
    },
    //args refer to the passed in params username, password
    Mutation: {
        register: (parent, {username, password}, {models}) => (
            new Promise (async (resolve, reject) => {
                try {
                        const user = await models.User.saveUser({username, password});
                        resolve({success: true, message: 'Successfully Registered'});
                    } catch (error) { reject({success: false, message: error.message}); }
                })
        )
    },
};