import mongoose from "mongoose";

export function watchChangeThenUpdateToLog(
  dataModel: mongoose.Model<any>,
  logModel: mongoose.Model<any>,
) {
  dataModel.watch().on("change", async (data) => {
    const newDoc: any = await dataModel
      .findOne({ _id: data.documentKey._id }, { lastModifyBy: 1 })
      .lean();

    if (newDoc) {
      const log = {
        document: data.documentKey._id,
        operation: data.operationType,
        triggerBy: newDoc.lastModifyBy,
        changeData: getChangeData(data),
      };
      await logModel.create(log);
    }
  });
}

function getChangeData(data: any) {
  switch (data.operationType) {
    case "delete":
      return null;
    case "update":
      return data.updateDescription.updatedFields;
    case "insert":
      return data.fullDocument;
  }
}
