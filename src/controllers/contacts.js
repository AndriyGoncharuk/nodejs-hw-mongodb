import createHttpError from "http-errors";
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from "../services/contacts.js";
import mongoose from "mongoose";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";
import { env } from "../utils/env.js";

import { uploadToCloudinary } from "../utils/saveFileToCloudinary.js";

const enableCloudinary = env("ENABLE_CLOUDINARY");

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const { _id: userId } = req.user;
  const filter = { ...parseFilterParams(req.query), userId };

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });

  res.json({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts,
  });
};

export const getContactsByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return next(createHttpError(400, "Invalid contact ID format"));
  }

  const contact = await getContactById(contactId, userId);

  if (!contact) {
    return next(createHttpError(404, "Contact not found"));
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactsController = async (req, res) => {
  const { _id: userId } = req.user;
  let photoUrl = null;

  if (req.file) {
    photoUrl = await uploadToCloudinary(req.file);
  }

  const data = await createContact({ ...req.body, photo: photoUrl, userId });
  // const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (enableCloudinary === "true") {
      photoUrl = await uploadToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return next(createHttpError(400, "Invalid contact ID format"));
  }

  const updatedContact = await updateContact(
    contactId,
    { ...req.body, photo: photoUrl },
    userId,
  );

  if (!updatedContact) {
    return next(createHttpError(404, "Contact not found"));
  }

  res.json({
    status: 200,
    message: "Successfully patched a contact!",
    data: updatedContact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { id: _id } = req.params;
  const contact = await deleteContact({ _id });
  if (!contact) {
    next(createHttpError(404, "Contact not found"));
  }
  res.status(204).send();
};
