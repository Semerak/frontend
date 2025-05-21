import { useState } from "react";

export function Welcome() {
  const [data, setData] = useState(0);
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="text-red-500">Hello
        <button
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setData(data + 1)}
        >
          Clicked {data} times
        </button>
      </div>
    </main>
  );
}
