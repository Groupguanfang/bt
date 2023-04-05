import axios from "axios";
import { Router } from "express";
const router = Router();

export default router.all("/proxy", async (req, res) => {
  const path = req.query.nai_baota as string;
  const query = req.query;
  const body = req.body;
  delete query["nai_baota"];

  try {
    const data = await axios({
      url: path,
      params: query,
      data: body,
      method: "POST",
    });
    return res.send(data.data);
  } catch (err: any) {
    return res.send(err.response.data);
  }
});
