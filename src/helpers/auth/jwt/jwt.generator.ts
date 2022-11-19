import { User } from "@apicore/teiu/lib/typeorm"
import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class JwtGenerator {

    constructor(
        private jwtService: JwtService,
    ) { }

    public generate(user: User): string {
        let token: string = this.jwtService.sign({ user: user }, {
            expiresIn: process.env.JWT_EXPIRATION,
            secret: process.env.JWT_SECRET
        })

        return token
    }
}