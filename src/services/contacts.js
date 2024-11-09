import { ContactCollection } from "../db/models/Contact.js";

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
}) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = ContactCollection.find();

  if (typeof filter.type !== "undefined") {
    contactQuery.where("contactType").equals(filter.type);
  }

  if (typeof filter.isFavorite !== "undefined") {
    contactQuery.where("isFavourite").equals(filter.isFavorite);
  }

  const [total, contacts] = await Promise.all([
    ContactCollection.countDocuments(contactQuery),
    contactQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(total / perPage);

  return {
    data: contacts,
    page: page,
    perPage: perPage,
    totalItems: total,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: totalPages - page > 0,
  };
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
