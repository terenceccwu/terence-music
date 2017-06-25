import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import shuffle from 'shuffle-array';

class MusicPlayer extends Component {
    state = {
        active: this.props.songs[0] || null,
        current: 0,
        progress: 0,
        random: false,
        repeat: false,
        mute: false,
        play: this.props.autoplay || false,
        songs: this.props.songs || [],
        collapsed: true
    }

    toggleCollapse = () => {
      this.setState({collapsed: !this.state.collapsed})
    }

    componentDidMount = () => {
        let playerElement = this.refs.player;
        playerElement.addEventListener('timeupdate', this.updateProgress);
        playerElement.addEventListener('ended', this.end);
        playerElement.addEventListener('error', this.next);
    }

    componentWillUnmount = () => {
        let playerElement = this.refs.player;
        playerElement.removeEventListener('timeupdate', this.updateProgress);
        playerElement.removeEventListener('ended', this.end);
        playerElement.removeEventListener('error', this.next);
    }

    setProgress = (e) => {
        let target = e.target.nodeName === 'SPAN' ? e.target.parentNode : e.target;
        let width = target.clientWidth;
        let rect = target.getBoundingClientRect();
        let offsetX = e.clientX - rect.left;
        let duration = this.refs.player.duration;
        let currentTime = (duration * offsetX) / width;
        let progress = (currentTime * 100) / duration;

        this.refs.player.currentTime = currentTime;
        this.setState({ progress: progress });
        this.play();
    }

    updateProgress = () => {
        let duration = this.refs.player.duration;
        let currentTime = this.refs.player.currentTime;
        let progress = (currentTime * 100) / duration;

        this.setState({ progress: progress });
    }

    play = () => {
        this.setState({ play: true });
        this.refs.player.play();
    }

    pause = () => {
        this.setState({ play: false });
        this.refs.player.pause();
    }

    toggle = () => {
        this.state.play ? this.pause() : this.play();
    }

    end = () => {
        (this.state.repeat) ? this.play() : this.setState({ play: false });
    }

    next = () => {
        var total = this.state.songs.length;
        if(total == 0) return;

        var current = (this.state.repeat) ? this.state.current : (this.state.current < total - 1) ? this.state.current + 1 : 0;
        var active = this.state.songs[current];

        this.setState({ current: current, active: active, progress: 0 });

        this.refs.player.src = active.url;
        this.play();
    }

    previous = () => {
        var total = this.state.songs.length;
        var current = (this.state.current > 0) ? this.state.current - 1 : total - 1;
        var active = this.state.songs[current];

        this.setState({ current: current, active: active, progress: 0 });

        this.refs.player.src = active.url;
        this.play();
    }

    randomize = () => {
        var s = shuffle(this.state.songs.slice());

        this.setState({ songs: (!this.state.random) ? s : this.state.songs, random: !this.state.random });
    }

    repeat = () => {
        this.setState({ repeat: !this.state.repeat });
    }

    toggleMute = () => {
        let mute = this.state.mute;

        this.setState({ mute: !this.state.mute });
        this.refs.player.volume = (mute) ? 1 : 0;
    }

    render () {

        const { active, play, progress } = this.state;

        let containerClass = classnames('player-container', {'collapsed': this.state.collapsed})
        let playPauseClass = classnames({'pause': play}, {'play_arrow': !play});
        let volumeClass = classnames('fa', {'fa-volume-up': !this.state.mute}, {'fa-volume-off': this.state.mute});
        let repeatClass = classnames('player-btn small repeat', {'active': this.state.repeat});
        let randomClass = classnames('player-btn small random', {'active': this.state.random });

        return (
            <div className={containerClass}>
                <div className="collapse-btn" onClick={this.toggleCollapse}>
                  <i className="material-icons">keyboard_arrow_down</i>
                </div>

                <audio src={active ? active.url : ''} preload="auto" ref="player"></audio>

                <div className="song-info" onClick={() => { if(this.state.collapsed) this.toggleCollapse() }}>
                  <div className="album-cover">
                    <img src={active ? active.cover : ''} />
                  </div>
                  <div className="artist-info">
                    <h3 className="artist-song-name">{active ? active.artist.song : ''}</h3>
                    <h2 className="artist-name">{active ? active.artist.name : ''}</h2>
                  </div>
                </div>

                <div className="player-progress-container" onClick={this.setProgress}>
                    <span className="player-progress-value" style={{width: progress + '%'}}></span>
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
    songs: PropTypes.array.isRequired
};

export default MusicPlayer;
