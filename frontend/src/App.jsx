import React from "react";
import Input from "./components/Input";
const App = () => {
  return (
    <>
      <div className="relative min-h-screen w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
        <div className="relative z-10">
          <Input />
        </div>
      </div>
    </>
  );
};

export default App;
