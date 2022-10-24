import { Injectable } from "@nestjs/common";
import { Like } from "typeorm";

@Injectable()
export class Filter<T> {
    public build(object: T) {
        Object.keys(object).forEach(attr => {
            if(!object[attr]) {
                delete object[attr]
            } else {
                if(typeof(object[attr] === 'string')) {
                    object[attr] = Like(`%${object[attr]}%`)
                }
            }
        })

        return object
    }
}