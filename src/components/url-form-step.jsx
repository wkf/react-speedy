import classNames from 'classnames';

const DOMAIN_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;

const validateUrl = (url) =>
  (url && DOMAIN_REGEX.test(url)) ? true : false;

/* const runSpeedTest = (store) => {
   window.fetch('https://api.netlify.com/api/v1/speed_tests', {
   method: 'POST',
   headers: {
   'Accept': 'application/json',
   'Content-Type': 'text/plain'
   },
   body: store.get().url
   });
   };
 */

const onGo = ({store, nextStep}, e) => {
  e.preventDefault();
 store.get().isValidUrl && nextStep();
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
      <p className="form-group">
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
