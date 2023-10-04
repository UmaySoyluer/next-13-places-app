import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      throw new Error("The place doesn't found.");
    }
    response.status(200).json(place);
  }
  if (request.method === "PATCH") {
    const placeToUpdate = request.body;
    const updatedPlace = await Place.findByIdAndUpdate(id, placeToUpdate);

    if (!updatedPlace) {
      throw new Error("The place doesn't edited.");
    }
    response.status(200).json(updatedPlace);
  }

  if (request.method === "DELETE") {
    const deletedPlace = await Place.findByIdAndDelete(id);

    if (!deletedPlace) {
      throw new Error("The place couldn't deleted.");
    }

    return response.status(200).json({ status: "Place deleted." });
  }
}
