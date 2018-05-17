import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import { getPopularTitles, showAlert } from 'actions';
import { getSeries, getMovie } from 'sagas/selectors';
import Loader from 'components/Loader';
import Video from 'components/Video';

export class Videos extends React.Component {
  state = {

  };

  static propTypes = {
    data: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
    initComplete: PropTypes.func,
    max: PropTypes.number,
    popularVideos: PropTypes.object.isRequired,
    programType: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };

  static defaultProps = {
    data: [],
    initComplete: () => {},
    max: 21,
  }

  componentDidMount() {
    const { dispatch, popularVideos, initComplete, title } = this.props;

    if (initComplete) initComplete(title);
    if (popularVideos.entries.status !== 'loaded') dispatch(getPopularTitles());
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, popularVideos } = this.props;
    const { popularVideos: nextPopularVideos } = nextProps;

    if (popularVideos.status === 'running' && nextPopularVideos.status === 'error') {
      dispatch(showAlert(nextPopularVideos.message, { type: 'error' }));
    }
  }

  handleClickVideo = (e) => {
    console.log(`clicked video: ${e}`);
  }

  render() {
    const { popularVideos, title, data, max } = this.props;
    let output;

    if (popularVideos.entries.data && popularVideos.entries.status === 'loaded') {
      output = (
        <ul className="videos app__popular__grid list-unstyled">
          { data
            .slice(0, max).map((obj, index) => (
              <li key={index} className="app__popular__item">
                <Video
                  onClick={this.handleClickVideo}
                  title={obj.title}
                  cover={obj.images['Poster Art'].url}
                />
              </li>
            ))
          }
        </ul>
      );
    }
    else {
      output = <Loader />;
    }

    return (
      <div key="Videos" className="app__videoscontainer">
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
  const { programType, title, initComplete } = props;
  let data = [];

  switch (programType) {
    case 'series':
      data = getSeries(state);
      break;

    case 'movies':
      data = getMovie(state);
      break;

    default:
      data = [];
      break;
  }

  return {
    popularVideos: state.popularVideos,
    programType,
    data,
    title,
    initComplete,
  };
}

export default connect(mapStateToProps)(Videos);
