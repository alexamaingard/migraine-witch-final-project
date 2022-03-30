import { Router } from 'express';

import { 
    createMedicationByUser,
    createNote,
    createSymptomByUser,
    createTriggerByUser,
    createTypeByUser,
    deleteNote,
    initDataBase, 
    testFunc, 
    updateNote
} from '../controllers/attack';

const router = Router();

router.get('', testFunc);

console.log('connected function', initDataBase);

router.post('init/', initDataBase);






router.post('med/', createMedicationByUser);
router.post('type/', createTypeByUser);
router.post('symptom/', createSymptomByUser);
router.post('trigger/', createTriggerByUser);

router.post('note/', createNote);
router.patch('note/', updateNote);
router.delete('note/', deleteNote);

export default router;