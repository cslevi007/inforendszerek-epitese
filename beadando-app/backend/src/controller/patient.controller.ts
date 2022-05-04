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

    createDate(years) {
        var date = new Date();
        date.setFullYear(date.getFullYear() - years);
        return date;
    }

    getTudoszuro = async (req, res) => {

        try {
            const entities = await this.repository
                .createQueryBuilder('patient')
                .where('patient.szuldatum < :needed_date', { needed_date: this.createDate(18) })
                .getMany();
            res.json(entities);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    getProsztata = async (req, res) => {
        try {
            const entities = await this.repository
                .createQueryBuilder('patient')
                .where('patient.szuldatum < :needed_date', { needed_date: this.createDate(35) })
                .andWhere('patient.nem = "ferfi"')
                .getMany();
            res.json(entities);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    getMammografia = async (req, res) => {
        try {
            const entities = await this.repository
                .createQueryBuilder('patient')
                .where('patient.szuldatum < :needed_date', { needed_date: this.createDate(45) })
                .andWhere('patient.nem = "no"')
                .getMany();
            res.json(entities);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    getAltalanos = async (req, res) => {
        try {
            const entities = await this.repository
                .createQueryBuilder('patient')
                .getMany();
            res.json(entities);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}