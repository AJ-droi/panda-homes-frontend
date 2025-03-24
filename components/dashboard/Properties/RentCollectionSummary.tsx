import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  totalCollected: number;
  totalOwed: number;
  upcomingPayments: number;
}

const PieChart: React.FC<PieChartProps> = ({
  totalCollected,
  totalOwed,
  upcomingPayments,
}) => {
  const data = {
    labels: ["Total Rent Collected", "Total Rent Owed", "Upcoming Payments Due"],
    datasets: [
      {
        data: [totalCollected, totalOwed, upcomingPayments],
        backgroundColor: ["#AF52DE", "#357AF6", "#5CC8BE"],
        hoverBackgroundColor: ["#AF52DE", "#357AF6", "#5CC8BE"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        display: false,
      },
    },
  };

  return (
    <div className="flex flex-col items-center w-full gap-4 md:gap-6">
      <div className="w-full max-w-xs md:max-w-md">
        <Pie data={data} options={options} />
      </div>

      <div className="w-full">
        <div className="flex flex-col space-y-3 md:space-y-4">
          <div className="flex flex-wrap items-center gap-1 text-sm md:text-base text-[#AF52DE]">
            <span className="w-4 h-4 md:w-5 md:h-5 rounded-sm bg-[#AF52DE]"></span>
            <span className="font-medium">Total Rent Collected</span>
            <span>-</span>
            <span className="font-bold">₦{totalCollected.toLocaleString()}</span>
          </div>
          <div className="flex flex-wrap items-center gap-1 text-sm md:text-base text-[#357AF6]">
            <span className="w-4 h-4 md:w-5 md:h-5 rounded-sm bg-[#357AF6]"></span>
            <span className="font-medium">Total Rent Owed</span>
            <span>-</span>
            <span className="font-bold">₦{totalOwed.toLocaleString()}</span>
          </div>
          <div className="flex flex-wrap items-center gap-1 text-sm md:text-base text-[#5CC8BE]">
            <span className="w-4 h-4 md:w-5 md:h-5 rounded-sm bg-[#5CC8BE]"></span>
            <span className="font-medium">Upcoming Payments Due</span>
            <span>-</span>
            <span className="font-bold">₦{upcomingPayments.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const RentCollectionSummary: React.FC = () => {
  const totalCollected = 4500000;
  const totalOwed = 2700000;
  const upcomingPayments = 1200000;

  return (
    <div className="p-4 md:p-6 lg:p-10 w-full max-w-sm md:max-w-md lg:max-w-lg flex flex-col justify-center items-center rounded-lg shadow-lg md:shadow-xl lg:shadow-2xl">
      <div className="w-full mb-4 md:mb-6">
        <h1 
          className="text-xl md:text-2xl font-medium leading-tight text-[#785DBA]"
          style={{fontFamily: 'Roboto'}}
        >
          Rent Collection Summary
        </h1>
      </div>
      <PieChart
        totalCollected={totalCollected}
        totalOwed={totalOwed}
        upcomingPayments={upcomingPayments}
      />
    </div>
  );
};

export default RentCollectionSummary;