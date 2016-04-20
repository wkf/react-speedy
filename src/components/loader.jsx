import Loader from 'react-loader';

const LOADER_OPTIONS = {
  width: 2,
  length: 5,
  radius: 7
};

export default (props) => (
  <Loader parentClassName="spinner" loaded={props.loaded} options={LOADER_OPTIONS}>
    {props.children}
  </Loader>
);
