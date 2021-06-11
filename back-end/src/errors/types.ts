enum ErrorType {
    UnexpectedError = "unexpectedError",
    ValidationError = "validationError",
    EmailExist = "EmailAlreadyExist",
    UsernameExist = "UsernameAlreadyExist",
    LoginFailed = "loginFailed",
    AccessDenied = "accessDenied",
    NotExist= "notExist"
}

export default ErrorType
