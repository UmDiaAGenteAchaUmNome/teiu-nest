import { UserDTO } from "@apidevteam/core-teiu/lib"
import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class JwtGenerator {

    constructor(
        private jwtService: JwtService,
    ) { }

    public generate(user: UserDTO): string {
        let token: string = this.jwtService.sign({ user: user }, {
            expiresIn: process.env.JWT_EXPIRATION,
            secret: process.env.JWT_SECRET
        })

        return token
    }
}