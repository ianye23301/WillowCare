"use client"

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [regulationsText, setRegulationsText] = useState('');
  const [processedData, setProcessedData] = useState([]);
  const { data: session, status } = useSession();
  const router = useRouter();



  const fetchRegulationsData = async () => {
    try {
      // Ensure session is available
      if (session) {
        const response = await fetch('/api/reg/fetch', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_email: session.user.email // Access session.user.email directly
          })
        });
        const data = await response.json();
        setProcessedData(data)
      }
    } catch (error) {
      console.error('Error fetching regulations data:', error);
    }
  };

  useEffect(() => {
    // Call the function to fetch regulations data when session changes
    fetchRegulationsData();
  }, [session]);

  useEffect(() => {
    if (status === 'loading') return; // Don't redirect while session is loading
    if (!session) router.push('/api/auth/signin');
  }, [status, session, router]);
    

  const handleProcessRegulations = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/reg/new', {
        method: "POST",
        body: JSON.stringify({
          text: regulationsText,
          user_email: session?.user.email
      })});
      const data = await response.json()
      console.log(data)
      updateResidents()
      fetchRegulationsData()
      
    } catch (error) {
      console.error('Error processing regulations:', error);
    }
  };

  const updateResidents = async() => {
    try {
      await fetch('api/residents/update', {
        method: "POST",
        body: JSON.stringify({
          user_email: session?.user.email
        })
      })
    } catch(error) {
      console.error(error)
    }
  };

  const handleRepaste = async() => {
    try {
      const response = await fetch('/api/reg/new', {
        method: "POST",
        body: JSON.stringify({
          text: '',
          user_email: session?.user.email
      })});
      fetchRegulationsData()
    } catch (error) {
      console.error('Error processing regulations:', error);
    }
    setRegulationsText('')
  }


  const handleCheck = async(e,id) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/reg/status', {
        method: "POST",
        body: JSON.stringify({
          id: id
      })});
      
      fetchRegulationsData()


    } catch (error) {
      console.error('Error processing status:', error);

    }
  }

  const totalTasks = processedData.length;
  const totalTrueTasks = processedData.filter(item => item.status).length;
  const overallPercent = totalTasks === 0 ? 100 : (totalTrueTasks / totalTasks) * 100;

  const categoryNames = ["Licensing & Documentation", "Care & Facilities", "Management"];

  // Calculate progress for each category
  const categoryProgress = categoryNames.reduce((progress, category) => {
    const categoryTasks = processedData.filter(item => item.cat === category);
    const totalCategoryTasks = categoryTasks.length;
    const totalCategoryTrueTasks = categoryTasks.filter(item => item.status).length;
    progress[category] = totalCategoryTasks === 100 ? 0 : (totalCategoryTrueTasks / totalCategoryTasks) * 100;
    return progress;
  }, {});
  
  
  return (
    (!processedData || processedData.length == 0 ? 
      <div className="flex flex-col h-screen">
        <h1 className="text-4xl font-bold mb-8 text-center mt-20">Get started by pasting in your compliance requirements</h1>
        <div className="container mx-auto flex flex-col items-center">
          <textarea
            className="w-3/4 p-4 mb-4 border rounded"
            value={regulationsText}
            onChange={(e) => setRegulationsText(e.target.value)}
            placeholder="Paste your regulations here..."
            rows={10}
            cols={50}
          />
          <button
            className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
            onClick={handleProcessRegulations}
          >
            Process Regulations
          </button>
        </div>
      </div>
      :
      <div className="flex flex-col mt-20 items-center">
        <div className="bg-white w-4/5 p-8 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-700 mr-2">Overall Compliance</h2>
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleRepaste}
            >Re-paste</button>
          </div>
          <hr className="border-t border-gray-200 mb-4" />
          <div className="flex">
            <div className="w-2/3 pr-4">
              <div className="flex flex-col">
                <div className='mt-5'>
                  <span className="text-m text-gray-500">{overallPercent.toFixed(2)}%</span>
                  <div className="w-full items-center bg-gray-300 h-3 rounded-full mt-1">
                    <div className="bg-purple-600 items-center h-full rounded-full" style={{ width: `${overallPercent}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/3 flex flex-col justify-between">
              <div className='pb-3'>
                <p className="text-xs text-gray-500">Licensing & Documentation</p>
                <div className="w-full items-center bg-gray-300 h-2 rounded-full mt-1">
                  <div className="bg-purple-600 items-center h-full rounded-full" style={{ width: `${categoryProgress["Licensing & Documentation"]}%` }}></div>
                </div>
              </div>
              <div className='pb-3'>
                <p className="text-xs text-gray-500">Care & Facilities</p>
                <div className="w-full items-center bg-gray-300 h-2 rounded-full mt-1">
                  <div className="bg-purple-600 items-center h-full rounded-full" style={{ width: `${categoryProgress["Care & Facilities"]}%` }}></div>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500">Management</p>
                <div className="w-full items-center bg-gray-300 h-2 rounded-full mt-1">
                  <div className="bg-purple-600 items-center h-full rounded-full" style={{ width: `${categoryProgress["Management"]}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

  <h2 className="text-2xl font-bold mt-10 text-left">Checklist</h2> {/* Added */}

  <div className="mt-8 w-4/5 max-h-80 overflow-y-auto border rounded-lg relative">
  <table className="w-full">
    <thead className="sticky top-0 bg-gray-200">
      <tr>
        <th className="p-2 w-1/2 text-left">Name</th>
        <th className="p-2 w-1/4 text-left">Tag</th>
        <th className="p-2 w-1/4 text-left">Status</th>
      </tr>
    </thead>
    <tbody>
      {processedData.map((item, index) => (
        <tr key={index} className="bg-gray-100">
          <td className="p-3">{item["rn"]}</td>
          <td className="p-3">{item["cat"]}</td>
          <td className="p-3">
            <input type="checkbox" className='checkbox-input' checked={item["status"]} onChange={(e) => handleCheck(e,item["id"])}/>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
    )
  );
}
export default Page;

