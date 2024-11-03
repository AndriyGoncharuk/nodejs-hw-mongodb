import { Router } from "express";
import {
  createContactsController,
  deleteContactController,
  getContactsByIdController,
  getContactsController,
  patchContactController,
} from "../controllers/contacts.js";

const router = Router();

router.get("/contacts", getContactsController);

router.get("/contacts/:contactId", getContactsByIdController);

router.post("/contacts", createContactsController);

router.patch("/contacts/:contactId", patchContactController);

router.delete("/contacts/:contactId", deleteContactController);

export default router;
