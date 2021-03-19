import express from "express";
import authorize from "../middleware/authorization.js";
const router = express.Router();
import * as controllers from "../controllers/postsControllers.js";
import validator from "express-validator";
const { check } = validator;
import upload from "../middleware/multer.js";
router.post(
  "/",
  [
    authorize,
    upload.single("image"),
    check("title", "You must provide a title").notEmpty(),
    check()
      .custom((value, { req }) => {
        if (!req.file) {
          return false;
        } else {
          return true;
        }
      })
      .withMessage("Please provide an image")
  ],
  controllers.addPost
);

export default router;
