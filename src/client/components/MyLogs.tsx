import { useEffect, useState } from 'react';
import { DATABASE, LOCAL } from '../config/paths';
import { UserLogData } from '../config/interfaces'
import '../styles/my-logs.css';
import { LOCAL_STORAGE } from '../config/config';
import { useNavigate } from 'react-router-dom';
import { Attack } from './AttackItem';

export const MyLogs = () => {
    const [attacks, setAttacks] = useState<Array<UserLogData>>();

    const navigate = useNavigate();

    useEffect(() => {
        const getDataFromDB = async (): Promise<void> => {
            const userId = localStorage.getItem(LOCAL_STORAGE.USER_ID);
            const response = await fetch(`${DATABASE.ATTACK}${userId}`);
            const fetchedFromDB = await response.json();

            setAttacks([...fetchedFromDB.data]);
        };
        getDataFromDB();
    }, []);

    const handleRecordButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>):void => {
        navigate(LOCAL.RECORD_ATTACK, { replace: true });
    }

    return (
        <section className='my-logs-page'>
            <h2>My Records</h2>
            <div className='my-logs-container'>
                <div className='user-logs'>
                    {attacks && attacks.map((attack,index) => {
                        return (
                            <Attack attack={attack} key={index} setAttacks={setAttacks}/>
                        );
                    })}
                </div>
                <div className='new-attack-box'>
                    <p>New attack? We're sorry to hear</p>
                    <button className='white-button' onClick={handleRecordButtonClick}>Record Attack</button>
                </div>
            </div>
        </section>
    );
};