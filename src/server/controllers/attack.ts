import { prisma } from '../utils/prisma';
import { Attack, Prisma } from '@prisma/client';
import { Request, Response } from 'express';

import { PRISMA_ERROR, SERVER_ERROR, SERVER_SUCCESS } from '../config/serverRes';
import { 
    Intensity, Medication, Trigger, Type, Symptom, PhysicalLocation, Effect, Aura, ReliefMethod, PainLocation, AttackData 
} from '../config/interfaces';

import { INTENSITIES } from '../data/intensities';
import { MEDICATIONS } from '../data/medications';
import { SYMPTOMS } from '../data/symptoms';
import { TYPES } from '../data/types';
import { TRIGGERS } from '../data/triggers';
import { PHYSICAL_LOCATIONS } from '../data/physicalLocations';
import { EFFECTS } from '../data/effects';
import { AURAS } from '../data/auras';
import { RELIEF_METHODS } from '../data/reliefMethods';
import { PAIN_LOCATIONS } from '../data/painLocations';

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

export const createMedicationByUser = async (req: Request, res: Response):Promise<Response<any, Record<string, any>>> => {
    const { drug, dose, type } = req.body;
    
    const existingMedication = await prisma.medication.findFirst({
        where:{
            drug: drug,
            dose: dose,
            type: type
        }
    });

    if(!existingMedication){
        const createdMedication = await createMedication(drug, dose, type);

        if(!createdMedication){
            return res.status(SERVER_ERROR.INTERNAL.CODE).json({ error: SERVER_ERROR.INTERNAL.MESSAGE });
        }

        return res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: createdMedication});
    }

    return res.status(SERVER_SUCCESS.OK.CODE).json({ data: existingMedication});
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

export const createTypeByUser = async (req: Request, res: Response):Promise<Response<any, Record<string, any>>> => {
    const { name } = req.body;

    const existingType = await prisma.type.findUnique({
        where: {
            name: name
        }
    });

    if(!existingType){
        const createdType = await createType(name);

        if(!createdType){
            return res.status(SERVER_ERROR.INTERNAL.CODE).json({ error: SERVER_ERROR.INTERNAL.MESSAGE });
        }
    
        return res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: createdType });
    }

    return res.status(SERVER_SUCCESS.OK.CODE).json({ data: existingType});
}

const seedTypes = async ():Promise<void> => {
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

export const createSymptomByUser = async (req: Request, res: Response):Promise<Response<any, Record<string, any>>> => {
    const { name } = req.body;

    const existingSymptom = await prisma.symptom.findUnique({
        where: {
            name: name
        }
    });

    if(!existingSymptom){
        const createdSymptom = await createSymptom(name);

        if(!createdSymptom){
            return res.status(SERVER_ERROR.INTERNAL.CODE).json({ error: SERVER_ERROR.INTERNAL.MESSAGE });
        }
    
        return res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: createdSymptom });
    }

    return res.status(SERVER_SUCCESS.OK.CODE).json({ data: existingSymptom});
}

const seedSymptoms = async ():Promise<void> => {
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

export const createTriggerByUser = async (req: Request, res: Response):Promise<Response<any, Record<string, any>>> => {
    const { name } = req.body;

    const existingTrigger = await prisma.trigger.findUnique({
        where: {
            name: name
        }
    });

    if(!existingTrigger){
        const createdTrigger = await createTrigger(name);

        if(!createdTrigger){
            return res.status(SERVER_ERROR.INTERNAL.CODE).json({ error: SERVER_ERROR.INTERNAL.MESSAGE });
        }
    
        return res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: createdTrigger });
    }

    return res.status(SERVER_SUCCESS.OK.CODE).json({ data: existingTrigger});
}

const seedTriggers = async ():Promise<void> => {
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

const createPhysicalLocation = async (name: string):Promise<PhysicalLocation | string> => {
    const createdPhysicalLocation = await prisma.physicalLocation.create({
        data: {
            name: name
        }
    });

    if(!createdPhysicalLocation){
        return SERVER_ERROR.INTERNAL.MESSAGE;
    }

    return createdPhysicalLocation;
}

export const createPhysicalLocationByUser = async (req: Request, res: Response):Promise<Response<any, Record<string, any>>> => {
    const { name } = req.body;

    const existingPhysicalLocation = await prisma.physicalLocation.findUnique({
        where: {
            name: name
        }
    });

    if(!existingPhysicalLocation){
        const createdPhysicalLocation = await createPhysicalLocation(name);

        if(!createdPhysicalLocation){
            return res.status(SERVER_ERROR.INTERNAL.CODE).json({ error: SERVER_ERROR.INTERNAL.MESSAGE });
        }
    
        return res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: createdPhysicalLocation });
    }

    return res.status(SERVER_SUCCESS.OK.CODE).json({ data: existingPhysicalLocation});
}

const seedPhysicalLocations = async ():Promise<void> => {
    const locationsToSeed = PHYSICAL_LOCATIONS.length;

    for (let i: number = 0; i < locationsToSeed; i++) {
        const { name } = PHYSICAL_LOCATIONS[i];
        const createdPhysicalLocation = await createPhysicalLocation(name);
        if(createdPhysicalLocation === SERVER_ERROR.INTERNAL.MESSAGE){
            i--;
            continue;
        }
        console.log('Created Physical Location:', createdPhysicalLocation);
    }
}

const createEffect = async (name: string):Promise<Effect | string> => {
    const createdEffect = await prisma.effect.create({
        data: {
            name: name
        }
    });

    if(!createdEffect){
        return SERVER_ERROR.INTERNAL.MESSAGE;
    }

    return createdEffect;
}

export const createEffectByUser = async (req: Request, res: Response):Promise<Response<any, Record<string, any>>> => {
    const { name } = req.body;

    const existingEffect = await prisma.effect.findUnique({
        where: {
            name: name
        }
    });

    if(!existingEffect){
        const createdEffect = await createEffect(name);

        if(!createdEffect){
            return res.status(SERVER_ERROR.INTERNAL.CODE).json({ error: SERVER_ERROR.INTERNAL.MESSAGE });
        }
    
        return res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: createdEffect });
    }

    return res.status(SERVER_SUCCESS.OK.CODE).json({ data: existingEffect});
}

const seedEffects = async ():Promise<void> => {
    const effectsToSeed = EFFECTS.length;

    for (let i: number = 0; i < effectsToSeed; i++) {
        const { name } = EFFECTS[i];
        const createdEffect = await createEffect(name);
        if(createdEffect === SERVER_ERROR.INTERNAL.MESSAGE){
            i--;
            continue;
        }
        console.log('Created Effect:', createdEffect);
    }
}

const createAura = async (name: string):Promise<Aura | string> => {
    const createdAura = await prisma.aura.create({
        data: {
            name: name
        }
    });

    if(!createdAura){
        return SERVER_ERROR.INTERNAL.MESSAGE;
    }

    return createdAura;
}

export const createAuraByUser = async (req: Request, res: Response):Promise<Response<any, Record<string, any>>> => {
    const { name } = req.body;

    const existingAura = await prisma.aura.findUnique({
        where: {
            name: name
        }
    });

    if(!existingAura){
        const createdAura = await createAura(name);

        if(!createdAura){
            return res.status(SERVER_ERROR.INTERNAL.CODE).json({ error: SERVER_ERROR.INTERNAL.MESSAGE });
        }
    
        return res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: createdAura });
    }

    return res.status(SERVER_SUCCESS.OK.CODE).json({ data: existingAura});
}

const seedAuras = async ():Promise<void> => {
    const aurasToSeed = AURAS.length;

    for (let i: number = 0; i < aurasToSeed; i++) {
        const { name } = AURAS[i];
        const createdAura = await createAura(name);
        if(createdAura === SERVER_ERROR.INTERNAL.MESSAGE){
            i--;
            continue;
        }
        console.log('Created Aura:', createdAura);
    }
}

const createReliefMethod = async (name: string):Promise<ReliefMethod | string> => {
    const createdReliefMethod = await prisma.reliefMethod.create({
        data: {
            name: name
        }
    });

    if(!createdReliefMethod){
        return SERVER_ERROR.INTERNAL.MESSAGE;
    }

    return createdReliefMethod;
}

export const createReliefMethodByUser = async (req: Request, res: Response):Promise<Response<any, Record<string, any>>> => {
    const { name } = req.body;

    const existingReliefMethod = await prisma.reliefMethod.findUnique({
        where: {
            name: name
        }
    });

    if(!existingReliefMethod){
        const createdReliefMethod = await createReliefMethod(name);

        if(!createdReliefMethod){
            return res.status(SERVER_ERROR.INTERNAL.CODE).json({ error: SERVER_ERROR.INTERNAL.MESSAGE });
        }
    
        return res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: createdReliefMethod });
    }

    return res.status(SERVER_SUCCESS.OK.CODE).json({ data: existingReliefMethod});
}

const seedReliefMethods = async ():Promise<void> => {
    const reliefMethodToSeed = RELIEF_METHODS.length;

    for (let i: number = 0; i < reliefMethodToSeed; i++) {
        const { name } = RELIEF_METHODS[i];
        const createdReliefMethod = await createReliefMethod(name);
        if(createdReliefMethod === SERVER_ERROR.INTERNAL.MESSAGE){
            i--;
            continue;
        }
        console.log('Created Relief Method:', createdReliefMethod);
    }
}

const createPainLocation = async (location: string):Promise<PainLocation | string> => {
    const createdPainLocation = await prisma.painLocation.create({
        data: {
            location: location
        }
    });

    if(!createdPainLocation){
        return SERVER_ERROR.INTERNAL.MESSAGE;
    }

    return createdPainLocation;
}

const seedPainLocations = async ():Promise<void> => {
    const painLocationsToSeed = PAIN_LOCATIONS.length;

    for (let i: number = 0; i < painLocationsToSeed; i++) {
        const { location } = PAIN_LOCATIONS[i];
        const createdPainLocation = await createPainLocation(location);
        if(createdPainLocation === SERVER_ERROR.INTERNAL.MESSAGE){
            i--;
            continue;
        }
        console.log('Created Pain Location:', createdPainLocation);
    }
}

export const initDataBase = async (req: Request, res: Response):Promise<void> => {
    await seedIntensities();
    await seedMedications();
    await seedTypes();
    await seedSymptoms();
    await seedTriggers();
    await seedPhysicalLocations();
    await seedEffects();
    await seedAuras();
    await seedReliefMethods();
    await seedPainLocations();

    res.status(SERVER_SUCCESS.OK.CODE).json('Database seeded successfully');
};

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
    const noteId: number = Number(req.params.noteId);

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

const buildAttackData = (req: Request):AttackData => {
    const { startedAt, endedAt, userId } = req.body;
    const { intensityId, medicationId, typeId, physicalLocationId, noteId } = req.body;
    const { symptoms, triggers, effects, auras, reliefMethods, painLocations } = req.body;

    const data = {
        startedAt: startedAt,
        endedAt: endedAt,
        userId: userId,
        intensityId: intensityId,
        medicationId: medicationId,
        typeId: typeId,
        physicalLocationId: physicalLocationId,
        noteId: noteId,
        symptoms,
        triggers,
        effects,
        auras,
        reliefMethods,
        painLocations
    }

    if(symptoms){
        data.symptoms = {
            create: symptoms.map((symptom: Symptom) => {
                console.log(symptom);
                return {
                    symptom: {
                        connectOrCreate: {
                            where: {
                                name: symptom
                            },
                            create: {
                                name: symptom
                            }
                        }
                    }
                };
            })
        }
    }

    if(triggers){
        data.triggers = {
            create: triggers.map((trigger: Trigger) => {
                return {
                    trigger: {
                        connectOrCreate: {
                            where: {
                                name: trigger
                            },
                            create: {
                                name: trigger
                            }
                        }
                    }
                };
            })
        }
    }

    if(effects){
        data.effects = {
            create: effects.map((effect: Effect) => {
                return {
                    effect: {
                        connectOrCreate: {
                            where: {
                                name: effect
                            },
                            create: {
                                name: effect
                            }
                        }
                    }
                };
            })
        }
    }

    if(auras){
        data.auras = {
            create: auras.map((aura: Aura) => {
                return {
                    aura: {
                        connectOrCreate: {
                            where: {
                                name: aura
                            },
                            create: {
                                name: aura
                            }
                        }
                    }
                };
            })
        }
    }

    if(reliefMethods){
        data.reliefMethods = {
            create: reliefMethods.map((reliefMethod: ReliefMethod) => {
                return {
                    reliefMethod: {
                        connectOrCreate: {
                            where: {
                                name: reliefMethod
                            },
                            create: {
                                name: reliefMethod
                            }
                        }
                    }
                };
            })
        }
    }

    if(painLocations){
        data.painLocations = {
            create: painLocations.map((painLocation: PainLocation) => {
                return {
                    painLocation: {
                        connect: {
                            location: painLocation
                        }
                    }
                };
            })
        }
    }

    return data;
} 

export const createAttack = async (req: Request, res: Response):Promise<void> => {
    const data = buildAttackData(req);

    const createdAttack = await prisma.attack.create({
        data: {
            ...data
        },
        include: {
            // user: true,
            intensity: true,
            medication: true,
            type: true,
            physicalLocation: true,
            note: true,
            symptoms: {
                include: {
                    symptom: true
                }
            },
            triggers: {
                include: {
                    trigger: true
                }
            },
            effects: {
                include: {
                    effect: true
                }
            },
            auras: {
                include: {
                    aura: true
                }
            },
            reliefMethods: {
                include: {
                    reliefMethod: true
                }
            },
            painLocations: {
                include: {
                    painLocation: true
                }
            }
        }
    });
    console.log('Created Attack:', createdAttack);

    if(!createdAttack){
        res.status(SERVER_ERROR.INTERNAL.CODE).json({ error: SERVER_ERROR.INTERNAL.MESSAGE });
    }

    res.status(SERVER_SUCCESS.POST_OK.CODE).json({ data: createdAttack });
}