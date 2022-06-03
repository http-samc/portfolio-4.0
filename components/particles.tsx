import { useEffect } from "react";
import React from "react";
import Particles from "../utils/particles";

const Star: React.FC = function () {
    useEffect(() => Particles.init(), []);

    return <canvas style={{ pointerEvents: 'none', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }} id="particles"></canvas>;
};

export default Star;