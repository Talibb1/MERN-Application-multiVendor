import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import generateTokens from '../../../utils/generate/generateToken';
import setTokensCookies from '../../../utils/generate/setTokenCookies';
import { Customer } from '../../../models/Customer';
import { Device } from '../../../models/Address';
import { CustomerActivity, ActivityType } from '../../../models/Customer';
import logger from '../../../logs/logger';
import UAParser from 'ua-parser-js';

interface LoginRequestBody {
  email: string;
  password: string;
}

export const LoginCustomer = async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
  try {
    const { email, password } = req.body;

    // Step 1: Check for missing fields
    if (!email || !password) {
      return res.status(400).json({
        status: 'failed',
        message: 'Email and password are required.',
      });
    }
    const customer = await Customer.findOne({ email });

    if (!customer || !customer.password) {
      logger.warn(`Login attempt with invalid email: ${email}`);
      return res.status(404).json({
        status: 'failed',
        message: 'Invalid email or password.',
      });
    }
    if (!customer.isVerified) {
      logger.info(`Unverified login attempt for email: ${email}`);
      return res.status(403).json({
        status: 'failed',
        message: 'Email not verified. Please verify your email to log in.',
      });
    }
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      logger.warn(`Failed login attempt for email: ${email}`);
      return res.status(401).json({
        status: 'failed',
        message: 'Invalid email or password.',
      });
    }
    const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } = await generateTokens(customer);
    setTokensCookies(res, accessToken, refreshToken, accessTokenExp, refreshTokenExp);
    customer.isActive = true;
    await customer.save();

    const uaParser = new UAParser();
    const userAgent = req.headers?.['user-agent'] ?? ''; 
    const result = uaParser.setUA(userAgent).getResult();
    logger.info(`Parsed Device Info: ${JSON.stringify(result)}`);

    // Step 9: Prepare device data and save
    const deviceData = {
      userId: customer._id,
      deviceType: result.device.type || 'unknown',
      os: result.os.name || 'unknown',
      browser: result.browser.name || 'unknown',
      ip: req.ip || 'unknown',
      lastLogin: new Date(),
    };
    const device = new Device(deviceData);
    await device.save();

    const loginActivity = new CustomerActivity({
      customerId: customer._id,
      activityType: ActivityType.LOGIN,
      activityData: {
        ip: req.ip || 'unknown',
        deviceType: result.device.type || 'unknown', 
        os: result.os.name || 'unknown', 
        browser: result.browser.name || 'unknown',
        timestamp: new Date(),
      },
    });

    await loginActivity.save();
    const roles = customer.roles.map((role) => role);

    return res.status(200).json({
      status: 'success',
      message: 'Login successful.',
      customer: {
        id: customer._id,
        email: customer.email,
        firstname: customer.firstname,
        lastname: customer.lastname,
        telephone: customer.telephone,
        roles,
        isActive: customer.isActive,
      },
      access_Token: accessToken,
      refresh_Token: refreshToken,
      access_Token_Expiration: accessTokenExp,
      refresh_Token_Expiration: refreshTokenExp,
    });
  } catch (error: any) {
    logger.error(`Error during login for email ${req.body.email}: ${error.message}`);
    return res.status(500).json({
      status: 'failed',
      message: 'An error occurred while processing your request. Please try again later.',
    });
  }
};
