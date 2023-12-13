import { Router, Request, Response } from 'express';
const router: Router = Router();

/* GET home page. */
router.get('/', (req: Request, res: Response) => {
	res.json({ title: 'Express' });
});

export default router;
