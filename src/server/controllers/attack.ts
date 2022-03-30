import { prisma } from '../utils/prisma';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';

import { PRISMA_ERROR, SERVER_ERROR, SERVER_SUCCESS } from '../config/serverRes';
import { Intensity, Medication, Trigger, Type, Symptom } from '../config/interfaces';

import { INTENSITIES } from '../data/intensities';
import { MEDICATIONS } from '../data/medications';
import { SYMPTOMS } from '../data/symptoms';
import { TYPES } from '../data/types';
import { TRIGGERS } from '../data/triggers';

console.log('here');

export const testFunc = () => {
    console.log('here: testFunc');
}

const createIntensity = async (intensity: { number: number, level: string }):Promise<Intensity | string> => {
    const { number, level } = intensity;

    const createdIntensity = await prisma.intensity.create({
        data: {
            number: number,
            level: level,
        },
    });

    if(!createdIntensity){
        return SERVER_ERROR.INTERNAL.MESSAGE;
    }

    return createdIntensity;
};

const seedIntensities = async ():Promise<void> => {
    const intensityLevels: number = INTENSITIES.length;

    for (let i: number = 0; i < intensityLevels; i++) {
        const createdIntensity = await createIntensity(INTENSITIES[i]);
        if(createdIntensity === SERVER_ERROR.INTERNAL.MESSAGE){
            i--;
            continue;
        }
        console.log('Created Intensity:', createdIntensity);
    }
};

const createMedication = async (drug: string, dose: string, type: string):Promise<Medication | string> => {
    const createdMedication = await prisma.medication.create({
        data: {
            drug: drug,
            dose: dose,
            type: type,
        },
    });

    if(!createdMedication){
        return SERVER_ERROR.INTERNAL.MESSAGE;
    }

    return createdMedication;
}

export const createMedicationByUser = async (req: Request, res: Response):Promise<void> => {
    const { drug, dose, type } = req.body;

    const createdMedication = await createMedication(drug, dose, type);

    if(!createdMedication){
        res.status(SERVER_ERROR.INTERNAL.CODE).json({ error: SERVER_ERROR.INTERNAL.MESSAGE });
    }

    res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: createdMedication});
};

const seedMedications = async ():Promise<void> => {
    const medicationsToSeed = MEDICATIONS.length;

    for (let i: number = 0; i < medicationsToSeed; i++) {
        const { drug, dose, type } = MEDICATIONS[i];
        const createdMedication = await createMedication(drug, dose, type);
        if(createdMedication === SERVER_ERROR.INTERNAL.MESSAGE){
            i--;
            continue;
        }
        console.log('Created Medication:', createdMedication);
    }
};

const createType = async (name: string):Promise<Type | string> => {
    const createdType = await prisma.type.create({
            data: {
                name: name
            }
    });

    if(!createdType){
        return SERVER_ERROR.INTERNAL.MESSAGE;
    }

    return createdType;
}

export const createTypeByUser = async (req: Request, res: Response):Promise<void> => {
    const { name } = req.body;

    const createdType = await createType(name);

    if(!createdType){
        res.status(SERVER_ERROR.INTERNAL.CODE).json({ error: SERVER_ERROR.INTERNAL.MESSAGE });
    }

    res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: createdType });
}

const seedTypes = async () => {
    const typesToSeed = TYPES.length;

    for (let i: number = 0; i < typesToSeed; i++) {
        const { name } = TYPES[i];
        const createdType = await createType(name);
        if(createdType === SERVER_ERROR.INTERNAL.MESSAGE){
            i--;
            continue;
        }
        console.log('Created Type:', createdType);
    }
}

const createSymptom = async (name: string):Promise<Symptom | string> => {
    const createdSymptom = await prisma.symptom.create({
        data: {
            name: name
        }
    });

    if(!createdSymptom){
        return SERVER_ERROR.INTERNAL.MESSAGE;
    }

    return createdSymptom;
}

export const createSymptomByUser = async (req: Request, res: Response):Promise<void> => {
    const { name } = req.body;

    const createdSymptom = await createSymptom(name);

    if(!createdSymptom){
        res.status(SERVER_ERROR.INTERNAL.CODE).json({ error: SERVER_ERROR.INTERNAL.MESSAGE });
    }

    res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: createdSymptom });
}

const seedSymptoms = async () => {
    const symptomsToSeed = SYMPTOMS.length;

    for (let i: number = 0; i < symptomsToSeed; i++) {
        const { name } = SYMPTOMS[i];
        const createdSymptom = await createSymptom(name);
        if(createdSymptom === SERVER_ERROR.INTERNAL.MESSAGE){
            i--;
            continue;
        }
        console.log('Created Symptom:', createdSymptom);
    }
}

const createTrigger = async (name: string):Promise<Trigger | string> => {
    const createdTrigger = await prisma.trigger.create({
        data: {
            name: name
        }
    });

    if(!createdTrigger){
        return SERVER_ERROR.INTERNAL.MESSAGE;
    }

    return createdTrigger;
}

export const createTriggerByUser = async (req: Request, res: Response):Promise<void> => {
    const { name } = req.body;

    const createdTrigger = await createTrigger(name);

    if(!createdTrigger){
        res.status(SERVER_ERROR.INTERNAL.CODE).json({ error: SERVER_ERROR.INTERNAL.MESSAGE });
    }

    res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: createdTrigger });
}

const seedTriggers = async () => {
    const triggersToSeed = TRIGGERS.length;

    for (let i: number = 0; i < triggersToSeed; i++) {
        const { name } = TRIGGERS[i];
        const createdTrigger = await createTrigger(name);
        if(createdTrigger === SERVER_ERROR.INTERNAL.MESSAGE){
            i--;
            continue;
        }
        console.log('Created Trigger:', createdTrigger);
    }
}

/////////// HEREEEE INIT
export const initDataBase = async (req: Request, res: Response):Promise<void> => {
    // await seedIntensities();
    // await seedMedications();
    // await seedTypes();
    // await seedSymptoms();
    // await seedTriggers();

    // res.status(SERVER_SUCCESS.OK.CODE).json('Database seeded successfully');
    console.log('connected');
};
///////////////////////

export const createNote = async (req: Request, res: Response):Promise<void> => {
    const { content } = req.body;

    const createdNote = await prisma.note.create({
        data: {
            content: content
        }
    });
    console.log('Created Note:', createdNote);

    if(!createdNote){
        res.status(SERVER_ERROR.INTERNAL.CODE).json({ error: SERVER_ERROR.INTERNAL.MESSAGE });
    }

    res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: createdNote });
}

export const updateNote = async (req: Request, res: Response):Promise<void> => {
    const { content } = req.body;
    const noteId: number = req.body.noteId;

    const updatedNote = await prisma.note.update({
        where: {
            id: noteId
        },
        data: {
            content: content
        }
    });

    if(!updatedNote){
        res.status(SERVER_ERROR.INTERNAL.CODE).json({ error: SERVER_ERROR.INTERNAL.MESSAGE });
    }

    res.status(SERVER_SUCCESS.UPDATE_OK.CODE).json({ data: updatedNote });
}

export const deleteNote = async (req: Request, res: Response):Promise<void> => {
    const noteId: number = Number(req.params.noteId);

    const deletedNote = await prisma.note.delete({
        where: {
            id: noteId
        }
    });
    console.log('Deleted Note:', deletedNote);

    res.status(SERVER_SUCCESS.DELETE_OK.CODE).json(SERVER_SUCCESS.DELETE_OK.MESSAGE);
}

// const createPhysicalLocation = async (req: Request, res: Response) => {

// }

// const createEffect = async (req: Request, res: Response) => {

// }

// const createPreSymptom = async (req: Request, res: Response) => {

// }

// const createReliefMethod = async (req: Request, res: Response) => {

// }

// const createPainLocation = async (req: Request, res: Response) => {

// }

// export const createAttack = async (req: Request, res: Response) => {
//     const {
//         startedAt,
//         endedAt,
//         userId,
//         intensity,
//         medication,
//         type,
//         physicalLocation,
//         symptoms,
//         triggers,
//         effects,
//         preSymptoms,
//         reliefMethods,
//         painLocations
//     } = req.body;
// }

// const updateAttack = async (req: Request, res: Response) => {

// }
