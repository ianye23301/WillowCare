
const Sidebar = ({currentPage}) => {
  return (
    <div className='flex'>
      <div className="w-64 bg-gray-100 h-screen overflow-y-auto">
        <ul className="p-4 pt-2">
          <li className={`py-4 pl-4 hover:bg-gray-200 transition-colors duration-300 flex items-center ${currentPage === "/" ? "font-bold" : ""}`}>
            <a href="/" className="block w-full h-full text-gray-600 hover:text-gray-800 flex items-center">
              <div className="mr-2">
                <img src="/assets/icons/dashboard-icon.svg" alt="Dashboard Icon" className="w-6 h-6" />
              </div>
              <div>Home</div>
            </a>
          </li>
          <li className={`py-4 pl-4 hover:bg-gray-200 transition-colors duration-300 flex items-center ${currentPage === "/compliance" ? "font-bold" : ""}`}>
            <a href="/compliance" className="block w-full h-full text-gray-600 hover:text-gray-800 flex items-center">
              <div className="mr-2">
                <img src="/assets/icons/compliance-icon.png" alt="Compliance Icon" className="w-6 h-6" />
              </div>
              <div>Compliance</div>
            </a>
          </li>
          <li className={`py-4 pl-4 hover:bg-gray-200 transition-colors duration-300 flex items-center ${currentPage === "/residents" ? "font-bold" : ""}`}>
            <a href="/residents" className="block w-full h-full text-gray-600 hover:text-gray-800 flex items-center">
              <div className="mr-2">
                <img src="/assets/icons/residents-icon.png" alt="Residents Icon" className="w-6 h-6" />
              </div>
              <div>Residents</div>
            </a>
          </li>

          <li className={`py-4 pl-4 hover:bg-gray-200 transition-colors duration-300 flex items-center ${currentPage === "/tasks" ? "font-bold" : ""}`}>
            <a href="/tasks" className="block w-full h-full text-gray-600 hover:text-gray-800 flex items-center">
              <div className="mr-2">
                <img src="/assets/icons/tasks.svg" alt="Residents Icon" className="w-6 h-6" />
              </div>
              <div>Tasks</div>
            </a>
          </li>

          <li className={`py-4 pl-4 hover:bg-gray-200 transition-colors duration-300 flex items-center ${currentPage === "/analytics" ? "font-bold" : ""}`}>
            <a href="/analytics" className="block w-full h-full text-gray-600 hover:text-gray-800 flex items-center">
              <div className="mr-2">
                <img src="/assets/icons/analytics.svg" alt="Residents Icon" className="w-6 h-6" />
              </div>
              <div>Analytics</div>
            </a>
          </li>

          <li className={`py-4 pl-4 hover:bg-gray-200 transition-colors duration-300 flex items-center ${currentPage === "/service" ? "font-bold" : ""}`}>
            <a href="/service" className="block w-full h-full text-gray-600 hover:text-gray-800 flex items-center">
              <div className="mr-2">
                <img src="/assets/icons/plan.svg" alt="Service Plan Icon" className="w-6 h-6" />
              </div>
              <div>Service Plan</div>
            </a>
          </li>


        </ul>
      </div>
    </div>
  );
};

export default Sidebar;