import mongoose from "mongoose";

export const deletedObject = new mongoose.Schema({
  deleted: { type: mongoose.Schema.Types.Mixed, default: {} },
});
export const DeletedObject = mongoose.model("DeletedObject", deletedObject);

export default DeletedObject;
