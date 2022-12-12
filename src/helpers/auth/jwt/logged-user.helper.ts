export const getLoggedUser = (headers) => {
    const token = headers.authorization.split(" ")[1]

    return JSON.parse(Buffer.from((token.split('.')[1]), 'base64').toString()).user
}