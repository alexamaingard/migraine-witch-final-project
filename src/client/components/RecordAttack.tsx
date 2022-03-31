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
import { DATABASE } from '../config/paths';
import '../styles/record-attack.css';

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

// interface UserAttackData {

// }

export const RecordAttack = () => {
    const [data, setData] = useState<Data>();
    //const [userAttackData, setUserAttackData] = useState();

    useEffect(() => {
        const getDataFromDB = async (): Promise<void> => {
            const response = await fetch(DATABASE.ATTACK);
            const fetchedFromDB = await response.json();
            console.log(fetchedFromDB.data);
            setData(fetchedFromDB.data);
        };
        getDataFromDB();
    }, []);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        console.log(event.target.value); //change to id if i get it to work
        const id = event.target.value;
        if(id !== 'default'){

        }
    };

    return (
        <section className='record-attack-page'>
            <h2>Record attack</h2>
            <div className='record-attack-container'>
                <div className='attack-form-container'>
                    <form className='attack-form'>
                        <label htmlFor=''>
                            When did your migraine start?
                            <input type='datetime-local' />
                        </label>
                        <label htmlFor=''>
                            When did your migraine end?
                            <input type='datetime-local' />
                        </label>
                        <label htmlFor=''>
                            What are the attack type(s)?
                            <div className='options'>
                                <select onChange={handleSelectChange}>
                                    <option value='default'>Select</option>
                                    {data &&
                                        data.types.map((type, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={`${type.id}`}
                                                    id='hi'
                                                > 
                                                {type.name}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                        </label>
                        <label htmlFor=''>
                            What is the highest pain level of this attack?
                            <div className='options'>
                                <ul>
                                    {data &&
                                        data.intensities.map((intensity) => {
                                            return (
                                                <li key={intensity.id}>
                                                    <input type='checkbox' />
                                                    <span>{`${intensity.number} - ${intensity.level}`}</span>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </div>
                        </label>
                        <label htmlFor=''>
                            Where were you when the migraine started?
                            <div className='options'>
                                <ul>
                                    {data &&
                                        data.physicalLocations.map(
                                            (physicalLocation) => {
                                                return (
                                                    <li
                                                        key={
                                                            physicalLocation.id
                                                        }
                                                    >
                                                        <input type='checkbox' />
                                                        <span>
                                                            {
                                                                physicalLocation.name
                                                            }
                                                        </span>
                                                    </li>
                                                );
                                            }
                                        )}
                                </ul>
                            </div>
                        </label>
                        <label htmlFor=''>
                            Did you experience any of the following symptoms?
                            <div className='options'>
                                <ul>
                                    {data &&
                                        data.symptoms.map((symptom) => {
                                            return (
                                                <li key={symptom.id}>
                                                    <input type='checkbox' />
                                                    <span>{symptom.name}</span>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </div>
                        </label>
                        <label htmlFor=''>
                            Select the potential triggers that come to mind:
                            <div className='options'>
                                <ul>
                                    {data &&
                                        data.triggers.map((trigger) => {
                                            return (
                                                <li key={trigger.id}>
                                                    <input type='checkbox' />
                                                    <span>{trigger.name}</span>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </div>
                        </label>
                        <label htmlFor=''>
                            Did you sense it coming?
                            <div className='options'>
                                <ul>
                                    {data &&
                                        data.auras.map((aura) => {
                                            return (
                                                <li key={aura.id}>
                                                    <input type='checkbox' />
                                                    <span>{aura.name}</span>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </div>
                        </label>
                        <label htmlFor=''>
                            Did you take any medication?
                            <div className='options'>
                                <ul>
                                    {data &&
                                        data.medications.map((medication) => {
                                            return (
                                                <li key={medication.id}>
                                                    <input type='checkbox' />
                                                    <span>{`${medication.drug} ${medication.dose} (${medication.type})`}</span>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </div>
                        </label>
                        <label htmlFor=''>
                            What relief methods have you tried?
                            <div className='options'>
                                <ul>
                                    {data &&
                                        data.reliefMethods.map(
                                            (reliefMethod) => {
                                                return (
                                                    <li key={reliefMethod.id}>
                                                        <input type='checkbox' />
                                                        <span>
                                                            {reliefMethod.name}
                                                        </span>
                                                    </li>
                                                );
                                            }
                                        )}
                                </ul>
                            </div>
                        </label>
                        <label htmlFor=''>
                            How did it affect your activities?
                            <div className='options'>
                                <ul>
                                    {data &&
                                        data.effects.map((effect) => {
                                            return (
                                                <li key={effect.id}>
                                                    <input type='checkbox' />
                                                    <span>{effect.name}</span>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </div>
                        </label>
                        <label htmlFor=''>
                            Where did the pain start?
                            <div className='options'>
                                <ul>
                                    {data &&
                                        data.painLocations.map(
                                            (painLocation) => {
                                                return (
                                                    <li key={painLocation.id}>
                                                        <input type='checkbox' />
                                                        <span>
                                                            {
                                                                painLocation.location
                                                            }
                                                        </span>
                                                    </li>
                                                );
                                            }
                                        )}
                                </ul>
                            </div>
                        </label>
                        <label htmlFor=''>
                            Would you like to add any additional notes?
                            <textarea
                                name=''
                                id=''
                                cols={30}
                                rows={5}
                            ></textarea>
                        </label>
                    </form>
                </div>
            </div>
        </section>
    );
};
