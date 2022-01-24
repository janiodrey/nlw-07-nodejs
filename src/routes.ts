import { Router } from "express";

import { AuthUserController } from "./controllers/AuthUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { ensureAuthenticated } from "./middleware/EnsureAuthenticated";

const router = Router();

router.post("/authenticate", new AuthUserController().handle);

router.post(
  "/messages",
  ensureAuthenticated,
  new CreateMessageController().handle
);

export { router };
