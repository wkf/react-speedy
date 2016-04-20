import Popover from 'react-popover';
import Tappable from 'react-tappable';
import {connect} from 'react-redux';
import {togglePopover} from '../actions/popover';

const mapStateToProps = ({popover}) => ({
  visiblePopoverId: popover.visibleId
});

const mapDispatchToProps = (dispatch) => ({
  togglePopover: (id) => dispatch(togglePopover(id))
});

export default connect(mapStateToProps, mapDispatchToProps)((props) =>
  <Popover
      place="right"
      body={props.text}
      isOpen={props.visiblePopoverId === props.id}
      onOuterAction={props.togglePopover.bind(null, props.id)}
  >
    <Tappable className="toggle" onTap={props.togglePopover.bind(null, props.id)}>
      {props.children}
    </Tappable>
  </Popover>
);
