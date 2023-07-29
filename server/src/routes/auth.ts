import { Router } from "express";
import { internalLogin, externalSignupController, internalSignup } from "../controllers/auth";
import { emailValidator, externalSignupValidator, passwordValidator, internalSignupValidator } from "../middleware/validatiors";

const router = Router();

// POST /api/auth/internal-login
router.post("/internal-login", emailValidator, passwordValidator, internalLogin);

// POST /api/auth/external-signup
router.post("/external-signup", externalSignupValidator, externalSignupController);

// POST /api/auth/internal-signup
router.post("/internal-signup", emailValidator, passwordValidator, internalSignupValidator, internalSignup);

export default router;