function conflictError(message) {
  return {
    name: "ConflictError",
    message,
  };
}

function duplicatedEmailError(email) {
  return {
    name: "DuplicatedEmailError",
    message: "Email is already been used",
    email,
  };
}

function acessDeniedError() {
  return {
    name: "acessDeniedError",
    message: "You do not have acess to this application"
  }
}

function unauthorizedError() {
  return {
    name: "UnauthorizedError",
    message: "You must be signed in to continue",
  };
}

function notFoundError() {
  return {
    name: "NotFoundError",
    message: "No result was found",
  };
}

function invalidCredentialsError() {
  return {
    name: "InvalidCredentialsError",
    message: "Email or password are incorrect",
  };
}

function badRequest(){
  return {
    name: "BadRequest",
    message: "Doctor and patient are the same person"
  }
}

export default {
  conflictError,
  duplicatedEmailError,
  unauthorizedError,
  notFoundError,
  invalidCredentialsError,
  acessDeniedError,
  badRequest
};