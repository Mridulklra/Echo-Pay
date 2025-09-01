import express from "express";
import userRouter from "./user.js";
import accountRouter from "./account.js";

const Router = express.Router();

Router.use("/user", userRouter);
Router.use("/account", accountRouter);

export default Router;
