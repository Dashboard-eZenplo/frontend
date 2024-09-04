export class UserDTO {
    user_id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    cnpj: string;
    iSadmin: boolean;

    constructor(user_id: string, name: string, email: string, password: string, phone: string, cnpj: string, isAdmin: boolean) {

        this.user_id = user_id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.cnpj = cnpj;
        this.iSadmin = isAdmin;
    }

    get userData() {
        return {
            user_id: this.user_id,
            name: this.name,
            email: this.email,
            password: this.password,
            phone: this.phone,
            cnpj: this.cnpj,
            isAdmin: this.iSadmin
        }
    }
}