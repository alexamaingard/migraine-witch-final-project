export const dateToString = (date: Date) => {
    const d = new Date(date);

    return (d.toString().split(' ', 3).join(' '));
}

export const diffBetweenDates = (startDate: Date, endDate: Date) => {
    if(!endDate){
        endDate = new Date();
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
        
    const minutes = Math.floor(((end.getTime() - start.getTime())/1000)/60);
    const hours = Math.floor(minutes/60);

    return `${hours}hs${minutes - (hours * 60)}mins`;
}