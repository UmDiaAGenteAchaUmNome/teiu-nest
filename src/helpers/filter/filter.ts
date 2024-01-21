import { Injectable } from "@nestjs/common"
import { Like } from "typeorm"

@Injectable()
export class Filter {
    public build(filters: any) {
        if (filters) {
            Object.keys(filters).forEach(attr => {
                if (!filters[attr]) {
                    delete filters[attr]
                } else {
                    if (typeof filters[attr] === 'string') {
                        filters[attr] = Like(`%${filters[attr]}%`)
                    }

                    if (attr === 'language') {
                        const languageId = filters[attr]
                        filters[attr] = { id: languageId }
                    }

                    if (attr === 'languageId') {
                        const languageId = filters[attr]

                        delete filters[attr]

                        filters.language = { id: languageId }
                    }
                }
            })

            return filters
        }
    }
}