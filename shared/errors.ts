// TODO add localization

export interface ErrorModel {
  code: number;
  message: string;
}

class Errors {

  static notXHR(): ErrorModel {
    return {
      code: 403,
      message: 'Please add \'X-Requested-With\' header with \'xmlhttprequest\' value'
    };
  }

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

  static unregrettableError(): ErrorModel {
    return {
      code: 500,
      message: 'Something failed! Deep apologies m(_ _)m'
    };
  }
}
export default Errors;