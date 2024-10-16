/**
 * Middleware to authenticate a user using Firebase Authentication tokens.
 * @param {object} req - The request object containing the token in the headers.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function to call if authentication passes.
 */
export async function authenticateUser(req, res, next) {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
  
    try {
      const decodedToken = await firebase.auth().verifyIdToken(token);
      req.user = decodedToken;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized', error });
    }
  }
  