export interface ErrorModel {
  code: number;
  message: string;
}

class Errors {

  static noToken(): ErrorModel {
    return {
      code: 400,
      message: 'Authorization token not present in header'
    };
  }

  static unAuthorized(): ErrorModel {
    return {
      code: 401,
      message: 'Unauthorized'
    };
  }

  static noUsernamePassword(): ErrorModel {
    return {
      code: 422,
      message: 'Please enter both username and password!'
    };
  }

  static wrongCredentials(): ErrorModel {
    return {
      code: 400,
      message: 'Incorrect username or password'
    };
  }

  static missing(field: String): ErrorModel {
    return {
      code: 400,
      message: `Missing value for ${field}`
    }
  }
}
export default Errors;