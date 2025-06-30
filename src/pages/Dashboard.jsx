import React from 'react';
import Charts from '../components/Charts';
import Balance from '../components/Balance';
import Loader from '../components/Loader';
import DashboardWidgets from '../components/DashboardWidgets';
import ExpenseInsights from '../components/ExpenseInsights';
import useGlobalContext from '../context/useGlobalContext';

const Dashboard = () => {
  const { loading } = useGlobalContext();

  return (
    <div className="w-full px-4 py-6 max-w-6xl mx-auto">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Balance />
          <Charts />
          <DashboardWidgets />
          <ExpenseInsights />
        </>
      )}
    </div>
  );
};

export default Dashboard;
