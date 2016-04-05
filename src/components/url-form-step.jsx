import classNames from 'classnames';
import {testSite, testSiteStub} from '../modules/speedy-api';

const DOMAIN_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;

const validateUrl = (url) =>
  (url && DOMAIN_REGEX.test(url)) ? true : false;

const updateResults = (store, results) =>
  store.update({
    resultsLoaded: {$set: true},
    theirResults: {$set: results}
  });

const updateError = (store, error) =>
  store.update({
    apiError: {$set: error}
  });

const onGo = ({store, nextStep}, e) => {
  const {url, isValidUrl} = store.get();

  e.preventDefault();

  if (isValidUrl) {
    // TODO: switch to testSite when API is live...
    testSiteStub(
      url,
      updateResults.bind(null, store),
      updateError.bind(null, store)
    );
    nextStep();
  }
};

const onChange = ({store}, e) =>
  store.update({
    url: {$set: e.target.value},
    isValidUrl: {$set: validateUrl(e.target.value)}
  });

const UrlFormStep = (props) => (
  <section className="bb bb-muted mt-90 mb-90">
    <header>
      <h1 className="alpha mb-30 muted">Test the performance of your current site.</h1>
      <p className="zeta p--wide muted">Type in your site's domain. Make sure you enter a valid domain name. Leave out http or any trailing slashes.</p>
    </header>
    <form className="form form--fancy form--but-not-that-fancy mt-40 mb-60">
      <p className="form-group--full">
        <input
            type="url"
            required={true}
            placeholder="example.com"
            className={classNames({
                'form-input--invalid': props.store.get().isValidUrl === false
              })}
            value={props.store.get().url}
            onChange={onChange.bind(null, props)}
        />
      </p>
      <button className="form-button" type="submit" onClick={onGo.bind(null, props)}>Go</button>
    </form>
  </section>
);

export default UrlFormStep;
