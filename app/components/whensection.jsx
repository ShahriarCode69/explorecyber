import React from "react";

export default function WhenSection() {
  return (
    <section className="section mx container">
      <div className="grid grid-cols-5 grid-rows-7 gap-2">
        <div className="hidden bg-red-300 md:col-span-5 md:row-span-2 md:block">
          Div 1
        </div>

        <div className="col-span-5 border bg-green-300 md:col-span-3 md:row-span-5 md:row-start-3">
          Div 2
        </div>

        <div className="col-span-5 bg-blue-300 md:col-span-2 md:col-start-4 md:row-span-5 md:row-start-3">
          Div 3
        </div>
      </div>
    </section>
  );
}
