//note

import React from 'react';

export const StepFive = (props) => {
    const { handleNoteChange, handleSubmit, previousStep } = props;

    return (
        <section className='record-attack-page'>
            <h2>Record attack</h2>
            <div className='record-attack-container'>
                <div className='progress-bar-container'>
                    <ul className="progressbar">
                        <li className='active'>Step 1</li>
                        <li className='active'>Step 2</li>
                        <li className='active'>Step 3</li>
                        <li className='active'>Step 4</li>
                        <li>Step 5</li>
                    </ul>
                </div>
                <div className='attack-form-container'>
                    <form className='attack-form'>
                        <label htmlFor='note'>
                            Would you like to add any additional notes?
                            <textarea
                                placeholder='Type here...'
                                cols={30}
                                rows={5}
                                onChange={handleNoteChange}
                            ></textarea>
                        </label>
                        <div className='step-buttons-container'>
                            <button type="button" className='white-button' onClick={previousStep}>Previous</button>
                            <button type='submit' className='white-button' onClick={handleSubmit}>Submit Attack!</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};