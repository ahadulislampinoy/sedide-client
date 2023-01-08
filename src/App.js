import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";

function App() {
  return (
    <div className="bg-[#111827] text-gray-50">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
