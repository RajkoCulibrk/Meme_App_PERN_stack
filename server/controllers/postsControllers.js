import pool from "../db/index.js";
import cloudinary from "../utility/cloudinary.js";
import validator from "express-validator";
import ApiError from "../utility/ApiError.js";

const { validationResult } = validator;
export const addPost = async (req, res, next) => {
  /* console.log(req); */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(ApiError.badRequest(errors.errors[0].msg));
  }
  try {
    const user = req.user;
    const title = req.body.title;
    const result = await cloudinary.uploader.upload(req.file.path);
    const { public_id, secure_url } = result;
    const post = await pool.query(
      "INSERT INTO POSTS (title, image_public_url, image_public_id, user_id ) VALUES ($1, $2, $3, $4) returning *",
      [title, secure_url, public_id, user]
    );
    res.status(201).json({ data: { post: post.rows[0] } });
  } catch (err) {
    console.log(err.message);
    next(ApiError.internal(err.message));
  }
};
