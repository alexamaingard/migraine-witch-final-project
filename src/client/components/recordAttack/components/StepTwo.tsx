//Type
//Intensity
//pain location

import React from 'react';

export const StepTwo = (props) => {
    const { userAttackData, data, handleRadioChange, handleCheckboxChange, previousStep, nextStep } = props;

    const intensityLevels: Array<string> = [];

    data.intensities.forEach(intensity => {
        if(intensity.number % 2 !== 0){
            intensityLevels.push(intensity.level);
        }
    })

    return (
        <section className='record-attack-page'>
            <h2>Record attack</h2>
            <div className='record-attack-container'>
                <div className='progress-bar-container'>
                    <ul className="progressbar">
                        <li className='active'>Step 1</li>
                        <li>Step 2</li>
                        <li>Step 3</li>
                        <li>Step 4</li>
                        <li>Step 5</li>
                    </ul>
                </div>
                <div className='attack-form-container'>
                    <form className='attack-form'>
                        <label htmlFor='type'>
                            What is the attack type?
                            <div className='options'>
                                <ul className='checkboxes'>
                                    {data &&
                                        data.types.map((type, index) => {
                                            return (
                                                <li key={index}>
                                                    <label>
                                                        <input 
                                                            type='radio' 
                                                            value={`typeId/${type.id}`}
                                                            name='typeId'
                                                            onChange={handleRadioChange} 
                                                        />
                                                        <span className='checkbox-span'>{type.name}</span>
                                                    </label>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </div>
                        </label>
                        <label htmlFor='intensity'>
                            What is the highest pain level of this attack?
                            <div className='options'>
                                <ul className='intensities'>
                                    {data &&
                                        data.intensities.map((intensity) => {
                                            return (
                                                <li key={intensity.id}>
                                                    <label>
                                                        <input 
                                                            type='radio' 
                                                            value={`intensityId/${intensity.id}`}
                                                            name='intensityId'
                                                            onChange={handleRadioChange} 
                                                        />
                                                        <span className='checkbox-span' id={`int${intensity.number}`}>
                                                            {intensity.number}
                                                        </span>
                                                    </label>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                                <ul className='intensity-levels'>
                                    {data &&
                                        intensityLevels.map((intensity, index) => {
                                            return (
                                                <li key={index}>{intensity}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </label>
                        <label htmlFor='pain-location'>
                            Where did the pain start?
                            <div className='options'>
                                <ul className='checkboxes'>
                                    {data &&
                                        data.painLocations.map((painLocation) => {
                                            return (
                                                <li key={painLocation.id}>
                                                    <label>
                                                        <input 
                                                            type='checkbox' 
                                                            value={painLocation.location}
                                                            name='painLocations'
                                                            onChange={handleCheckboxChange} 
                                                            checked={userAttackData.painLocations.includes(painLocation.location)}   
                                                        />
                                                        <span className='checkbox-span'>{painLocation.location}</span>
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
