import ErrorType from "./types"

const errorMessages = {
    [ErrorType.UnexpectedError]: "An unexpected error occurred.",
    [ErrorType.UsernameExist]: "The user with the username already exists.",
    [ErrorType.EmailExist]: "The user with the email already exists.",
    [ErrorType.ValidationError]: "The data you sent is not valid.",
    [ErrorType.LoginFailed]: "Failed to login.",
    [ErrorType.AccessDenied]: "Access denied.",
    [ErrorType.NotExist]: "Not Exist"
}

export default errorMessages
