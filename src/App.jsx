import { BrowserRouter } from "react-router-dom";
import Baseroute from "./apps/Baseroute";

export default function App() {
  return (
    <BrowserRouter>
      <Baseroute />
    </BrowserRouter>
  );
}
