import React from "react";

const Modaloverlay: React.FC<{
  message: string;
  onclose: ()=> void
}> = ({ message, onclose }) => {
  return (
    <>
      <section className="modaloverlay z-[100]  top-0 h-[100vh] fixed flex flex-col justify-center items-center w-full ">
        <div className="bg-gray-800 flex flex-col justify-center items-center max-sm:w-[85%] sm:w-[65%] md:w-[55%] lg:w-[35%] h-[30%] rounded-lg">
          <p>{message}</p>
          <button className="p-2 mt-[2%] text-gray-900 rounded-lg bg-white" onClick={onclose}>close</button>
        </div>
      </section>
    </>
  );
};

export default Modaloverlay;
