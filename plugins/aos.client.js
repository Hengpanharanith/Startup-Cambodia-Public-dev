import AOS from "aos";
import "aos/dist/aos.css";

const options = {
    startEvent: 'DOMContentLoaded',
    useClassNames: false,
};

export default ({ app }) => {
    app.AOS = new AOS.init(options);
};
