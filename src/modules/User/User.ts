import { Request, Response, NextFunction } from "express";
import User from "../../schemas/User";
import { generateError } from "../config/function";
import dotenv from "dotenv";
import {
  UserValidation,
  changePasswordValidation,
  forgotEmailValidation,
  loginValidation,
  resetPasswordValidation,
} from "./utils/validation";
import generateToken, {
  generateResetPasswordToken,
} from "../config/generateToken";
import ResetPasswordToken from "../../schemas/ResetPasswordToken";
import SendForgotPasswordMail from "../../services/email/ForgotEmail/Templates/SendMail";
import ResetToken from "../../schemas/ResetPasswordToken";
import SendResetPasswordMail from "../../services/email/ResetEmail/Templates/SendMail";
import Company from "../../schemas/Company";
import RegisterVerifyMail from "../../services/email/RegisterEmail/Templates/SendMail";
import VerifyEmail from "../../schemas/VerifyEmail";
import ProfileDetails from "../../schemas/ProfileDetails";

dotenv.config();
const MeUser = async (req: any, res: Response): Promise<any> => {
  const profile_details = await ProfileDetails.findById(
    req.bodyData.profile_details
  );
  return res.status(200).send({
    message: `get successfully data`,
    data: { ...req.bodyData, profile_details },
    statusCode: 201,
    success: true,
  });
};

const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const result = UserValidation.validate(req.body);
    if (result.error) {
      throw generateError(result.error.details, 422);
    }

    const existUser = await User.findOne({ username: req.body.username });
    if (existUser) {
      throw generateError(`${existUser.username} user already exists`, 400);
    }

    if (req.body.role !== "admin") {
      const selectedCompany = await Company.findOne({
        _id: req.body.company?.trim(),
        is_active: true,
      });
      if (!selectedCompany) {
        throw generateError(`Company does not exist`, 400);
      }

      const user = new User({
        username: req.body.username,
        name: req.body.name,
        password: req.body.password,
        company: selectedCompany._id,
        role: req.body.role,
        is_active: selectedCompany.verified_email_allowed ? false : true,
      });
      const savedUser = await user.save();
      if (!savedUser) {
        throw generateError(`Cannot create the user`, 400);
      }

      const profileDetail = new ProfileDetails({ user: savedUser._id }); // Provide the user reference
      const createdProfileDetail = await profileDetail.save();

      savedUser.profile_details = createdProfileDetail._id; // Set profileDetails ID in the User schema
      await savedUser.save();

      if (selectedCompany.verified_email_allowed) {
        const token = generateResetPasswordToken(savedUser._id);
        const storeToken = new VerifyEmail({
          userId: savedUser._id,
          token: token,
        });
        const sendMail: any = await RegisterVerifyMail(
          savedUser.name,
          savedUser.username,
          `${process.env.FRONTEND_BASE_URL}/verify-account/${token}`
        );

        if (!sendMail.success) {
          await savedUser.deleteOne();
          await profileDetail.deleteOne();
          await storeToken.deleteOne();
          throw generateError(
            `Failed to send mail to ${req.body.username} please try again later`,
            400
          );
        }

        return res.status(200).send({
          data: `Check your email and verify your ${user.username} account`,
          statusCode: 200,
          success: true,
          message: `Check your email and verify your ${user.username} account`,
        });
      } else {
        const { password, ...userData } = savedUser.toObject();
        const responseUser = {
          ...userData,
          authorization_token: generateToken({ userId: savedUser._id }),
        };
        return res.status(200).send({
          data: responseUser,
          statusCode: 200,
          success: true,
          message: `${user.username} account has been created for the ${selectedCompany.company_name} organisation`,
        });
      }
    } else {
      const user = new User({
        username: req.body.username,
        role: req.body.role,
        is_active: false,
      });
      const createdUser = await user.save();
      if (!createdUser) {
        throw generateError(`Cannot create the user`, 400);
      }

      const token = generateResetPasswordToken(createdUser._id);
      const storeToken = new VerifyEmail({
        userId: createdUser._id,
        token: token,
      });

      const savedToken = await storeToken.save();
      const sendMail: any = await RegisterVerifyMail(
        createdUser.username,
        createdUser.username,
        `${process.env.FRONTEND_BASE_URL}/verify-account/${token}`
      );

      if (!sendMail.success) {
        await createdUser.deleteOne();
        await savedToken.deleteOne();
        throw generateError(
          `Failed to send mail to ${req.body.username} please try again later`,
          400
        );
      }

      return res.status(201).send({
        message: `${createdUser.username} account has been created. Please verify your account.`,
        data: `${createdUser.username} account has been created. Please verify your account.`,
        statusCode: 201,
        success: true,
      });
    }
  } catch (err) {
    next(err);
  }
};

const VerifyEmailToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = await VerifyEmail.findOne({
      token: req.params.token,
    });
    if (token) {
      const updatedData = await User.findByIdAndUpdate(
        token.userId,
        { $set: { is_active: true } },
        { new: true }
      );
      if (updatedData) {
        res.status(200).send({
          message: `Account has been verified succesfully`,
          success: true,
          data: updatedData,
          statusCode: 200,
        });
      } else {
        throw generateError(`Invalid token or token has been expired`, 400);
      }
    } else {
      throw generateError(`Invalid token or token has been expired`, 400);
    }
  } catch (err) {
    next(err);
  }
};

const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const result = loginValidation.validate(req.body);
    if (result.error) {
      throw generateError(result.error.details, 422);
    }

    const existUser = await User.findOne({ username: req.body.username });
    if (!existUser) {
      throw generateError(`${req.body.username} user does not exist`, 401);
    }

    const { password, ...userData } = existUser.toObject();
    if (password !== req.body.password) {
      throw generateError(`Invalid username and password`, 400);
    }

    const responseUser = {
      ...userData,
      authorization_token: generateToken({ userId: userData._id }),
    };

    res.status(200).send({
      message: `${existUser.username} user has been logged in successfully`,
      data: responseUser,
      statusCode: 200,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = forgotEmailValidation.validate(req.body);
    if (result.error) {
      throw generateError(result.error.details, 422);
    }

    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      throw generateError(`${req.body.username} email does not exist`, 400);
    }

    const resetData = new ResetPasswordToken({
      userId: user.id,
      token: generateResetPasswordToken(user.id),
    });
    const savedData = await resetData.save();
    if (!savedData) {
      throw generateError(`Cannot send the mail. Please try again later`, 400);
    }

    const sendMail: any = await SendForgotPasswordMail(
      user.name,
      user.username,
      `${process.env.RESET_PASSWORD_LINK}/${resetData.token}`
    );
    if (!sendMail.success) {
      await resetData.deleteOne();
      throw generateError(`Cannot send the mail. Please try again later`, 400);
    }

    res.status(200).send({
      message: `Link has been sent to ${req.body.username} email`,
      data: `Link has been sent to ${req.body.username} email`,
      statusCode: 200,
      success: true,
    });
  } catch (err: any) {
    next(err);
  }
};

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = resetPasswordValidation.validate(req.body);
    if (result.error) {
      throw generateError(result.error.details, 422);
    }

    const token = await ResetToken.findOne({ token: req.body.token });
    if (!token) {
      throw generateError(`Invalid token or token has expired`, 400);
    }

    const user = await User.findByIdAndUpdate(token.userId, {
      $set: { password: req.body.password },
    });

    if (!user) {
      throw generateError(`Invalid token or token has expired`, 400);
    }

    await token.deleteOne();
    await SendResetPasswordMail(
      user.name,
      user.username,
      `${process.env.FRONTEND_BASE_URL}`
    );

    res.status(200).send({
      message: `Password has been changed successfully`,
      data: `Password has been changed successfully`,
      statusCode: 200,
      success: true,
    });
  } catch (err: any) {
    next(err);
  }
};

// get Organisation of the organisations

const getUsersByCompany = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { is_active, position } = req.body;

    const query: any = {
      company: req.bodyData.company,
    };

    if (is_active !== undefined) {
      query.is_active = is_active;
    }

    if (position && position.length !== 0) {
      query.position = { $in: position };
    }

    const users = await User.find(query).select("-password");

    if (!users) {
      throw generateError("Something went wrong while fetching the users", 400);
    }

    res.status(200).send({
      message: "Fetch Users Successfully",
      data: users,
      statusCode: 200,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req: any, res: Response, next: NextFunction) => {
  try {
    const result = changePasswordValidation.validate(req.body);

    if (result.error) {
      throw generateError(result.error.details, 422);
    }

    const user = await User.findById(req.userId);

    if (user) {
      if (!(user.password === req.body.oldPassword)) {
        throw generateError(
          `Current Password does not match to the Old Password`,
          400
        );
      }

      user.password = req.body.newPassword;
      await user.save();
      res.status(200).send({
        message: "Password Change Successfully",
        data: "Password Change Successfully",
        statusCode: 200,
        success: true,
      });
    }

  } catch (err) {
    next(err);
  }
};

export {
  createUser,
  loginUser,
  MeUser,
  forgotPassword,
  resetPassword,
  changePassword,
  VerifyEmailToken,
  getUsersByCompany,
};
