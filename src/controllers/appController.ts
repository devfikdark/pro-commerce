import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import catchAsync from "../util/catchAsync";
import User from "../models/userModel";

export class appController {
  // Create user
  public signUp = async (req: Request, res: Response) => {
    res.setHeader("Content-type", "application/json");
    try {
      const { email, password, passwordConfirm, phone } = req.body;
      if (password !== passwordConfirm) {
        return this.sendMessage(res, "Password not match.");
      }
      const reqObj = {
        email,
        password,
        phone,
      };

      let createUser = await User.create(reqObj);
      createUser.password = undefined;
      this.sendCreateToken(createUser, res);
    } catch (err) {
      res.json({ err });
    }
  }

  // JWT token session
  public createToken = id => {
    return jwt.sign({
        id
      },
      process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    );
  };

  public sendCreateToken = (user, res) => {
    const myToken = this.createToken(user._id);
    res.json({
      status: "ok",
      token: myToken,
      user
    });
  };

  // Response session
  public sendMessage = (res, message) => {
    res.json({
      status: "failed",
      message: message,
    });
  };
}

/*
// Make JWT token
const createToken = id => {
  return jwt.sign({
      id
    },
    process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );
};

const sendCreateToken = (user, res) => {
  const myToken = createToken(user._id);
  res.json({
    status: "ok",
    token: myToken,
    user
  });
};

export const signUp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-type', 'application/json');
  try {
    const {
      email,
      password,
      passwordConfirm,
      phone
    } = req.body;
    if (password !== passwordConfirm) {
      return sendMessage(res, 'Password not match.');
    }
    const reqObj = {
      email,
      password,
      phone
    }

    return res.json({reqObj});

    let createUser = await User.create(reqObj);
    createUser.password = undefined;
    sendCreateToken(createUser, res);
  } catch (error) {
    
  }
});

export const logIn = catchAsync(async (req, res, next) => {
  res.setHeader('Content-type', 'application/json');

  const {
    email,
    password
  } = req.body;

  // Check email and password exist
  if (!email || !password) {
    return next(
      new AppError(
        'provide email and password',
        400
      )
    );
  }

  // Check if user exists & password is correct
  let user = await User.findOne({
    email
  }).select('+password');
  if (!user || !(await user.comparePassword(password, user.password))) {
    sendMessage(res, 401, "Incorrect email or password")
  }

  try {
    // response data
    user.password = undefined; // hide pass from response
    sendCreateToken(user, 200, res);
  } catch (error) {
    return next(
      new AppError(
        'Somthing problem here!!!',
        500
      )
    );
  }
});

const sendMessage = (res, message) => {
  res.json({
    status: "failed",
    message: message
  });
};
*/
