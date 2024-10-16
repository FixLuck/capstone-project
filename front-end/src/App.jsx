import "./App.css";
import MemberManager from "@/MemberTable";
import MemberChange from "./MemberChange";

function App() {
  return (
    <div>
      <div className="mt-16 px-20">
        <MemberChange/>
        <MemberManager/>
      </div>
    </div>
  );
}

export default App;
