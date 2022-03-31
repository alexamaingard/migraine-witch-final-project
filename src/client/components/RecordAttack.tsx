import { useEffect } from 'react';
import '../styles/record-attack.css';

export const RecordAttack = () => {
    
    
    useEffect(() => {

    }, []);

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
                                <ul>
                                    <li>
                                        <input type='checkbox' />
                                        <span>Type</span>
                                    </li>
                                </ul>
                            </div>
                        </label>
                        <label htmlFor=''>
                            What is the highest pain level of this attack?
                            <div className='options'>
                                <ul>
                                    <li>
                                        <input type='checkbox' />
                                        <span>Level</span>
                                    </li>
                                </ul>
                            </div>
                        </label>
                        <label htmlFor=''>
                            Where were you when the migraine started?
                            <div className='options'>
                                <ul>
                                    <li>
                                        <input type='checkbox' />
                                        <span>Physical Location</span>
                                    </li>
                                </ul>
                            </div>
                        </label>
                        <label htmlFor=''>
                            Did you experience any of the following symptoms?
                            <div className='options'>
                                <ul>
                                    <li>
                                        <input type='checkbox' />
                                        <span>Symptom</span>
                                    </li>
                                </ul>
                            </div>
                        </label>
                        <label htmlFor=''>
                            Select the potential triggers that come to mind:
                            <div className='options'>
                                <ul>
                                    <li>
                                        <input type='checkbox' />
                                        <span>Trigger</span>
                                    </li>
                                </ul>
                            </div>
                        </label>
                        <label htmlFor=''>
                            Did you sense it coming?
                            <div className='options'>
                                <ul>
                                    <li>
                                        <input type='checkbox' />
                                        <span>Aura</span>
                                    </li>
                                </ul>
                            </div>
                        </label>
                        <label htmlFor=''>
                            Did you take any medication?
                            <div className='options'>
                                <ul>
                                    <li>
                                        <input type='checkbox' />
                                        <span>Medication</span>
                                    </li>
                                </ul>
                            </div>
                        </label>
                        <label htmlFor=''>
                            What relief methods have you tried?
                            <div className='options'>
                                <ul>
                                    <li>
                                        <input type='checkbox' />
                                        <span>Relief Method</span>
                                    </li>
                                </ul>
                            </div>
                        </label>
                        <label htmlFor=''>
                            How did it affect your activities?
                            <div className='options'>
                                <ul>
                                    <li>
                                        <input type='checkbox' />
                                        <span>Effect</span>
                                    </li>
                                </ul>
                            </div>
                        </label>
                        <label htmlFor=''>
                            Where did the pain start?
                            <div className='options'>
                                <ul>
                                    <li>
                                        <input type='checkbox' />
                                        <span>Relief Method</span>
                                    </li>
                                </ul>
                            </div>
                        </label>
                        <label htmlFor=''>
                            Would you like to add any additional notes?
                            <textarea name="" id="" cols={30} rows={5}></textarea>
                        </label>
                    </form>
                </div>
            </div>
        </section>
    );
};
