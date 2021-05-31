enum ErrorType {
    UnexpectedError = "unexpectedError",
    ValidationError = "validationError",
    EmailExist = "EmailAlreadyExist",
    UsernameExist = "UsernameAlreadyExist",
    LoginFailed = "loginFailed",
    AccessDenied = "accessDenied"
}

export default ErrorType
