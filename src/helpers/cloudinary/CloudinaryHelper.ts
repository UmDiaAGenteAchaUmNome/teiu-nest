export class CloudinaryHelper {
    buildImageTitle(title: string): string {
        return title.replace(/ |\/|-/gi, '_').toLowerCase()
    }
}