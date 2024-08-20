import express from 'express';

const router = express.Router();

router.get('/spi/users/currentuser', (req, res) => {
  res.send('Hi');
});

export { router as currentUserRouter };
