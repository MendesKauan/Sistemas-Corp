// ../services/userService
const { generatorToken, authUser } = require ('../auth/authServices');
const bcrypt = require('bcrypt');


class userService {
    
    constructor(userModel, departmentModel) {
        this.userModel = userModel;
        this.departmentModel = departmentModel;
    }

    async create(nome, email, senha, nameDepartment) {
        try {
            const encryptedPassword = await bcrypt.hashSync(senha, 10);

            const department = await this.departmentModel.findOne({
                where: {
                    name: nameDepartment
                }
            });

            const newUser = await this.userModel.create (
                {
                    name : nome,
                    email : email,
                    password : encryptedPassword,
                    IdDepartment : department.id
                }
            );
            
            newUser.password = '';
            return newUser ? newUser  : null;

        } catch (error) {
            
        }
    }

    async login(email, password) {
        try {
            
            const user = await this.userModel.findOne({
                where:{email : email}
            });
            if(!user) {
                throw new Error('Usuario não encontrado');
            }

            const authPassword = await authUser(user, password);
            if (!authPassword) {
                throw new Error('Senha incorreta');
            }

            const token = generatorToken(user);
            return token;

        } catch (error) {
            
        }
    }

    async update(nameUser, updates) {
        try {
            const userUpdate = await this.userModel.findOne({
                where: {
                    name: nameUser
                }
            });

            await userUpdate.update(updates);
            return userUpdate;
            
        } catch (error) {
            
        }
    }

    async getAllUser(limit = 10, offset = 0, order = [['createdAt', 'DESC']]) {
        try {
            const AllUser = await this.userModel.findAll({
                limit: limit,
                offset: offset,
                order: order
            });
            return AllUser;

        } catch (error) {
            console.error("Error finding Users:", error);
            throw error;
        }
    }

    async getUserByName(UserName) {
        try {
            const User = this.userModel.findOne({
                where:{
                    name : UserName
                }
        });

        return User ? User : null;
        } catch (error) {
            throw error;
        }
    }

    async getUsersByDepartment(departmentName) {
        try {
            const department = await this.departmentModel.findOne({
                where: { name: departmentName },
                include: [{ model: this.userModel, as: 'Users' }]
            });

            if (!department) { throw new Error('Departamento não encontrado'); }

            if (!department.Users) { return []; }

            const users = department.Users.map(user => {
                user.password = '********';
                return user;
            });

            return users;

        } catch (error) {
            console.error("Error finding Users by Department:", error);
            throw error;
        }
    }

}

module.exports = userService;