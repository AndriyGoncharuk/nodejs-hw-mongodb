import { Router } from "express";
import {
  createContactsController,
  deleteContactController,
  getContactsByIdController,
  getContactsController,
  patchContactController,
} from "../controllers/contacts.js";
import { authenticate } from "../middlewares/authenticate.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../utils/validateBody.js";
import {
  createContactShema,
  patchContactShema,
} from "../validation/contacts.js";

import { isValidId } from "../middlewares/isValidId.js";

const router = Router();

router.use(authenticate);

router.get("/contacts", ctrlWrapper(getContactsController));

router.get(
  "/contacts/:contactId",
  isValidId,
  ctrlWrapper(getContactsByIdController),
);

router.post(
  "/contacts",
  validateBody(createContactShema),
  ctrlWrapper(createContactsController),
);

router.patch(
  "/contacts/:contactId",
  isValidId,
  validateBody(patchContactShema),
  ctrlWrapper(patchContactController),
);

router.delete("/contacts/:contactId", ctrlWrapper(deleteContactController));

export default router;
