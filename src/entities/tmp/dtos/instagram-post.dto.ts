import { ImageDTO } from "@apidevteam/core-teiu/lib"

export class InstagramPostDTO {
    id?: number
    image?: ImageDTO
    postLink?: string
    isActive?: boolean
}