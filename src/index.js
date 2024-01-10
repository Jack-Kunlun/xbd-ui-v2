import { Drawer } from "element-ui";
import Vue from "vue";
import XbdDrawer from "../packages/drawer";

Vue.use(Drawer);

const components = [XbdDrawer];

const install = (Vue) => {
	components.forEach((component) => {
		Vue.component(component.name, component);
	});
};

if (typeof window !== "undefined" && window.Vue) {
	install(window.Vue);
}

export default {
	install,
	XbdDrawer,
};
