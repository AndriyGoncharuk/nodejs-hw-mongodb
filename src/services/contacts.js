import { ContactCollection } from "../db/models/Contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({
  page = 1,
  perPage = 1,
  sortBy = "_id",
  sortOrder = "asc",
  filter = {},
}) => {
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactCollection.find();
  if (filter.contactType) {
    contactsQuery.where("contactType").equals(filter.contactType);
  }

  if (filter.isFavourite !== undefined) {
    contactsQuery.where("isFavourite").equals(filter.isFavourite);
  }

  const [totalItems, data] = await Promise.all([
    ContactCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData({ totalItems, page, perPage });

  return { data, ...paginationData };
};

export const getContactById = async (contactId) => {
  const contact = await ContactCollection.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactCollection.create(payload);
  return contact;
};

export const updateContact = async (contactId, contact) => {
  return ContactCollection.findByIdAndUpdate(contactId, contact, {
    new: true,
  });
};

export const deleteContact = async (contactId) => {
  const contact = await ContactCollection.findByIdAndDelete({
    _id: contactId,
  });

  return contact;
};
