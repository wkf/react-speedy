import classNames from 'classnames';

const onGo = ({url, isValidUrl, runSpeedtest, nextStep}, e) => {
  e.preventDefault();

  if (isValidUrl) {
    runSpeedtest(url);
    nextStep();
  }
};

const onChange = ({updateUrlish}, e) =>
  updateUrlish(e.target.value);

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
                'form-input--invalid': props.isValidUrl === false
              })}
            value={props.url}
            onChange={onChange.bind(null, props)}
        />
      </p>
      <button className="form-button" type="submit" onClick={onGo.bind(null, props)}>Go</button>
    </form>
  </section>
);

export default UrlFormStep;
