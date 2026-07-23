import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'tripvault_fallback_secret_key_2026';
  return jwt.sign({ id }, secret, {
    expiresIn: '30d'
  });
};

export const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET || 'tripvault_fallback_secret_key_2026';
  return jwt.verify(token, secret);
};
