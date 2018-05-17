import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import { getPopularTitles, showAlert } from 'actions';
import Loader from 'components/Loader';
import ProgramType from 'components/ProgramType';

export class PopularTitles extends React.Component {
  state = {

  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    initComplete: PropTypes.func,
    popularVideos: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { dispatch, popularVideos, initComplete, title } = this.props;

    if (initComplete) initComplete(title);

    if (popularVideos.entries.status !== 'loaded') {
      dispatch(getPopularTitles());
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, popularVideos } = this.props;
    const { popularVideos: nextPopularVideos } = nextProps;

    if (popularVideos.status === 'running' && nextPopularVideos.status === 'error') {
      dispatch(showAlert(nextPopularVideos.message, { type: 'error' }));
    }
  }

  render() {
    const { popularVideos, title } = this.props;
    let output;

    if (popularVideos.entries.data && popularVideos.entries.status === 'loaded') {
      output = (
        <div className="app__popular__selector">
          <div className="btn-group" role="group" aria-label="Video Type">
            <ul className="app__popular__grid list-unstyled">
              <li className="app__popular__item">
                <ProgramType title="Popular Series" label="SERIES" to="/popular/series" />
              </li>
              <li className="app__popular__item">
                <ProgramType title="Popular Movies" label="MOVIES" to="/popular/movies" />
              </li>
            </ul>
          </div>
        </div>
      );
    }
    else {
      output = <Loader />;
    }

    return (
      <div key="PopularTitles" className="app__popular">
        <Helmet
          title={title}
        />
        {output}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state, props) {
  const { initComplete, title } = props;
  return {
    initComplete,
    title,
    popularVideos: state.popularVideos,
  };
}

export default connect(mapStateToProps)(PopularTitles);
