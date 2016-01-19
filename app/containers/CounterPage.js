import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import * as CounterActions from '../actions/counter';

export default connect(
  ({counter}) => ({counter}),
  {...CounterActions}
)(Counter);
