const Sidebar = ({ currentPage }) => {
  // Define an array of menu items with their corresponding paths and icons
  const menuItems = [
    { path: "/", icon: "/assets/icons/dashboard-icon.svg", label: "Home" },
    { path: "/compliance", icon: "/assets/icons/compliance-icon.svg", label: "Compliance" },
    { path: "/residents", icon: "/assets/icons/residents-icon.svg", label: "Residents" },
    { path: "/service", icon: "/assets/icons/plan.svg", label: "Service Plan" },
  ];

  return (
    <div className="flex">
      <div className="w-64 overflow-y-auto">
        <ul className="p-4 pt-2">
          {/* Map over the menuItems array to generate list items */}
          {menuItems.map((item, index) => (
          
            <li key={index} className={`py-2 px-2 flex items-center`}>
              <a href={item.path} className={`pl-4 py-2 rounded-lg w-full h-full flex items-center ${currentPage === item.path ? "navigation-bold" : "navigation"}`}>
                <div className="mr-2">
                  <img src={item.icon} alt={`${item.label} Icon`} className="w-6 h-6" />
                </div>
                <div>{item.label}</div>
              </a>
            </li>


          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
