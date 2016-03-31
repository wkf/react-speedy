const ResultsTable = ({store}) => {
  const {ourResults, theirResults} = store.get();
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">You</th>
          <th scope="col">Netlify</th>
          <th scope="col">Details</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" className="th--row">HTML download time</th>
          <td>{theirResults.downloadTime}</td>
          <td>{ourResults.downloadTime}</td>
          <td>
            <p>
              {/* The time it takes before the whole HTML page has been downloaded by the browser. Scripts included at the end of the page won't start loading at all before this point. The DOMContentLoaded event on the page won't fire before this step has been completed. Typically any JavaScript you run on the page, won't start doing things before this phase is complete. */}
            </p>
          </td>
        </tr>
        <tr>
          <th scope="row" className="th--row">HTTPS?</th>
          <td className="result--better">{theirResults.usesHttps ? '✓' : '×'}</td>
          <td className="result--better">{ourResults.usesHttps ? '✓' : '×'}</td>
          <td>
            <p>
              HTTPS is important for a number of reasons - see why HTTPS for static sites article.
            </p>
          </td>
        </tr>
        <tr>
          <th scope="row" className="th--row">DNS time</th>
          <td>{theirResults.dnsTime}</td>
          <td>{ourResults.dnsTime}</td>
          <td>
            <p>
              Every new visitor to your site will need to do a DNS lookup before their browser can even start connecting to your site. Some setups requires multiple DNS lookups before the browser can get the final IP address to connect to, so if your DNS is slow, new visitors to your site will have to wait for the DNS lookups to complete.
            </p>
          </td>
        </tr>
        <tr>
          <th scope="row" className="th--row">Connection time</th>
          <td>{theirResults.connectionTime}</td>
          <td>{ourResults.connectionTime}</td>
          <td>
            <p>
              This is the time it takes for your browser to establish a connection to the IP address returned after the DNS lookup. It will typically depend on the quality of the network connection and the peering agreements between the end user and the server responding to the browser's request.
            </p>
          </td>
        </tr>
        <tr>
          <th scope="row" className="th--row">Time to first byte</th>
          <td>{theirResults.timeToFirstByte}</td>
          <td>{ourResults.timeToFirstByte}</td>
          <td>
            <p>
              This is a very important metric for performance. It's the time it takes from the browser starts connecting to the IP address returned by the DNS lookup, and until it starts receiving HTML. This is the point where the browser has the chance to start parsing and rendering things on the screen.
            </p>
          </td>
        </tr>
        <tr>
          <th scope="row" className="th--row">HTTPS handshake time</th>
          <td>{theirResults.httpsTime}</td>
          <td>{ourResults.httpsTime}</td>
          <td>
            <p>
              If HTTPS is enabled, this is the time it takes to negotiate the encrypted connection between the browser and the server at the IP address returned from the...?
            </p>
          </td>
        </tr>
        <tr>
          <th scope="row" className="th--row">Secure cipher?</th>
          <td className="result--worse">{theirResults.usesSecureCipher ? '✓' : '×'}</td>
          <td className="result--better">{ourResults.usesSecureCipher ? '✓' : '×'}</td>
          <td>
            <p>
              We won't show the raw data for this. But in some cases the server will be configured to use an old encryption mechanism that's no longer secure when using HTTPS. If we spot this, we can link people to the full SSL test at SSLLabs where they'll be told that their SSL setup is bad and insecure.
            </p>
          </td>
        </tr>
        <tr>
          <th scope="row" className="th--row">Secure algorithm?</th>
          <td className="result--worse">{theirResults.usesSecureAlgorithm ? '✓' : '×'}</td>
          <td className="result--better">{ourResults.usesSecureAlgorithm ? '✓' : '×'}</td>
          <td>
            <p>
              From the start of 2015, Chrome and Firebox both started to mark all sites using an SSL certificate based on the older SHA1 standard as insecure. So if you have HTTPS enabled but one of these older certificates, you won't get the advantage of a pretty green lock in the browser. In this case we should also link to SSLLabs so they can get scary warnings.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ResultsTable;
