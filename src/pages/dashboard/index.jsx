import React, { useState } from "react";
import Sidebar from "../../components/SidebarComponent";
import KanbanBoard from "../../components/KanbanBoardComponent";
// import KanbanBoard from "../../components/KanbanBoardComponent";
// import Sidebar from "../../components/SidebarComponent";

const Dashboard = () => {
  const [status, setStatus] = useState(false);

  return (
    <div className="flex h-screen">
      <div className="w-4/5 bg-white p-4">
        <KanbanBoard />
      </div>
      <div className="w-1/5 bg-gray-100 p-4">
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
