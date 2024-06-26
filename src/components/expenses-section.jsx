import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../App";
import { BiSolidCopy } from "react-icons/bi";
import ClipboardJS from "clipboard";

export default function ExpenseSection({ trip }) {
    
    const buttonRef = useRef(null);
    const link = encodeURIComponent(JSON.stringify(trip));
    const copyText = `${window.location.origin}/trip-expense?data=${link}`;

    const [payable, setpayable] = useState(trip?.people.map((ele, i) => {
        return { name: ele, payableAmt: 0 };
    }));

    // const copyTripExpenseLink = () => {

    // }
    
    useEffect(() => {
        const clipboard = new ClipboardJS(buttonRef.current);
        clipboard.on('success', () => {
           
            // window.alert("Trip expense link copied !!");
            console.log('copied successfully');
           
          });
          clipboard.on('error', () => {
            window.alert("Error in copying !!");

           
          });

        trip?.expenses.map((expense, i) => {

            expense?.people.map(({ name, amt }, index) => {
                setpayable((prevState) => prevState.map((ele, idx) => {
                    if (index === idx) {
                        console.log('aaTaa', index, idx, amt, { ...ele, payableAmt: ele.payableAmt + amt });
                        return { ...ele, payableAmt: parseInt(ele.payableAmt) + parseInt(amt) };
                    } return ele;
                }))

            })
        })
    }, [])


    return (
        <section id="trip-expense my-2">
            <div className="p-3 shadow-xl bg-gray-800 text-white mx-4  rounded-xl overflow-hidden ">
                <div className="flex m-2 gap-3 items-center justify-end mb-3">
                    <div className="flex item-center gap-2 cursor-pointer " ref={buttonRef} data-clipboard-text={copyText} >
                        <p className="font-bold" >copy & share</p>
                        <BiSolidCopy size={23} color="white"   />
                    </div>
                </div>
                <div className="px-6 py-4">
                    <div className="p-3 rounded-xl  text-white">
                        <p className="font-bold text-3xl mb-2">{trip && trip.tripName}</p>
                        <p className="font-semibold text-lg">Created By: {trip && trip.createdBy}</p>

                    </div>
                    <div className="mt-6">
                        <p className="font-semibold text-xl mb-2">Expenses:</p>
                        <div className="md:grid grid-cols-3 gap-5  ">
                            {trip && trip.expenses.map((expense, index) => (

                                <div key={index} className=" p-2 rounded-xl shadow-xl bg-orange-600 my-2">

                                    <p className="font-semibold text-lg my-1">{expense.name}</p>
                                    {expense?.people.map(({ name, amt }, i) => {
                                        return (
                                            <div key={i} className="text-lg">
                                                {name}: {amt} rs
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-6">
                        <p className="font-semibold text-xl mb-2">Payable:</p>
                        <div className="md:flex flex-wrap p-3 gap-5">
                            {payable && payable.map(({ name, payableAmt }, index) => (
                                <div key={index} className=" border-2 my-2 border-orange-500 rounded-lg p-3 px-5">
                                    <p className="text-lg font-semibold text-orange-400 text-center">{name}</p>
                                    <p className="text-lg font-semibold text-center">
                                        {payableAmt} rs
                                    </p>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
