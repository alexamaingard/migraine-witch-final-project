//Type
//Intensity
//pain location

import React from 'react';

export const StepTwo = (props) => {
    const { userAttackData, data, handleSelectChange, handleCheckboxChange, previousStep, nextStep } = props;

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
                                                    {intensity.id > 0 && intensity.id < 3? `🙂 ${intensity.number} - ${intensity.level}`: null}
                                                    {intensity.id > 2 && intensity.id < 5? `😐 ${intensity.number} - ${intensity.level}`: null}
                                                    {intensity.id > 4 && intensity.id < 7? `🙁 ${intensity.number} - ${intensity.level}`: null}
                                                    {intensity.id > 6 && intensity.id < 9? `😖 ${intensity.number} - ${intensity.level}`: null}
                                                    {intensity.id > 8 && intensity.id < 11? `❗❗ ${intensity.number} - ${intensity.level}`: null}
                                                </option>
                                            );
                                        })
                                    }
                                </select>
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
                                                    <input 
                                                        type='checkbox' 
                                                        value={painLocation.location}
                                                        name='painLocations'
                                                        onChange={handleCheckboxChange} 
                                                        checked={userAttackData.painLocations.includes(painLocation.location)}   
                                                    />
                                                    <span>{painLocation.location}</span>
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
