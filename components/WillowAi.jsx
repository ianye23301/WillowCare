import { useState, useEffect } from "react";

const WillowAi = ({ category, onSave }) => {
    const [isLoading, setIsLoading] = useState(false);

    const [inputNeedsText, setInputNeedsText] = useState('');
    const [inputPlansText, setInputPlansText] = useState('');
    const [inputMethodText, setInputMethodText] = useState('');

    const [processedNeed, setProcessedNeed] = useState('');
    const [processedPlan, setProcessedPlan] = useState([]);
    const [checkedState, setCheckedState] = useState({}); // Store checkbox states
    const [plan, setPlan] = useState('');

    const [timeFrame, setTimeFrame] = useState('');

    const [responsiblePerson, setResponsiblePerson] = useState('');

    const [processedMethod, setProcessedMethod] = useState([]);
    const [checkedMethodState, setCheckedMethodState] = useState({}); // Store checkbox states
    const [method, setMethod] = useState('');

    const cat = category[0] + category.toLowerCase().slice(1);

    const [jsonState, setJsonState] = useState({
        processedNeed: '',
        plan: '',
        timeFrame: '',
        responsiblePerson: '',
        method: '',
    });

    const handleJSONSubmit = (e) => {
        e.preventDefault();

        const newState = {
            processedNeed,
            plan,
            timeFrame,
            responsiblePerson,
            method,
        };

        setJsonState(newState);
        onSave(newState); // Call the onSave callback with the new state
    };

    const submitForm = async () => {
        setIsLoading(true);
        await getNeed();
        setIsLoading(false);
    };

    const getNeed = async () => {
        try {
            const response = await fetch('/api/service_plans/needs', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: inputNeedsText,
                    category: cat,
                })
            });
            const data = await response.text();
            setProcessedNeed(data);
            await getPlans(data)
        } catch (error) {
            console.error('Error creating service need:', error);
        }
    }

    const getPlans = async (need) => {
        try {
            const response = await fetch('/api/service_plans/plans', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: need,
                    userAddOns: inputPlansText,
                    category: cat,
                })
            });

            const data = await response.json();
            await getMethods(data.Plans,need)
            setProcessedPlan(data.Plans);

        } catch (error) {
            console.error('Error fetching service plan:', error);
        }
    }

    const getMethods = async (plans,needs) => {
        try {
            const response = await fetch('/api/service_plans/methods', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    // user_email: session.user.email
                    text: needs,
                    plan: JSON.stringify({plans}),
                    userAddOns: inputMethodText,
                    category: cat,
                })
            });
            const data = await response.json();
            setProcessedMethod(data.Methods);
            console.log(data)

        } catch (error) {
            console.error('Error fetching service plan:', error);
        }
    }
    const handleCheckboxChange = (index, isChecked) => {
        setCheckedState(prev => ({ ...prev, [index]: isChecked }));
    };

    const handleMethodCheckboxChange = (index, isChecked) => {
        setCheckedMethodState(prev => ({ ...prev, [index]: isChecked }));
    };

    useEffect(() => {
        const selectedPlans = processedPlan.filter((_, index) => checkedState[index]);
        const planString = selectedPlans.map(plan => plan.Plan).join(", ");
        setPlan(planString);
    }, [checkedState, processedPlan]);

    // Effect to update method string whenever checkbox states change
    useEffect(() => {
        const selectedMethods = processedMethod.filter((_, index) => checkedMethodState[index]);
        const methodString = selectedMethods.map(method => method.Method).join(", ");
        setMethod(methodString);
    }, [checkedMethodState, processedMethod]);

    const renderPlanOptions = () => {
        return processedPlan.map((plan, index) => (
            <div  key={index} className="pb-3">
            <div key={index} className="input-text borders py-3 px-3 rounded-lg">
                <input
                    type="checkbox"
                    id={`plan_${index}`}
                    name={`plan_${index}`}
                    value={plan.Plan}
                    checked={!!checkedState[index]} // Convert truthy/falsy to boolean
                    onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                />
                <label htmlFor={`plan_${index}`} className="ml-2">{plan.Plan}</label>
            </div>
            </div>
        ));
    };

    const renderMethodOptions = () => {
        return processedMethod.map((method, index) => (
            <div key={index} className="pb-3">
            <div className="input-text borders py-3 px-3 rounded-lg">
                <input
                    type="checkbox"
                    id={`method_${index}`}
                    name={`method_${index}`}
                    value={method.Method}
                    checked={!!checkedMethodState[index]} // Convert truthy/falsy to boolean
                    onChange={(e) => handleMethodCheckboxChange(index, e.target.checked)}
                />
                <label htmlFor={`method_${index}`} className="ml-2">{method.Method}</label>
            </div>
            </div>
        ));
    }



    return (
        <div>

        <div className="space-y-6 bg-white p-6 rounded-lg borders shadow-custom" style={{ maxWidth: '600px', width: '100%', margin: '0 auto', padding: '20px' }}>
            <h2 className="mb-3">Willow AI Assistant - {cat}</h2>
            <div>
                <label htmlFor="inputNeedsText" className="block text-sm label">NEEDS</label>
                <textarea
                    type="text"
                    name="inputNeedsText"
                    id="inputNeedsText"
                    value={inputNeedsText}
                    onChange={(e) => setInputNeedsText(e.target.value)}
                    placeholder="Write a brief description of the resident’s needs. E.G. resident is lonely, resident does not eat well, resident has difficulty sleeping"
                    className="w-full mt-1 p-3 h-24 border input-text border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                />
            </div>
            

            <div>
                <label htmlFor="inputPlansText" className="block text-sm label">OBJECTIVE/PLAN (Optional)</label>
                <textarea
                    type="text"
                    name="inputPlansText"
                    id="inputPlansText"
                    value={inputPlansText}
                    onChange={(e) => setInputPlansText(e.target.value)}
                    placeholder="Share an objective or plan for need. E.G. encourage social interactions, customize appealing, nutritious meals, implement relaxing bedtime routines"
                    className="w-full mt-1 p-3 h-24 border input-text border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                />
            </div>
          

            

            {/* input for time frame */}
            <div>
                <label htmlFor="timeFrame" className="block text-sm label">Time Frame</label>
                <input
                    type="text"
                    name="timeFrame"
                    id="timeFrame"
                    value={timeFrame}
                    onChange={(e) => setTimeFrame(e.target.value)}
                    placeholder="Add a time frame. E.G. 6 months, 3 weeks"
                    className="w-full mt-1 p-3 border input-text border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            {/* input for responsible person */}
            <div>
                <label htmlFor="responsiblePerson" className="block text-sm label">Responsible Person</label>
                <input
                    type="text"
                    name="responsiblePerson"
                    id="responsiblePerson"
                    value={responsiblePerson}
                    onChange={(e) => setResponsiblePerson(e.target.value)}
                    placeholder="Name the person/people responsible for this plan"
                    className="w-full mt-1 p-3 border input-text border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <div>
                <label htmlFor="inputMethodText" className="block text-sm label">METHOD OF EVALUATING PROGRESS (Optional)</label>
                <textarea
                    type="text"
                    name="inputMethodText"
                    id="inputMethodText"
                    value={inputMethodText}
                    onChange={(e) => setInputMethodText(e.target.value)}
                    placeholder="Share an objective or plan for need. E.G. monitor engagement in social activities, track nutritional and meal enjoyment, assess sleep quality and duration"
                    className="w-full mt-1 p-3 h-24 border input-text border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                />
            </div>

            <button
                type='submit'
                className="w-full button text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                onClick={submitForm}
            >
                {isLoading ? 'Loading...' : 'Generate'}
            </button>  

            </div> 


            
            {!isLoading && processedNeed && processedPlan && processedMethod && (
                <div className="pt-4">
                <div className=" space-y-6 bg-white p-6 rounded-lg borders shadow-custom" style={{ maxWidth: '600px', width: '100%', margin: '0 auto', padding: '20px' }}>


                    <div className="label py-3">NEEDS:</div>
                    <p className="input-text py-6 px-4 borders rounded-lg">{processedNeed}</p>
                    <fieldset>
                        <legend className="text-sm label pt-5 pb-3">Choose OBJECTIVE/PLAN Response</legend>
                        <div className="mt-2">{renderPlanOptions()}</div>
                    </fieldset>
                    <fieldset>
                        <legend className='text-sm label pt-6 pb-4'>Choose METHOD Response</legend>
                        {renderMethodOptions()}
                    </fieldset>



                <button
                    type='submit'
                    className="w-full button text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                    onClick={handleJSONSubmit}
                    > Save
                </button>

                </div>
                </div>
                


            )}

            
        
        </div>
    )
}

export default WillowAi;
