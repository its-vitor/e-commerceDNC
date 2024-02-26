import { Router } from "express";
import rateLimit from "express-rate-limit";
import * as routes from './middlewares/middlewares'
import { Response, Request, RequestHandler, NextFunction } from "express";

export function resolver(handlerFn: RequestHandler) {
    return (req: Request, res: Response, next: NextFunction) => {
        return Promise.resolve(handlerFn(req, res, next))
            .catch(e => next(e))
    }
}

/** 
 * `Router` é responsável por encapsular todas as rotas da aplicação e
 * exportá-la para "app.ts" em "src"
*/
const router = Router();

router.post('/register/product', resolver(routes.registerProduct));
router.post('/register/client', resolver(routes.createClient));
router.post('/buy', resolver(routes.buyProduct));
router.post('/purchase/accept', resolver(routes.approvedPurchase));
router.post('/purchase/decline', resolver(routes.declinePurchase));

export default router;