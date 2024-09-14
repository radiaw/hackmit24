import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

// For demo purposes. In a real app, you'd have real user data.
const NAME = faker.person.firstName();

function Chat() {
  const messages = useQuery(api.messages.list);
  const sendMessage = useMutation(api.messages.send);

  const [newMessageText, setNewMessageText] = useState("");

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 0);
  }, [messages]);

  return (
    <main className="chat">
      <header>
        <h1>Convex Chat</h1>
        <p>
          Connected as <strong>{NAME}</strong>
        </p>
      </header>
      {messages?.map((message) => (
        <article
          key={message._id}
          className={message.author === NAME ? "message-mine" : ""}
        >
          <div>{message.author}</div>

          <p>{message.body}</p>
        </article>
      ))}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await sendMessage({ body: newMessageText, author: NAME });
          setNewMessageText("");
        }}
      >
        <input
          value={newMessageText}
          onChange={async (e) => {
            const text = e.target.value;
            setNewMessageText(text);
          }}
          placeholder="Write a message…"
        />
        <button type="submit" disabled={!newMessageText}>
          Send
        </button>
      </form>
    </main>
  );
}

function NavBar() {
  return (
    <nav className="bg-blue-700 text-white">
        <ul className="flex flex-row p-2 gap-2 text-xl justify-start">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
        </ul>
    </nav>
  )
}

function About() {
  return (
    <main className= "h-screen w-screen bg-slate-200">
      <NavBar />
      <div>
        <h1>Patient Disease Classification</h1>
        <p>This is the page about disease classification.</p>
      </div>
    </main>
  );
}

function Home() {
  return (
    <main className= "h-screen w-screen bg-slate-200">
      <NavBar />
      <div className="flex flex-col justify-center">
        <div className="flex flex-row justify-center">
          <h1 className="text-bold mb-4 text-4xl mx-20">Getting Started</h1>
        </div>
        <div className="flex flex-row justify-center gap-2">
          <a href="/createaccount"><button className="rounded-md p-2 bg-blue-700 text-white">Create Account</button></a>
          <a href="/login"><button className="rounded-md p-2 text-blue-700 bg-white">Log In</button></a>
        </div>
        </div>
    </main>
  );
}

function Login() {
  return (
    <main className= "h-screen w-screen bg-slate-200">
      <NavBar />
      <div className="flex flex-row justify-center">
        <div className="flex flex-col h-full justify-center">
          <div className="mt-16 bg-white w-60 p-4 rounded-lg shadow-md">
            <h1 className="text-bold text-2xl">Log In</h1>
            <form className="flex flex-col gap-2">
              <label>Username:</label>
              <input></input><br />
              <label>Password:</label>
              <input type="password"></input><br />
              <button type="submit" className="rounded-md p-2 bg-blue-700 text-white" onClick={()=>{alert("Login button pressed")}}>Log In</button>
            </form>
            <div className="bg-red-200 text-red-800 p-2 my-2 rounded-md flex flex-row justify-start hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
              <p>Incorrect Username or Password</p>
            </div>
            <p className="m-2">Don't have an account? <a href="/createaccount" className="text-blue-700">Create Account</a></p>
          </div>
        </div>
      </div>
    </main>
  );
}

function CreateAccount() {
  return (
    <main className= "h-screen w-screen bg-slate-200">
      <NavBar />
      <div className="flex flex-row justify-center">
        <div className="flex flex-col h-full justify-center">
          <div className="mt-16 bg-white w-60 p-4 rounded-lg shadow-md">
            <h1 className="text-bold text-2xl">Create Account</h1>
            <form className="flex flex-col gap-1">
              <label>Name:</label>
              <input></input><br />
              <label>Username:</label>
              <input></input><br />
              <label>Password:</label>
              <input type="password"></input><br />
              <label>Confirm Password:</label>
              <input type="password"></input><br />
              <button type="submit" className="rounded-md p-2 bg-blue-700 text-white" onClick={()=>{alert("create account button pressed")}}>Create Account</button>
            </form>
            <div className="bg-red-200 text-red-800 p-2 my-2 rounded-md flex flex-row justify-start hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
              <p>One or more fields unfilled</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function Patient() {
  return (
    <div className="bg-white shadow-md rounded-md flex flex-row my-4">
      <div className="flex flex-row justify-between w-full py-4 px-6 text-lg">
        <p>Lastname, Firstname</p>
        <div>
          <button className="px-2 py-1 mx-2">Edit Medical History</button>
          <button className="px-2 py-1 mx-2">View Progress</button>
          <button className="px-2 py-1 mx-2 text-white bg-blue-700">Run Test</button>
        </div>
      </div>
    </div>
  )
}

function Dashboard() {
  return (
    <main className= "h-screen w-screen bg-slate-200">
    <NavBar />
    <div className="m-20">
    <input className="mr-2" placeholder="Search Patients"></input><button className="bg-blue-700 text-white px-2 py-1 rounded-md">Search</button><br />
    <a href="/addpatient"><button className="bg-blue-700 text-white px-2 py-1 my-2">+ Add Patient</button></a>
    <div className="grid grid-cols-1">
      <Patient />
    </div>
    </div>
    
  </main>
  )
}


function AddPatient() {
  const Ages: number[] = Array.from(Array(100).keys())
  console.log(Ages)
  return (
    <main className= "w-screen h-screen bg-slate-200">
      <NavBar />
      <div className="m-10 flex flex-col justify-center w-full">
        <h1 className="font-bold text-4xl">Add Patient</h1>
        <form>
          <h2 className="text-2xl">General Information</h2>
          <label> First Name: </label><input></input>
          <label> Middle Name: </label><input></input>
          <label> Last Name: </label><input></input><br />
          <label>Age: </label><input></input>
          <label> Gender: </label>
          <select>
            <option>Select</option>
            <option value="F">Female</option>
            <option value="M">Male</option>
          </select>
          <label> Race: </label>
          <select>
            <option>Select</option>
            <option value="AA">African American</option>
            <option value="A">Asian</option>
            <option value="C">Caucasian</option>
            <option value="O">Other</option>
          </select>
          <label> Education: </label>
          <select>
            <option>Select</option>
            <option value="0">Less than High School</option>
            <option value="1">High School Diploma</option>
            <option value="2">Bachelor's Degree</option>
            <option value="3">Graduate Degree</option>
          </select>
          <br />
          <h2 className="text-2xl">Medical History</h2>
          <p>Check all that apply:</p>
          <input type="checkbox"></input><label> Family History of Parkinson's Disease</label>
          <input type="checkbox"></input><label> Traumatic Brain Injury</label>
          <input type="checkbox"></input><label> Hypertension</label>
          <input type="checkbox"></input><label> Diabetes</label>
          <input type="checkbox"></input><label> Depression</label>
          <input type="checkbox"></input><label> Stroke</label><br />
          <h2 className="text-2xl">Lifestyle</h2>
          <input type="checkbox"></input><label> Smoking</label>
          <label>Alcohol Consumption: </label><input></input>
          <label>Physical Activity: </label><input></input>
          <label>Body Mass Index: </label><input></input><br />
          <h2 className="text-2xl">Clinical Measurements</h2>
          <label>Blood Pressure: </label><input></input>/<input></input><br />
          <label>Cholesterol: Total </label><input></input>
          <label> LDL </label><input></input>
          <label> HDL </label><input></input>
          <label> Triglycerides </label><input></input><br />
          <h2 className="text-2xl">Clinical Measurements</h2>
          <label>UPDRS (Unified PArkinson's Disease Rating Scale Score): </label><input></input>
          <label>MoCA (Montreal Cognitive Assessment Score): </label><input></input>
          <label>Functional Assessment Score: </label><input></input><br />
          <h2 className="text-2xl">Symptoms</h2>
          <p>Check all that apply:</p>
          <input type="checkbox"></input><label> Tremor</label>
          <input type="checkbox"></input><label> Rigidity</label>
          <input type="checkbox"></input><label> Bradykinesia</label>
          <input type="checkbox"></input><label> Postural Instability</label>
          <input type="checkbox"></input><label> Speech Problems</label>
          <input type="checkbox"></input><label> Sleep Disorder</label>
          <input type="checkbox"></input><label> Constipation</label><br />
          <h2 className="text-2xl">Diagnosis</h2>
          <input type="checkbox"></input><label> Parkinson's Disease</label><br />
          <button type="submit" className="bg-blue-700 px-2 py-1 m-2 text-white" onClick={() => alert("Patient Info submission")}>Submit</button>
          <button className="px-2 py-1 m-2">Cancel</button>
        </form>
      </div>
    </main>
  )
}

function Test() {
  return (
    <main className= "h-screen w-screen bg-slate-200">
      <NavBar />
    </main>
  )
}

function Results() {
  return (
    <main className= "h-screen w-screen bg-slate-200">
      <NavBar />
    </main>
  )
}










// // //






export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/test" element={<Test />} />
        <Route path="/addpatient" element={<AddPatient />} />
        <Route path="/results" element={<Results />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}