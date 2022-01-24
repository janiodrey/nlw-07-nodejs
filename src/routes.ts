import { Router } from "express";

import { AuthUserController } from "./controllers/AuthUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { Get3LastMessageController } from "./controllers/GetLast3MessagesController";
import { ProfileUserController } from "./controllers/ProfileUserController";
import { ensureAuthenticated } from "./middleware/EnsureAuthenticated";

const router = Router();

router.post("/authenticate", new AuthUserController().handle);

router.post(
  "/messages",
  ensureAuthenticated,
  new CreateMessageController().handle
);

router.get("/messages/last-3", new Get3LastMessageController().handle);

router.get("/profile", ensureAuthenticated, new ProfileUserController().handle);

export { router };
