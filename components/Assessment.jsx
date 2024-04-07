"use client"
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const NoteOverlay = ({onClose, onSubmit}) => {
    const [staff, setStaff] = useState('')
    const [date, setDate] = useState('')
    const [note, setNote] = useState('')

    function formatDate(inputDate) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(inputDate);
        return date.toLocaleDateString('en-US', options);
    }
    

    const handleSubmit = (e) => {
        const id = uuidv4()
        e.preventDefault();
        onSubmit({ staff: staff, date: formatDate(date), id: id, note: note});
        onClose();
      };

      return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-96 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">New Note</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="Staff Initials" className="block label">
                  Staff Initials
                </label>
                <input
                  type="text"
                  id="staff"
                  value={staff}
                  onChange={(e) => setStaff(e.target.value)}
                  className="input-text mt-1 block w-full borders rounded shadow-custom"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="date" className="block label">
                  Date
                </label>
                <input
                  type="date"
                  id="calendar"
                  value={date}
                  onChange={(e) => {
                    const selectedDate = e.target.value;
                    const currentDate = new Date().toISOString().split('T')[0];
                    
                    if (selectedDate <= currentDate) {
                      setDate(selectedDate);
                    }
                  }}
                  max={new Date().toISOString().split('T')[0]}
                  className="input-text mt-1 block w-full borders rounded shadow-custom"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="note" className="block label">
                  Note:
                </label>
                <textarea
                  type="textarea"
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="input-text mt-1 h-20 block w-full borders rounded shadow-custom"
                />
              </div>
              <div className="flex justify-end">
                <div className='p-2'>
                <button type="submit" className="button text-white py-2 px-4 rounded inline-block">Add Note</button>
                </div>
                <div className='p-2'>
  
                <button type="button" onClick={onClose} className="button text-white py-2 px-4 rounded inline-block">Cancel</button>
                </div>
  
              </div>
            </form>
          </div>
        </div>
      );


}


const FormOverlay = ({ onClose, onSubmit }) => {
    const [taskName, setTaskName] = useState('');
    const [priority, setPriority] = useState(false);
  
    const handleSubmit = (e) => {
      const id = uuidv4()
      e.preventDefault();
      onSubmit({ task: taskName, priority, id });
      onClose();
    };

    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white w-96 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Add New Task</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="taskName" className="block label">
                Task Name:
              </label>
              <input
                type="text"
                id="taskName"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="input-text mt-1 block w-full borders rounded shadow-custom"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="priority" className="block  label">
                Priority
              </label>
              <input
                type="checkbox"
                id="priority"
                checked={priority}
                onChange={(e) => setPriority(e.target.checked)}
                className="form-checkbox mt-1"
              />
            </div>
            <div className="flex justify-end">
              <div className='p-2'>
              <button type="submit" className="button text-white py-2 px-4 rounded inline-block">Add Task</button>
              </div>
              <div className='p-2'>

              <button type="button" onClick={onClose} className="button text-white py-2 px-4 rounded inline-block">Cancel</button>
              </div>

            </div>
          </form>
        </div>
      </div>
    );
  };

const Assessment = ({params}) => {
    const residentId = params
    const [userInfo,setUserInfo] = useState(null)
    const [tasks, setTasks] = useState([])
    const [showForm, setShowForm] = useState(false);
    const [logs, setLogs] = useState(null);
    const [showNoteForm, setShowNoteForm] = useState(false)


    const addTask = () => {
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
    };


    const handleAddNote = () => {
        setShowNoteForm(true)
    }

    const closeAddNote = () => {
        setShowNoteForm(false);
    };

    const currentDate = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`;


    const handleNoteSubmit = async(newLog) => {
        setLogs([...logs, newLog])
        try {
            const response = await fetch('/api/residents/logs/new', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id: residentId,
                newLog: newLog,
                logs: logs
              })
            });
          } catch (error) {
            console.error(error);
          }
        }


    const handleSubmit = async (newTask) => {
        setTasks([...tasks, newTask])
        try {
            const response = await fetch('/api/residents/tasks/new', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id: residentId,
                newTask: newTask,
                tasks: tasks
              })
            });
          } catch (error) {
            console.error(error);
          }
        }
      

const sortTasksByPriority = async(tasks, setTasks) => {
    const sortedTasks = [...tasks];
    console.log(sortedTasks)
    sortedTasks.sort((a, b) => (b.priority - a.priority)); // Sorting by boolean values
    setTasks(sortedTasks);
};



    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch('/api/residents/fetch_single', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id: residentId
              })
            });
            const data = await response.json();
            console.log(data)
            setUserInfo(data[0])
            await sortTasksByPriority(data[0]["tasks"], setTasks)
            setLogs(data[0]["logs"])


          } catch (error) {
            console.error(error);
          }
        };
    
        fetchUserData();
      }, []);

    

    

    const toggleTaskCompletion = (task) => {
        return
    }

    const handleTaskDelete = async(taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        try {
            const response = await fetch('/api/residents/tasks/delete', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id: residentId,
                tasks: updatedTasks
              })
            });
            
          } catch (error) {
            console.error(error);
          }
    }

    const handleLogDelete = async(logId) => {
        const updatedLog = logs.filter(log => log.id !== logId);
        setLogs(updatedLog);
        try {
            const response = await fetch('/api/residents/logs/delete', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id: residentId,
                logs: updatedLog
              })
            });
            
          } catch (error) {
            console.error(error);
          }
          return
    }
    const cleanString = (string) => {
      return string.split(',').join(', ')
      
    }





         
    

    
  return (
    <div className='flex w-full h-full'>
        
    <div className='flex flex-col w-2/3 pl-5 py-5'>
            <div className="bg-white w-full py-4 flex flex-col rounded-md borders shadow-custom">
                {userInfo ? (
                <div>
                <h1 className='p-4'>
                 Daily Care Plan for {userInfo.basic_info.name}, {formattedDate}:
                </h1>
                <div className='label py-4 px-4'>
                 Task List:
                </div>

                <ul>
                {tasks.map((task, index) => (
                    <li key={index} className="flex items-center justify-between p-4 border-b">
                    <label className="flex items-center space-x-2">
                        <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task)}
                        className="form-checkbox"
                        />
                        <span className={task.priority ? 'label' : 'body-text'}>{task.task}</span>
                    </label>

                    <div className="flex items-end space-x-2"> {/* Added wrapper div */}
                        {task.priority && <span className="priority rounded-md px-2 py-1">              
                        <img src="/assets/icons/priority.svg" alt="assessment icon" className="w-6 h-6" title = "Priority"/>
                        </span>}
                        <button className="bg-white hover:bg-gray-200 rounded inline-block p-1"  onClick={() => handleTaskDelete(task.id)}>
                        <img src="/assets/icons/close.svg" alt="assessment icon" className="w-6 h-6" title = "Priority" onClick={()=>{handleLogDelete(log.id)}}/>
                        </button>
                    </div>

                    </li>
                ))}
                </ul>
                <div className='p-4'>

                <button className='text-white py-2 px-4 rounded inline-block' onClick={addTask}>
                    Add Task
                </button>

                </div>

                {showForm && (
                    <FormOverlay onClose={closeForm} onSubmit={handleSubmit} />
                )}
                </div>

                ) : (

                <div className='label p-2'>
                    Loading...
                </div>
                    )
                }          
            </div>

            <div className="bg-white w-full py-4 flex flex-col rounded-md borders shadow-custom mt-5">
            <h1 className='p-4'>
                 Needs and considerations:
            </h1>            
            
            {userInfo ? (
              <div>

                <div className='pb-2'>
                { userInfo.stay.dementia && 
                <label className='label px-4 pt-4 pb-2'> This resident has dementia. </label>
                }
                </div>    
              
                <label className='label px-4 pt-4 pb-2'> Diagnoses: </label>
                <div className='px-4 pb-4'>
                  {cleanString(userInfo.stay.diagnoses)}
                </div>

                <label className='label px-4 pt-4 pb-2'> Allergies: </label>
                <div className='px-4 pb-4'>
                  {cleanString(userInfo.stay.allergies)}
                </div>


                <label className='label px-4 pt-4 pb-2'> Flags: </label>
                <div className='px-4 pb-4'>
                  {cleanString(userInfo.stay.flags)}
                </div>


                <label className='label px-4 pt-4 pb-2'> Notes: </label>
                <div className='px-4 pb-4'>
                  {(userInfo.stay.notes)}
                </div>

                <label className='label px-4 pt-4 pb-2'> Care instructions: </label>
                <div className='px-4 pb-4'>
                  
                </div>

                </div>


                ) : (

                <div className='label p-2'>
                    Loading...
                </div>
                    )
                }   
            </div>

        </div>




        <div className='flex flex-col w-1/3 h-screen overflow-y-auto px-5'>
            
        <div className="bg-white w-full flex flex-col rounded-md borders shadow-custom mt-5">
            <h1 className='p-4'>
                 Daily Log
            </h1>            
            </div>
            
            {logs ? (
            logs.map((log, index) => (
                <div key={index} className="bg-white w-full flex flex-col rounded-md borders shadow-custom mt-5">
                <div className="flex justify-between items-center">
                    <label className='p-2'>
                        Log for {log.date}:
                    </label>
                    <div>
                        {/* Your two buttons here */}
                        {/* <button className="bg-white hover:bg-gray-200 rounded inline-block p-1 m-1">
                        <img src="/assets/icons/edit.svg" alt="assessment icon" className="w-6 h-6" title = "Priority"/>
                        </button> */}
                        <button className="bg-white hover:bg-gray-200 rounded inline-block p-1 m-1">
                        <img src="/assets/icons/close.svg" alt="assessment icon" className="w-6 h-6" title = "Priority" onClick={()=>{handleLogDelete(log.id)}}/>
                        </button>
                    </div>
                </div>
                <div className='p-2 body-text'>
                    {log.note}
                </div>
                <div className='p-2 italic text-sm'>
                    Signed by: {log.staff}
                </div>
            </div>
            ))
            ) : (
                <div className='label p-2'>
                    Loading...
                </div>
            )}
            {showNoteForm && (
                    <NoteOverlay onClose={closeAddNote} onSubmit={handleNoteSubmit} />
                )}

        <button className='text-white py-2 px-4 rounded inline-block mt-5' onClick = {handleAddNote}>
            New Note
        </button>
            
        </div>


        </div>


  )
            }

export default Assessment
