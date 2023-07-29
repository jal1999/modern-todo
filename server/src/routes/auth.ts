import { Router } from "express";
import { internalLogin, externalSignup } from "../controllers/auth";
import { emailValidator, externalSignupValidator, passwordValidator } from "../middleware/validatiors";

const router = Router();

router.post("/internal-login", emailValidator, passwordValidator, internalLogin);

router.post("external-signup", externalSignupValidator, externalSignup);