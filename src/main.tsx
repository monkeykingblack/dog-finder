import "./index.css";

import ReactDOM from "react-dom/client";

/**
 * If Issue: https://github.com/visgl/react-google-maps/discussions/316
 * are resolved for @lordicon/react, then we replace the following import
 */
import { defineElement } from "@lordicon/element";
import lottie from "lottie-web";

import App from "./App.tsx";

defineElement(lottie.loadAnimation);

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
