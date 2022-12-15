import { Router } from 'express';

const router = Router();

router.get('/', (_, res) => {
  return res.json({ hello: 'world' }).end();
});

export { router };
