import * as express from 'express';
import { PatientController } from './controller/patient.controller';
import { MedicalHistoryController } from './controller/medicalhistory.controller';
import { UserController } from './controller/user.controller';
import { ExaminationController } from './controller/examination.controller';

export function getRouter() {
    const router = express.Router();

    const patientController = new PatientController();
    const medicalHistoryController = new MedicalHistoryController();
    const userController = new UserController();
    const examinationController = new ExaminationController();

    router.get('/patient', patientController.getAll);
    router.post('/patient', patientController.create);
    router.delete('/patient/:id', patientController.delete);
    router.put('/patient', patientController.update);
    router.get('/patient/:id', patientController.getOne);
    router.get('/patientbytaj', patientController.getByTaj);

    router.get('/patientkombo', patientController.getKombo);


    router.get('/medicalhistory', medicalHistoryController.getAll);
    router.get('/medicalhistory_taj', medicalHistoryController.getByTaj);
    router.post('/medicalhistory', medicalHistoryController.create);
    router.put('/medicalhistory', medicalHistoryController.update);
    router.get('/medicalhistory/:id', medicalHistoryController.getOne);


    router.get('/users', userController.getAll);
    router.get('/user', userController.getUserRole);
    router.post('/users', userController.create);
    router.delete('/users/:id', userController.delete);
    router.get('/users/:id', userController.getOne);

    router.get('/examinations', examinationController.getAll);
    router.post('/examination', examinationController.create);


    return router;
}