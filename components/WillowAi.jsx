import { useState, useEffect } from "react";

const WillowAi = ({ category, onSave }) => {
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

    const getNeed = async () => {
        // console.log('Submitted text:', inputNeedsText);
        try {
            const response = await fetch('/api/service_plans/needs', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: inputNeedsText,
                    category: cat,
                    // user_email: session.user.email
                })
            });
            const data = await response.text();
            console.log(data)
            setProcessedNeed(data);
        } catch (error) {
            console.error('Error creating service need:', error);
        }
    }

    const getPlans = async () => {
        try {
            const response = await fetch('/api/service_plans/plans', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    // user_email: session.user.email
                    text: processedNeed,
                    userAddOns: inputPlansText,
                    category: cat,
                })
            });
            const data = await response.json();
            console.log(data)
            setProcessedPlan(data.Plans);
        } catch (error) {
            console.error('Error fetching service plan:', error);
        }
    }

    const getMethods = async () => {
        try {
            const response = await fetch('/api/service_plans/methods', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    // user_email: session.user.email
                    text: processedNeed,
                    plan: plan,
                    userAddOns: inputMethodText,
                    category: cat,
                })
            });
            const data = await response.json();
            console.log(data)
            setProcessedMethod(data.Methods);
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
            <div key={index}>
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
        ));
    };

    const renderMethodOptions = () => {
        return processedMethod.map((method, index) => (
            <div key={index}>
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
        ));
    }



    return (
        <div className="space-y-6 bg-white p-6 rounded-lg shadow-lg" style={{ maxWidth: '600px', width: '100%', margin: '0 auto', padding: '20px' }}>
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">Willow AI bot - {cat}</h1>
            <div>
                <label htmlFor="inputNeedsText" className="block text-sm font-medium text-gray-700">Enter a few words on needs</label>
                <input
                    type="text"
                    name="inputNeedsText"
                    id="inputNeedsText"
                    value={inputNeedsText}
                    onChange={(e) => setInputNeedsText(e.target.value)}
                    placeholder="Enter some text..."
                    className="w-full mt-1 p-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                onClick={getNeed}
            >
                Get Needs
            </button>

            <p className="text-gray-600">{processedNeed}</p>

            <div>
                <label htmlFor="inputPlansText" className="block text-sm font-medium text-gray-700">Extra Info on Plans</label>
                <input
                    type="text"
                    name="inputPlansText"
                    id="inputPlansText"
                    value={inputPlansText}
                    onChange={(e) => setInputPlansText(e.target.value)}
                    placeholder="Enter some text..."
                    className="w-full mt-1 p-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                onClick={getPlans}
            >
                Get Plans
            </button>

            <fieldset>
                <legend className="text-sm font-medium text-gray-700">Select Plans:</legend>
                <div className="mt-2 space-y-2">{renderPlanOptions()}</div>
            </fieldset>
            {plan && (
                <div className="mt-4">
                    <legend className="text-sm font-medium text-gray-700">Select Plans:</legend>
                    <p className="text-gray-600">{plan}</p>
                </div>
            )}

            {/* input for time frame */}
            <div>
                <label htmlFor="timeFrame" className="block text-sm font-medium text-gray-700">Time Frame</label>
                <input
                    type="text"
                    name="timeFrame"
                    id="timeFrame"
                    value={timeFrame}
                    onChange={(e) => setTimeFrame(e.target.value)}
                    placeholder="Enter some text..."
                    className="w-full mt-1 p-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            {/* input for responsible person */}
            <div>
                <label htmlFor="responsiblePerson" className="block text-sm font-medium text-gray-700">Responsible Person</label>
                <input
                    type="text"
                    name="responsiblePerson"
                    id="responsiblePerson"
                    value={responsiblePerson}
                    onChange={(e) => setResponsiblePerson(e.target.value)}
                    placeholder="Enter some text..."
                    className="w-full mt-1 p-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <div>
                <label htmlFor="inputMethodText" className="block text-sm font-medium text-gray-700">Extra Info on Methods</label>
                <input
                    type="text"
                    name="inputMethodText"
                    id="inputMethodText"
                    value={inputMethodText}
                    onChange={(e) => setInputMethodText(e.target.value)}
                    placeholder="Enter some text..."
                    className="w-full mt-1 p-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <button
                type='submit'
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                onClick={getMethods}
            >
                Get Methods
            </button>

            <fieldset>
                <legend className='text-sm font-medium text-gray-700'>Select Methods:</legend>
                {renderMethodOptions()}
            </fieldset>

            {method && (
                <div>
                    <h2 className='text-xl font-bold mt-4'>Selected Methods:</h2>
                    <p>{method}</p>
                </div>
            )}

            <button
                type='submit'
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                onClick={handleJSONSubmit}
            > Save
            </button>
        </div>
    )
}

export default WillowAi;
