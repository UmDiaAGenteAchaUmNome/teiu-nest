import { ImageDTO } from "@apicore/teiu/lib"

export class InstagramPostDTO {
    id?: number
    image?: ImageDTO
    postLink?: string
    isActive?: boolean
}