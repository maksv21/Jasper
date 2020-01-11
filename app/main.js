import {ControllerApplication} from "./application/ControllerApplication.js";
if(!localStorage.getItem('jasper_debug')) {localStorage.setItem('jasper_debug', '0');}
new ControllerApplication();
