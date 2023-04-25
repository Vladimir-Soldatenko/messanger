class CustomMainError extends Error {
  constructor(message) {
    super(message);
  }
}

class WrongParametrsError extends CustomMainError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class Unauthorized extends CustomMainError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class FollowError extends CustomMainError {
  constructor(message) {
    super(message);
    this.status = 403;
  }
}

module.exports = {
  CustomMainError,
  WrongParametrsError,
  Unauthorized,
  FollowError,
};
