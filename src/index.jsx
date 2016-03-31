import ReactDOM from 'react-dom';
import ReactFastclick from 'react-fastclick';

import Speedy from './components/speedy';
import 'style!css!sass!./styles/site.scss';

ReactDOM.render((
  <section className="bg-light-muted muted text-center bb bb--large speedy">
    <div className="content content--narrow">
      <Speedy/>
    </div>
  </section>
), document.getElementById('speedy'));
