import { User } from "../typeorm/user";

export class LoginDTO extends User {
    token: string

    build(user: User, token: string): LoginDTO {
        const loginDto = user as LoginDTO
        loginDto.token = token  
        
        return loginDto
    }
}