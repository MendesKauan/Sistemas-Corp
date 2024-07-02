// ./controller/userController.js


class userController {
    constructor(userService) {
        this.userService = userService;
    }

    async create(req, res) {
        const {name, email, password, nameDepartment} = req.body; //será alterado pq tem um erro de codigo

        try {

            const newUser = await this.userService.create(name, email, password, nameDepartment);
            res.status(200).json(newUser);

        } catch (error) {
            res.status(500).json({error:'erro ao inserir novo usuario'});
        }
    }

    async getAllUser(req, res) {
        try {
            const AllUsers = await this.userService.getAllUser();

            AllUsers.forEach(user => { user.password = '********'; });

            res.status(200).json(AllUsers);    

        } catch (error) {
            res.status(400).json({error:'usuarios não localizados'})
        }
    }

    async getUserByName(req, res) {
        const { name } = req.body;

        try {
                const UserByName = await this.userService.getUserByName(name);

                if (UserByName) { UserByName.password = '*******' }

                res.status(200).json(UserByName);
        } catch (error) {
            res.status(400).json({error:'usuario não localizado'})
            
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {   
            const token = await this.userService.login(email, password);
            res.status(200).json({'token' : token});
        } catch (error) {
            res.status(400).json({error:'deu ruim na geração do token'});
        }
    }

    async getUsersByDepartment(req, res) {
        const { departmentName } = req.body;
        try {
            const UsersByDepartment = await this.userService.getUsersByDepartment(departmentName);

            res.status(200).json(UsersByDepartment); 
            
        } catch (error) {
            
        }
    }

    async update(req, res) {
        const { nameUser, updates } = req.body;
        try {
            const userUpdate = await this.userService.update(nameUser, updates);
            if (userUpdate) { userUpdate.password = '*******' }
            res.status(200).json(userUpdate);
        } catch (error) {
            
        }
    }
}

module.exports = userController;