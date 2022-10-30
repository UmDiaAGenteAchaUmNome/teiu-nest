import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptHelper {

    public async generateCryptedHash(data: string): Promise<string> {
        const hashData = await bcrypt.hash(data, process.env.SALT)

        return hashData
    }

    public async generateSalt(): Promise<string> {
        return await bcrypt.genSalt()
    }

    public async valuesMatch(reference: string, data: string): Promise<boolean> {
        return await bcrypt.compare(data, reference)
    }

}