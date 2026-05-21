import type { JWTpayload } from "./type.ts";


export { };

declare global {
  namespace Express {
    interface Request {
      user:JWTpayload;
    }
  }
}