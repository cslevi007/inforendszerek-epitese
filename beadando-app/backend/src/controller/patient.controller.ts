import { getRepository, LessThan } from "typeorm";
import { Patient } from "../entity/Patient";
import { Controller } from "./base.controller";

export class PatientController extends Controller {
    repository = getRepository(Patient);

    getAll = async (req, res) => {
        const search = req.query.search || '';

        try {
            const entities = await this.repository
                .createQueryBuilder('patient')
                .where("patient.taj LIKE CONCAT('%', :search, '%')", { search: search })
                .getMany();
            res.json(entities);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    getByTaj = async (req, res) => {
        try {
            const taj = req.query.search || '';
            const patientWithTaj = await this.repository
                .createQueryBuilder('patient')
                .where("patient.taj LIKE CONCAT('%', :search, '%')", { search: taj })
                .getOne();

            res.json(patientWithTaj);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    createDate(years) {
        var date = new Date();
        date.setFullYear(date.getFullYear() - years);
        return date;
    }

    getKombo = async (req, res) => {
        try {
            const sex = req.query.sex || '';
            const age = req.query.age || 0;
            const isAbove = req.query.isAbove || '';
            let entities;

            if (isAbove == "true" && sex != '') {
                entities = await this.repository
                    .createQueryBuilder('patient')
                    .where('patient.szuldatum < :needed_date', { needed_date: this.createDate(age) })
                    .andWhere('patient.nem = :sex', { sex: sex })
                    .getMany();
            }
            else if (isAbove != "true" && sex != '') {
                entities = await this.repository
                    .createQueryBuilder('patient')
                    .where('patient.szuldatum > :needed_date', { needed_date: this.createDate(age) })
                    .andWhere('patient.nem = :sex', { sex: sex })
                    .getMany();
            }
            else if (isAbove == "true") {
                entities = await this.repository
                    .createQueryBuilder('patient')
                    .where('patient.szuldatum < :needed_date', { needed_date: this.createDate(age) })
                    .getMany();
            }
            else {
                entities = await this.repository
                    .createQueryBuilder('patient')
                    .where('patient.szuldatum > :needed_date', { needed_date: this.createDate(age) })
                    .getMany();
            }

            res.json(entities);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}