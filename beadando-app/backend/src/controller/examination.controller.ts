import { getRepository } from "typeorm";
import { Examination } from "../entity/Examination";
import { Controller } from "./base.controller";

export class ExaminationController extends Controller {
    repository = getRepository(Examination);


}