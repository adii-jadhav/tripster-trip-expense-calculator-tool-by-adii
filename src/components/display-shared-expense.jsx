import React, { useEffect, useState } from 'react'
import ExpenseSection from './expenses-section';

export default function DisplaySharedExpense() {

    const [thisTripExpense, setthisTripExpense] = useState(null);
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);

        const serializedObject = queryParams.get('data');

        const myObject = JSON.parse(decodeURIComponent(serializedObject));
        setthisTripExpense(myObject);
        console.log(myObject)
    }, [])

    return (
        <div className='absolute top-0 bottom-0 right-0 left-0 flex items-center'>

            <div className="m-auto md:w-1/2 w-full z-[500]">
                {
                    thisTripExpense &&
                    <ExpenseSection trip={thisTripExpense} />
                }
            </div>
        </div>
    )
}
