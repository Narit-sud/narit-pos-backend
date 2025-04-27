import { RegisterCredentialsInterface } from "../auth/auth.interface";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../libs/db";
import { hashPassword } from "../../libs/encrypt";
