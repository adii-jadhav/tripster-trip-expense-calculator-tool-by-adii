import React, { useState } from "react";
import ExpenseSection from "./expenses-section";
import { MdAddCircle } from "react-icons/md";
import { MdOutlineRemoveCircle } from "react-icons/md";

export default function CreateTripBox() {
    const [tripExpenseState, setTripExpenseState] = useState({
        tripName: "",
        createdBy: "",
        date: new Date(),
        people: [],
        expenses: [],
        payable: [],
    });
    const [allTrips, setAllTrips] = useState([]);

    const [crntPersonToAdd, setcrntPersonToAdd] = useState("");
    const [crntExpenseToAdd, setcrntExpenseToAdd] = useState({ name: "", total: null });


    const handleOnTextInputChange = (e) => {

        setTripExpenseState({ ...tripExpenseState, [e.target.name]: e.target.value });

    }

    const handleAddPerson = () => {

        setTripExpenseState({ ...tripExpenseState, people: [...tripExpenseState.people, crntPersonToAdd] });
        setcrntPersonToAdd("");
    }

    const handleRemovePerson = (i) => {

        setTripExpenseState({ ...tripExpenseState, people: tripExpenseState.people.filter((ele, idx) => i !== idx), expenses: [] });

    }

    const addExpense = ({ name, total }) => {

        setTripExpenseState({
            ...tripExpenseState, expenses: [...tripExpenseState.expenses, {
                name,
                total,
                people: tripExpenseState.people.map((person, i) => {
                    return { name: person, amt: (total / tripExpenseState.people.length) }
                }
                )
            }]
        })

        setcrntExpenseToAdd({ name: "", total: 0 })
    }



    return (
        <div>
            <p className="text-center text-3xl font-bold text-black md:mx-12 md:my-6 mx-4">Create your trip expense and share with your friends </p>
            <div className="md:flex gap-3">
                <div className="md:w-1/2 md:m-auto mx-2 my-12 rounded shadow-xl bg-gray-800 p-2 text-white">

                    <div className=" mx-auto mt-8">
                        <div className="mb-4">
                            <label
                                htmlFor="tripName"
                                className="block font-bold mb-2"
                            >
                                Trip Name
                            </label>
                            <input
                                type="text"
                                onChange={handleOnTextInputChange}
                                placeholder="Enter your trip name"
                                value={tripExpenseState.tripName}
                                id="tripName"
                                name="tripName"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="createdBy"
                                className="block font-bold mb-2"
                            >
                                Creator
                            </label>
                            <input
                                type="text"
                                onChange={handleOnTextInputChange}
                                value={tripExpenseState.createdBy}
                                placeholder="Enter your name"
                                id="createdBy"
                                name="createdBy"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                            />
                        </div>

                        {/* add people of this trip*/}
                        <div className="mb-4">
                            <div className="flex gap-3 items-center my-2">
                                <label
                                    htmlFor="date"
                                    className="block font-bold mb-2"
                                >
                                    Add people
                                </label>
                                <div className="" onClick={handleAddPerson}>
                                    <MdAddCircle size={30} className="text-orange-500" />
                                </div>
                            </div>
                            <div className=" ">
                                <input
                                    type="text"
                                    id="person"
                                    name="person"
                                    placeholder="Enter friend name"

                                    onChange={(e) => setcrntPersonToAdd(e.target.value)}
                                    value={crntPersonToAdd}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                                />

                            </div>


                            <div className="people flex flex-wrap gap-5 my-3 mx-2">
                                {tripExpenseState.people.map((ele, i) => {
                                    return (
                                        <div className="w-fit rounded-xl gap-4 flex items-center bg-gray-300 text-black p-2 px-3" key={i}>
                                            <p> {ele} </p>
                                            <MdOutlineRemoveCircle className="text-ornge-500" size={25} onClick={() => handleRemovePerson(i)} />

                                        </div>
                                    );
                                })}
                            </div>

                            {/*add expenses*/}
                            <div className="expenses my-2">
                                <div className="flex gap-3">
                                    <p className="font-semibold">Add trip expenses</p>
                                    <div className="" >
                                        <MdAddCircle size={30} className="text-orange-500" onClick={() => addExpense(crntExpenseToAdd)} />
                                    </div>

                                </div>
                                <div className="md:flex gap-4 my-1">
                                    <input
                                        type="text"
                                        onChange={(e) => setcrntExpenseToAdd({ ...crntExpenseToAdd, name: e.target.value })}
                                        value={crntExpenseToAdd.name}
                                        placeholder="Enter expense name"

                                        className="shadow mb-1 w-full appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                                    />
                                    <input
                                        type="number"
                                        placeholder="Enter spent amount"

                                        onChange={(e) => setcrntExpenseToAdd({ ...crntExpenseToAdd, total: parseInt(e.target.value) })}
                                        value={crntExpenseToAdd.total}
                                        className="shadow appearance-none mb-1 w-full border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                                    />
                                </div>
                                {
                                    tripExpenseState.expenses.map((expense, i) => {
                                        return (

                                            <ExpenseCard {...expense} key={i} index={i} setTripExpenseState={setTripExpenseState} tripExpenseState={tripExpenseState} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <button
                            onClick={() => setAllTrips([...allTrips, tripExpenseState])}
                            className="bg-orange-500 w-full mt-2 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Create Trip
                        </button>
                    </div>
                </div>
                <section id="trips" className="md:w-[40%]">
                    {
                        allTrips.map((trip) => {
                            return <ExpenseSection trip={trip} />
                        })
                    }
                </section>
            </div>
        </div>
    );
}

const ExpenseCard = ({ tripExpenseState, setTripExpenseState, name, people, total, index: expenseIdx }) => {

    const [selectedPersons, setSelectedPersons] = useState(people.map((ele) => true));

    const handleSlideOnChange = (e, i) => {

        setTripExpenseState({
            ...tripExpenseState, expenses: tripExpenseState.expenses.map((ele, idx) => {
                if (idx === expenseIdx) {
                    return { ...ele, people: ele.people.map((person, index) => index === i ? { ...person, amt: parseInt(e.target.value) } : person) }
                }
                return ele;
            })
        })

    }

    const handleCheckBoxChange = (e, i) => {
        setSelectedPersons(selectedPersons.map((ele, idx) => idx === i ? e.target.checked : ele));
        if (e.target.checked === false) {
            setTripExpenseState({
                ...tripExpenseState, expenses: tripExpenseState.expenses.map((ele, idx) => {
                    if (idx === expenseIdx) {
                        return { ...ele, people: ele.people.map((person, index) => index === i ? { ...person, amt: 0 } : person) }
                    }
                    return ele;
                })
            })
        }
    }
    return (
        <div key={tripExpenseState}>

            <p className="p-2 my-2 font-bold text-xl">{name}</p>
            <div className="">

                {people && people.map(({ name, amt }, i) => {
                    return (
                        <div className=" p-2 bg-orange-400 my-2 rounded md:flex mx-4  justify-around" key={i}>
                            <div className="flex gap-3">
                                <p className="text-lg font-bold"> {name} </p>
                                <input type="checkbox" name={i} id={i} checked={selectedPersons[i]} onChange={(e) => handleCheckBoxChange(e, i)} />
                            </div>
                            <div>
                                <input
                                    type="range"
                                    min={0}
                                    max={total}
                                    step={1}
                                    value={amt}
                                    onChange={(e) => handleSlideOnChange(e, i)}
                                    className="w-64"
                                />
                                <span className="text-gray-700 mx-2 font-semibold">{amt}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
