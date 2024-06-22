import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const Greeting = () => {
    const [greeting, setGreeting] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date());
    const currentHour = new Date().getHours();
    const [isHovered, setIsHovered] = useState(false);
    let context = useContext(noteContext)
    const { showAlert, user, userDataDb } = context;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);
    useEffect(() => {
     
        if (currentHour >= 4 && currentHour < 12) {
            setGreeting('Good morning');
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting('Good afternoon');
        } else {
            setGreeting('Good night');
        }
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);// Update every 1000 milliseconds (1 second)

        return () => clearInterval(intervalId);// Clean up the interval on component unmount
    }, [currentHour]);


    let Name = userDataDb.name;
    let substring;
    substring = userDataDb.name

    const regex = /\s/; // Regular expression for space character
    let test = regex.test(substring); // Output: true (contains a space)
    if (test) {
        Name = substring.split(" ")[0];
    }


    return (
        <div className='container'>
            <h6>{greeting}, {Name}</h6>
            <p>{formattedDate}</p>
        </div>
    )
}

export default Greeting
