import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import shuffle from 'shuffle-array';

class MusicPlayer extends Component {
    state = {
        // active: this.props.songs[0] || null,
        // current: 0,
        progress: 0,
        random: false,
        repeat: true,
        mute: false,
        play: null, // true, false, null
        // songs: this.props.songs || [],
        collapsed: true
    }

    audio = null

    toggleCollapse = () => {
      this.setState({collapsed: !this.state.collapsed})
    }

    componentWillReceiveProps = (nextProps) => {
      if(this.props.active && nextProps.active) {
        this.stop()
        this.unbindListeners(this.audio)
        this.audio.src = ''
        this.audio.load()
        this.audio.remove()
        this.audio = null
      }
      if(nextProps.active) {
        this.audio = new Audio(nextProps.active.url)
        this.bindListeners(this.audio)
      }
    }

    bindListeners = (audio) => {
      audio.addEventListener('loadstart', this.pause);
      audio.addEventListener('loadeddata', this.play);
      audio.addEventListener('timeupdate', this.updateProgress);
      audio.addEventListener('ended', this.end);
      audio.addEventListener('error', this.next);
    }

    unbindListeners = (audio) => {
      audio.removeEventListener('loadstart', this.pause);
      audio.removeEventListener('loadeddata', this.play);
      audio.removeEventListener('timeupdate', this.updateProgress);
      audio.removeEventListener('ended', this.end);
      audio.removeEventListener('error', this.next);
    }

    componentDidMount = () => {
    }

    componentWillUnmount = () => {
    }

    setProgress = (e) => {
        let target = e.target.nodeName === 'SPAN' ? e.target.parentNode : e.target;
        let width = target.clientWidth;
        let rect = target.getBoundingClientRect();
        let offsetX = e.clientX - rect.left;
        let duration = this.audio.duration;
        let currentTime = (duration * offsetX) / width;
        let progress = (currentTime * 100) / duration;

        this.audio.currentTime = currentTime;
        this.setState({ progress: progress });
        this.play();
    }

    updateProgress = () => {
        let duration = this.audio.duration;
        let currentTime = this.audio.currentTime;
        let progress = (currentTime * 100) / duration;
        this.setState({ progress: progress });
    }

    play = () => {
        this.setState({ play: true });
        this.audio.play();
    }

    pause = () => {
        this.setState({ play: false });
        this.audio.pause();
    }

    stop = () => {
      this.setState({ play: null });
      this.audio.pause();
    }

    toggle = () => {
        this.state.play ? this.pause() : this.play();
    }

    end = () => {
        (this.state.repeat) ? this.next() : this.setState({ play: false });
    }

    next = () => {
      this.stop()
      this.props.playNext()

        // var total = this.props.songs.length;
        // if(total == 0) return;
        //
        // var current = (this.state.repeat) ? this.state.current : (this.state.current < total - 1) ? this.state.current + 1 : 0;
        // var active = this.props.songs[current];
        //
        // this.setState({ current: current, active: active, progress: 0 });
        //
        // this.audio.src = active.url;
        // this.play();
    }

    previous = () => {
      this.props.playPrevious()
      this.setState({ progress: 0 });
      this.play();
        // var total = this.props.songs.length;
        // var current = (this.state.current > 0) ? this.state.current - 1 : total - 1;
        // var active = this.props.songs[current];
        //
        // this.setState({ current: current, active: active, progress: 0 });
        //
        // this.audio.src = active.url;
        // this.play();
    }

    randomize = () => {
        var s = shuffle(this.props.songs.slice());

        this.setState({ songs: (!this.state.random) ? s : this.props.songs, random: !this.state.random });
    }

    repeat = () => {
        this.setState({ repeat: !this.state.repeat });
    }

    toggleMute = () => {
        let mute = this.state.mute;

        this.setState({ mute: !this.state.mute });
        this.audio.volume = (mute) ? 1 : 0;
    }

    render () {

        const { play, progress } = this.state;

        const { active } = this.props;

        let containerClass = classnames('player-container', {'collapsed': this.state.collapsed})
        let playPauseClass = classnames({'pause': play}, {'play_arrow': !play});
        let volumeClass = classnames('fa', {'fa-volume-up': !this.state.mute}, {'fa-volume-off': this.state.mute});
        let repeatClass = classnames('player-btn small repeat', {'active': this.state.repeat});
        let randomClass = classnames('player-btn small random', {'active': this.state.random });

        // <audio src={active ? active.url : null} ref="player"></audio>

        return (
            <div className={containerClass}>
                <div className="collapse-btn" onClick={this.toggleCollapse}>
                  <i className="material-icons">keyboard_arrow_down</i>
                </div>



                <div className="song-info" onClick={() => { if(this.state.collapsed) this.toggleCollapse() }}>
                  <div className="album-cover">
                    <img src={active ? active.cover : ''} />
                  </div>
                  <div className="artist-info">
                    <h3 className="artist-song-name">{active ? active.title : ''}</h3>
                    <h2 className="artist-name">{active ? active.artist : ''}</h2>
                  </div>
                </div>

                <div className="player-progress-container" onClick={this.setProgress}>
                    <span className="player-progress-value" style={{width: play === null ? 0 : progress + '%'}}></span>
                </div>


                <div className="player-options">
                    <div className="player-buttons player-controls">
                      <button className={repeatClass} onClick={this.repeat} title="Repeat">
                          <i className="material-icons">repeat</i>
                      </button>

                      <button onClick={this.previous} className="player-btn medium" title="Previous Song">
                        <i className="material-icons">skip_previous</i>
                      </button>

                      <button onClick={this.toggle} className="player-btn play big" title="Play/Pause">
                          <i className="material-icons">{playPauseClass}</i>
                      </button>

                      <button onClick={this.next} className="player-btn next medium" title="Next Song">
                          <i className="material-icons">skip_next</i>
                      </button>

                      <button className={randomClass} onClick={this.randomize} title="Shuffle">
                          <i className="material-icons">shuffle</i>
                      </button>
                    </div>
                </div>
            </div>
        );
    }
}

MusicPlayer.propTypes = {
    autoplay: PropTypes.bool,
    // songs: PropTypes.array.isRequired
};

export default MusicPlayer;
