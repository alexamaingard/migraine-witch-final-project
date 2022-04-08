//symptoms
//triggers
//auras
//effects

import React from 'react';

export const StepThree = (props) => {
    const { userAttackData, data, handleCheckboxChange, previousStep, nextStep } = props;

    return (
        <section className='record-attack-page'>
            <h2>Record attack</h2>
            <div className='record-attack-container'>
                <div className='progress-bar-container'>
                    <ul className="progressbar">
                        <li className='active'>Step 1</li>
                        <li className='active'>Step 2</li>
                        <li>Step 3</li>
                        <li>Step 4</li>
                        <li>Step 5</li>
                    </ul>
                </div>
                <div className='attack-form-container'>
                    <form className='attack-form'>
                        <label htmlFor='symptoms'>
                            Did you experience any of the following symptoms?
                            <div className='options'>
                                <ul className='checkboxes'>
                                    {data &&
                                        data.symptoms.map((symptom) => {
                                            return (
                                                <li key={symptom.id}>
                                                    <label>
                                                        <input 
                                                            type='checkbox'
                                                            value={symptom.name}
                                                            name='symptoms'
                                                            onChange={handleCheckboxChange}
                                                            checked={userAttackData.symptoms.includes(symptom.name)}
                                                        />
                                                        <span className='checkbox-span'>{symptom.name}</span>
                                                    </label>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </div>
                        </label>
                        <label htmlFor='triggers'>
                            Select the potential triggers that come to mind:
                            <div className='options'>
                                <ul className='checkboxes'>
                                    {data &&
                                        data.triggers.map((trigger) => {
                                            return (
                                                <li key={trigger.id}>
                                                    <label>
                                                        <input 
                                                            type='checkbox' 
                                                            value={trigger.name}
                                                            name='triggers'
                                                            onChange={handleCheckboxChange}
                                                            checked={userAttackData.triggers.includes(trigger.name)}
                                                        />
                                                        <span className='checkbox-span'>{trigger.name}</span>
                                                    </label>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </div>
                        </label>
                        <label htmlFor='auras'>
                            Did you sense it coming?
                            <div className='options'>
                                <ul className='checkboxes'>
                                    {data &&
                                        data.auras.map((aura) => {
                                            return (
                                                <li key={aura.id}>
                                                    <label>
                                                        <input 
                                                            type='checkbox' 
                                                            value={aura.name}
                                                            name='auras'
                                                            onChange={handleCheckboxChange}
                                                            checked={userAttackData.auras.includes(aura.name)}
                                                        />
                                                        <span className='checkbox-span'>{aura.name}</span>
                                                    </label>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </div>
                        </label>
                        <label htmlFor='effects'>
                            How did it affect your activities?
                            <div className='options'>
                                <ul className='checkboxes'>
                                    {data &&
                                        data.effects.map((effect) => {
                                            return (
                                                <li key={effect.id}>
                                                    <label>
                                                        <input 
                                                            type='checkbox' 
                                                            value={effect.name}
                                                            name='effects'
                                                            onChange={handleCheckboxChange}  
                                                            checked={userAttackData.effects.includes(effect.name)}  
                                                        />
                                                        <span className='checkbox-span'>{effect.name}</span>
                                                    </label>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </div>
                        </label>
                        <div className='step-buttons-container'>
                            <button type="button" className='white-button' onClick={previousStep}>Previous</button>
                            <button type="button" className='white-button' onClick={nextStep}>Next</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};
