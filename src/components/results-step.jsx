import Loader from 'react-loader';

import StatsList from './stats-list.jsx';
import ResultsTable from './results-table.jsx';
import ProblemsList from './problems-list.jsx';
import BenefitsList from './benefits-list.jsx';

const ResultsStep = ({store}) => {
  const {url} = store.get();

  return (
    <section className="results mt-90 mb-90">
      <Loader loaded={true}>
        <header className="results-header">
          <h3 className="results-header__title muted">
            See how <a className="results-header__url" href={url}>{url}</a> would improve by switching to Netlify.
          </h3>
        </header>
        <StatsList store={store}/>
        <ResultsTable store={store}/>
        <ProblemsList store={store}/>
        <BenefitsList store={store}/>
        <section>
          <a className="pill-button" href="#">See how easy it is to switch</a>
        </section>
      </Loader>
    </section>
  );
};

export default ResultsStep;
