import {
    Aura,
    Effect,
    Intensity,
    Medication,
    PainLocation,
    PhysicalLocation,
    ReliefMethod,
    Symptom,
    Trigger,
    Type,
} from '@prisma/client';
import { useEffect, useState } from 'react';
import { DATABASE, LOCAL } from '../../config/paths';
import { UserAttackData, InitialUserAttackData } from '../../config/interfaces'
import { useNavigate } from 'react-router-dom';

import '../../styles/record-attack.css'
import { StepOne } from './components/StepOne';
import { StepTwo } from './components/StepTwo';
import { StepThree } from './components/StepThree';
import { StepFour } from './components/StepFour';
import { StepFive } from './components/StepFive';
import { LOCAL_STORAGE } from '../../config/config';

interface Data {
    auras: Array<Aura>;
    effects: Array<Effect>;
    intensities: Array<Intensity>;
    medications: Array<Medication>;
    painLocations: Array<PainLocation>;
    physicalLocations: Array<PhysicalLocation>;
    reliefMethods: Array<ReliefMethod>;
    symptoms: Array<Symptom>;
    triggers: Array<Trigger>;
    types: Array<Type>;
}

interface UserNote {
    content: string
}

export const RecordAttack = () => {
    const [data, setData] = useState<Data>();
    const [userAttackData, setUserAttackData] = useState<UserAttackData>(InitialUserAttackData);
    const [userNote, setUserNote] = useState<UserNote>();
    const [step, setStep] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        const getDataFromDB = async (): Promise<void> => {
            const response = await fetch(DATABASE.ATTACK);
            const fetchedFromDB = await response.json();

            setData(fetchedFromDB.data);
        };
        getDataFromDB();
    }, []);



    const previousStep = () => {
        const tempStep = step;
        setStep(tempStep - 1);
    }

    const nextStep = () => {
        const tempStep = step;
        setStep(tempStep + 1);
    }

    const postNoteToDB = async ():Promise<any> => {
        const response = await fetch(`${DATABASE.ATTACK}note`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userNote)
        });
        const postedNote = await response.json();

        return postedNote.data.id;
    }

    const postAttackToDB = async (noteId: number):Promise<void> => {
        const userId = Number(localStorage.getItem(LOCAL_STORAGE.USER_ID));

        const response = await fetch(DATABASE.ATTACK, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...userAttackData, userId: userId, noteId: noteId})
        });
        const postedAttack = await response.json();
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
        const { name, value } = event.target;

        setUserAttackData({
            ...userAttackData,
            [name]: value
        });
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const target = event.target.value;
        const name = target.split('/')[0];
        const id = Number(target.split('/')[1]);

        if(!isNaN(id)){
            setUserAttackData({
                ...userAttackData,
                [name]: id
            })
        }
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
        const target = event.target.value;
        const name = target.split('/')[0];
        const id = Number(target.split('/')[1]);

        setUserAttackData({
            ...userAttackData,
            [name]: id
        });
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        let aux = [];

        if(!userAttackData[name]){
            aux.push(value);
        }
        else {
            if(userAttackData[name].includes(value)){
                userAttackData[name].splice(userAttackData[name].indexOf(value), 1);
                aux = [...userAttackData[name]];
            }
            else {
                aux = [...userAttackData[name], value];
            }
        }

        setUserAttackData({
            ...userAttackData,
            [name]: [...aux]
        });
    }

    const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>):void => {
        const noteContent = event.target.value;

        setUserNote({ content: noteContent });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let noteId: number;

        if(userNote){
            noteId = await postNoteToDB();
        }
        
        await postAttackToDB(noteId);

        navigate(LOCAL.LOGS, { replace: true });
    }

    switch(step) {
        case 1:
            return (
                <StepOne 
                    data={data} 
                    handleDateChange={handleDateChange}
                    handleRadioChange={handleRadioChange}
                    nextStep={nextStep}
                />
            )
        case 2:
            return (
                <StepTwo 
                    userAttackData={userAttackData}
                    data={data} 
                    handleRadioChange={handleRadioChange}
                    handleCheckboxChange={handleCheckboxChange}
                    previousStep={previousStep}
                    nextStep={nextStep}
                />
            ) 
        case 3:
            return (
                <StepThree
                    userAttackData={userAttackData}
                    data={data} 
                    handleCheckboxChange={handleCheckboxChange}
                    previousStep={previousStep}
                    nextStep={nextStep}
                />
            )  
        case 4:
            return (
                <StepFour 
                    userAttackData={userAttackData}
                    data={data} 
                    handleSelectChange={handleSelectChange}
                    handleRadioChange={handleRadioChange}
                    handleCheckboxChange={handleCheckboxChange}
                    previousStep={previousStep}
                    nextStep={nextStep}
                />
            )
        case 5:
            return (
                <StepFive 
                    userNote={userNote}
                    data={data} 
                    handleNoteChange={handleNoteChange}
                    handleSubmit={handleSubmit}
                    previousStep={previousStep}
                />
            ) 
        default:
    }
};