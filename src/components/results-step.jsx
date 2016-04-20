import Loader from './loader';
import StatsList from './stats-list.jsx';
import ResultsTable from './results-table.jsx';
import ProblemsList from './problems-list.jsx';
import BenefitsList from './benefits-list.jsx';

const ResultsStep = ({url, resultsLoaded, apiError, ourResults, theirResults, answers}) => {
  const results = apiError ? (
    <section className="results-error">
      Oops! Something went wrong. Refresh the page and try again.
    </section>
  ) : (
    <Loader loaded={resultsLoaded}>
      <StatsList ourResults={ourResults} theirResults={theirResults}/>
      <ResultsTable ourResults={ourResults} theirResults={theirResults}/>
      <ProblemsList ourResults={ourResults} theirResults={theirResults}/>
      <BenefitsList answers={answers}/>
      <section>
        <a className="pill-button" href="https://app.netlify.com">See how easy it is to switch</a>
      </section>
    </Loader>
  );

  return (
    <section className="results mt-90 mb-90">
      <header className="results-header">
        <h3 className="results-header__title muted">
          See how <a className="results-header__url" href={url}>{url}</a> would improve by switching to Netlify.
        </h3>
      </header>
      {results}
    </section>
  );
};

export default ResultsStep;
