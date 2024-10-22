import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import generateTokens from '../../utils/generate/generateToken';
import setTokensCookies from '../../utils/generate/setTokenCookies';
import { Customer } from '../../models/Customer';

interface LoginRequestBody {
  email: string;
  password: string;
}
export const LoginCustomer = async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'failed',
        message: 'Email and password are required.',
      });
    }

    // Fetch customer from MongoDB using the email
    const customer = await Customer.findOne({ email });

    if (!customer || !customer.password) {
      return res.status(404).json({
        status: 'failed',
        message: 'Invalid email or password.',
      });
    }

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, customer.password);

    if (!isMatch) {
      return res.status(401).json({
        status: 'failed',
        message: 'Invalid email or password.',
      });
    }

    // Generate tokens using the customer information
    const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } = await generateTokens(customer);

    // Set tokens in cookies
    setTokensCookies(res, accessToken, refreshToken, accessTokenExp, refreshTokenExp);

    // Update the customer's isActive status in the database
    customer.isVerified = true; // or any other logic you want to set
    await customer.save();

    const roles = customer.roles.map(role => role);

    return res.status(200).json({
      status: 'success',
      message: 'Login successful.',
      customer: {
        id: customer._id,
        email: customer.email,
        firstname: customer.firstname,
        lastname: customer.lastname,
        telephone: customer.telephone,
        gender: customer.gender,
        birthday: customer.birthday,
        roles,
        isActive: true,
      },
      access_Token: accessToken,
      refresh_Token: refreshToken,
      access_Token_Expiration: accessTokenExp,
      refresh_Token_Expiration: refreshTokenExp,
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({
      status: 'failed',
      message: 'An error occurred while processing your request. Please try again later.',
    });
  }
};
