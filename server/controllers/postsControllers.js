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

export const getPosts = async (req, res, next) => {
  try {
    const posts = await pool.query("SELECT * FROM posts");
    console.log(posts);
    res.status(200).json({ data: { posts: posts.rows } });
  } catch (err) {
    console.log(err.message);
    next(ApiError.internal(err.message));
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user_id = req.user;
    const postToBeDeleted = await pool.query(
      "SELECT * FROM posts WHERE post_id = $1",
      [id]
    );
    if (postToBeDeleted.rows.length == 0) {
      return next(ApiError.notFound("Post not found"));
    }
    if (postToBeDeleted.rows[0].user_id !== user_id) {
      return next(ApiError.notAuthorized("You are unauthorized"));
    }
    await cloudinary.uploader.destroy(postToBeDeleted.rows[0].image_public_id);
    await pool.query("DELETE FROM posts WHERE post_id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    console.log(err.message);
    next(ApiError.internal(err.message));
  }
};

export const likeDislike = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(ApiError.badRequest(errors.errors[0].msg));
  }
  try {
    const post_id = req.params.id;
    const user_id = req.user;
    const { action } = req.body;

    if (action === "delete") {
      await pool.query(
        "DELETE FROM likesdislikes WHERE user_id= $1 AND post_id = $2",
        [user_id, post_id]
      );
      return res.status(204).json({ data: { status: false } });
    }
    const result = await pool.query(
      "INSERT INTO likesdislikes (post_id, user_id, value) VALUES ($1, $2 ,$3) ON CONFLICT (post_id, user_id) DO UPDATE SET value = EXCLUDED.value RETURNING *",
      [post_id, user_id, action]
    );
    res.status(202).json({ data: { status: result.rows[0].value } });
  } catch (err) {
    console.log(err.message);
  }
};

export const checkLikeDislikeStatus = async (req, res, next) => {
  try {
    const post_id = req.params.id;
    const user_id = req.user;
    const result = await pool.query(
      "SELECT * FROM  likesdislikes WHERE user_id = $1 AND post_id = $2",
      [user_id, post_id]
    );
    if (result.rows.length === 0) {
      return res.status(200).json({ data: { status: false } });
    }
    return res.status(200).json({ data: { status: result.rows[0].value } });
  } catch (err) {
    console.log(err.message);
  }
};
