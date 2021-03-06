import { getRepository } from "typeorm";
import { MedicalHistory } from "../entity/MedicalHistory";
import { Patient } from "../entity/Patient";
import { Controller } from "./base.controller";

export class MedicalHistoryController extends Controller {
    repository = getRepository(MedicalHistory);
    patientRepository = getRepository(Patient);

    getByTaj = async (req, res) => {

        try {
            const taj = req.query.search || '';
            const patientWithTaj = await this.patientRepository
                .createQueryBuilder('patient')
                .where("patient.taj LIKE CONCAT('%', :search, '%')", { search: taj })
                .getOne();

            const entities = await this.repository
                .createQueryBuilder('medical_history')
                .where("medical_history.patient.id = :patient", { patient: patientWithTaj.id })
                .leftJoinAndSelect('medical_history.patient', 'patient')
                .getMany();
            res.json(entities);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    getAll = async (req, res) => {

        try {
            const entities = await this.repository
                .createQueryBuilder('medical_history')
                .leftJoinAndSelect('medical_history.patient', 'patient')
                .getMany();
            res.json(entities);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    getOne = async (req, res) => {
        try {
            const id = req.params.id;
            const entity = await this.repository.findOne(id, { relations: ['patient'] });

            if (!entity) {
                return res.status(404).json({ message: 'Entity not found.' });
            }

            res.json(entity);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}