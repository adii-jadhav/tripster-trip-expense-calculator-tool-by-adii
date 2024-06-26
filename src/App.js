import React, { createContext, useState } from "react";
import Banner from "./components/banner";
import ExpenseSection from "./components/expenses-section";
import CreateTripBox from "./components/create-trip-box";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DisplaySharedExpense from "./components/display-shared-expense";
export const AppContext = createContext();

function App() {
  const tripConfig = {
    tripName: "Trip to Paris",
    createdBy: "John Doe",
    date: "2024-02-24",
    expenses: [
      { name: "Hotel", people: [{ name: "Alice", amt: 250 }, { name: "Bob", amt: 250 }], total: 500 },
      { name: "Food", people: [{ name: "Alice", amt: 100 }, { name: "Alice", amt: 200 }], total: 300 },
      { name: "Transport", people: [{ name: "Charlie", amt: 200 }], total: 200 }
    ],
    payable: [
      { name: "Alice", amt: 250 },
      { name: "Bob", amt: 300 },
      { name: "Charlie", amt: 150 }
    ]
  };
  const [tripExpense, setTripExpense] = useState(tripConfig);
  const [displayCreateBox, setdisplayCreateBox] = useState(true);

  return (
    <AppContext.Provider value={{ tripExpense, setTripExpense, setdisplayCreateBox, displayCreateBox }}>
      <Router>
      <Routes>
      <Route path="/" element={<Banner />} />
      <Route path="/create-trip-expense" element={<CreateTripBox />} />
      <Route path="/trip-expense" element={<DisplaySharedExpense />} />

      </Routes>

      </Router>
    </AppContext.Provider>
  );
}

export default App;
