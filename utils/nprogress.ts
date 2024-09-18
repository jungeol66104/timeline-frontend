import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({
    showSpinner: false,
    minimum: 0.01,
    trickleSpeed: 50
});

export default NProgress;