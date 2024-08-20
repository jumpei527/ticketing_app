import express from 'express';

const router = express.Router();

router.post('/spi/users/signout', (req, res) => {
  res.send('Hi');
});

export { router as signoutRouter };
