// vite.config.js
import { defineConfig } from "file:///P:/Project%20Materials/CLOTHIFY%20FASHION/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///P:/Project%20Materials/CLOTHIFY%20FASHION/frontend/node_modules/@vitejs/plugin-react/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: { port: 5173 }
});
export {
  vite_config_default as default
};


