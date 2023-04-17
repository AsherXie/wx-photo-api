import { createRoot } from 'react-dom/client';
import Modal from './index';

const div = document.createElement('div');

export default () => {
  document.body.appendChild(div);

  createRoot(div).render(<Modal msg="1111" type="1212" />);

  setTimeout(() => { document.body.removeChild(div); }, 3000);
};
