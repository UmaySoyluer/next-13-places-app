import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();
    return response.status(200).json(places);
  }

  if (request.method === "POST") {
    try {
      const newPlaceData = request.body;
      const createdPlace = await Place.create(newPlaceData);

      if (!createdPlace) {
        throw new Error("The place is not created.");
      }

      return response
        .status(200)
        .json({ status: "New place succesfully created." });
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.message });
    }
  }
}
