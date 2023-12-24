import AppController from '../controllers/AppController';

const routes = {
  'GET /status': AppController.getStatus,
  'GET /stats': AppController.getStats,
};

export default routes;
