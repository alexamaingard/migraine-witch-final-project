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
import { DATABASE, LOCAL } from '../config/paths';
import { UserAttackData, InitialUserAttackData } from '../config/interfaces'
import '../styles/record-attack.css';
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();

    useEffect(() => {
        const getDataFromDB = async (): Promise<void> => {
            const response = await fetch(DATABASE.ATTACK);
            const fetchedFromDB = await response.json();

            setData(fetchedFromDB.data);
        };
        getDataFromDB();
    }, []);

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
        const response = await fetch(DATABASE.ATTACK, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...userAttackData, noteId: noteId})
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

    return (
        <section className='record-attack-page'>
            <h2>Record attack</h2>
            <div className='record-attack-container'>
                <div className='attack-form-container'>
                    <form className='attack-form' onSubmit={handleSubmit}>
                        <label htmlFor='start-time'>
                            When did your migraine start?
                            <input 
                                type='datetime-local' 
                                onChange={handleDateChange}
                                name='startedAt'
                            />
                        </label>
                        <label htmlFor='end-time'>
                            When did your migraine end?
                            <input 
                                type='datetime-local' 
                                name='endedAt'
                                onChange={handleDateChange}
                            />
                        </label>
                        <label htmlFor='type'>
                            What are the attack type(s)?
                            <div className='options'>
                                <select onChange={handleSelectChange}>
                                    <option value='default'>Select</option>
                                    {data &&
                                        data.types.map((type, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={`typeId/${type.id}`}
                                                > 
                                                    {type.name}
                                                </option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                        </label>
                        <label htmlFor='intensity'>
                            What is the highest pain level of this attack?
                            <div className='options'>
                                <select onChange={handleSelectChange}>
                                    <option value='default'>Select</option>
                                    {data &&
                                        data.intensities.map((intensity, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={`intensityId/${intensity.id}`}
                                                > 
                                                    {`${intensity.number} - ${intensity.level}`}
                                                </option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                        </label>
                        <label htmlFor='physical-location'>
                            Where were you when the migraine started?
                            <div className='options'>
                                <select onChange={handleSelectChange}>
                                    <option value='default'>Select</option>
                                    {data &&
                                        data.physicalLocations.map((physicalLocation, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={`physicalLocationId/${physicalLocation.id}`}
                                                > 
                                                    {physicalLocation.name}
                                                </option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                        </label>
                        <label htmlFor='symptoms'>
                            Did you experience any of the following symptoms?
                            <div className='options'>
                                <ul>
                                    {data &&
                                        data.symptoms.map((symptom) => {
                                            return (
                                                <li key={symptom.id}>
                                                    <input 
                                                        type='checkbox'
                                                        value={symptom.name}
                                                        name='symptoms'
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    <span>{symptom.name}</span>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </div>
                        </label>
                        <label htmlFor='triggers'>
                            Select the potential triggers that come to mind:
                            <div className='options'>
                                <ul>
                                    {data &&
                                        data.triggers.map((trigger) => {
                                            return (
                                                <li key={trigger.id}>
                                                    <input 
                                                        type='checkbox' 
                                                        value={trigger.name}
                                                        name='triggers'
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    <span>{trigger.name}</span>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </div>
                        </label>
                        <label htmlFor='auras'>
                            Did you sense it coming?
                            <div className='options'>
                                <ul>
                                    {data &&
                                        data.auras.map((aura) => {
                                            return (
                                                <li key={aura.id}>
                                                    <input 
                                                        type='checkbox' 
                                                        value={aura.name}
                                                        name='auras'
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    <span>{aura.name}</span>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </div>
                        </label>
                        <label htmlFor='medication'>
                            Did you take any medication?
                            <div className='options'>
                                <select onChange={handleSelectChange}>
                                    <option value='default'>Select</option>
                                    {data &&
                                        data.medications.map((medication, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={`medicationId/${medication.id}`}
                                                > 
                                                    {`${medication.drug} ${medication.dose} (${medication.type})`}
                                                </option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                        </label>
                        <label htmlFor='relief-methods'>
                            What relief methods have you tried?
                            <div className='options'>
                                <ul>
                                    {data &&
                                        data.reliefMethods.map(
                                            (reliefMethod) => {
                                                return (
                                                    <li key={reliefMethod.id}>
                                                        <input 
                                                            type='checkbox'
                                                            value={reliefMethod.name} 
                                                            name='reliefMethods'
                                                            onChange={handleCheckboxChange}    
                                                        />
                                                        <span>{reliefMethod.name}</span>
                                                    </li>
                                                );
                                            }
                                        )}
                                </ul>
                            </div>
                        </label>
                        <label htmlFor='effects'>
                            How did it affect your activities?
                            <div className='options'>
                                <ul>
                                    {data &&
                                        data.effects.map((effect) => {
                                            return (
                                                <li key={effect.id}>
                                                    <input 
                                                        type='checkbox' 
                                                        value={effect.name}
                                                        name='effects'
                                                        onChange={handleCheckboxChange}    
                                                    />
                                                    <span>{effect.name}</span>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </div>
                        </label>
                        <label htmlFor='pain-location'>
                            Where did the pain start?
                            <div className='options'>
                                <ul>
                                    {data &&
                                        data.painLocations.map(
                                            (painLocation) => {
                                                return (
                                                    <li key={painLocation.id}>
                                                        <input 
                                                            type='checkbox' 
                                                            value={painLocation.location}
                                                            name='painLocations'
                                                            onChange={handleCheckboxChange}    
                                                        />
                                                        <span>{painLocation.location}</span>
                                                    </li>
                                                );
                                            }
                                        )}
                                </ul>
                            </div>
                        </label>
                        <label htmlFor='note'>
                            Would you like to add any additional notes?
                            <textarea
                                name=''
                                id=''
                                cols={30}
                                rows={5}
                                onChange={handleNoteChange}
                            ></textarea>
                        </label>
                        <button type='submit' className='white-button'>Submit Attack!</button>
                    </form>
                </div>
            </div>
        </section>
    );
};