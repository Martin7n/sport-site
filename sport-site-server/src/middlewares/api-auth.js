
export const apiKeyMware = (req, res, next) => {

  const clientKey = req.headers['x-api-key'];
  const serverKey = process.env.API_KEY;

  if (clientKey && clientKey === serverKey) {
    next();  
  } else {
    res.status(403).json({ message: 'Forbidden: Invalid API key' });
  }

};