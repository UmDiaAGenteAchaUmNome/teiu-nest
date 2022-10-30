import { Injectable } from "@nestjs/common";
import { Like } from "typeorm";

@Injectable()
export class Filter<T> {
    public build(filters: T) {
        Object.keys(filters).forEach(attr => {
            if(!filters[attr]) {
                delete filters[attr]
            } else {
                if(typeof(filters[attr] === 'string')) {
                    filters[attr] = Like(`%${filters[attr]}%`)
                }
            }
        })

        return filters
    }
}