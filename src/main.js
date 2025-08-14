import './styles.css';
import App from './App.svelte';

const appMountElement = document.getElementById('app');

const app = new App({
  target: appMountElement
});

export default app;


