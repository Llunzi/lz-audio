import React from "react";
import Slider from "rc-slider"
import 'rc-slider/assets/index.css';

class LZ_Audio extends React.Component {
	
	constructor(props)
	{
		super(props);
		
		this.state = {
			currentTime: 0,
			sliderValue: 0,
			isPlaying: false
		};
		
		this.onPlay = this.onPlay.bind(this);
		this.onPause = this.onPause.bind(this);
		this.onPause1 = () => this.setState({isPlaying: false})
	}
	
	componentWillUnmount()
	{
		let index = fns.findIndex(value => value === this.onPause);
		
		if(index > -1)
		{
			fns.splice(index, 1);
		}
	}
	
	onPlay()
	{
		this.setInterval();
		
		let {currentTime} = this.state,
			{src} = this.props;
		
		if(src)
		{
			audio.src = src;
			audio.currentTime = currentTime;
			audio.volume = .1;
			audio.play();
			
			this.setState({isPlaying:true});
			
			pauseOpration(this.onPause1);
			
			let index = fns.findIndex(value => value === this.onPause);
			index <= -1 && fns.push(this.onPause1);
		}
	}
	
	setInterval()
	{
		clearInterval(intervalID);
		intervalID = setInterval(() => {
			this.setState({
				currentTime: audio.currentTime,
				duration: audio.duration
			});
		}, 1000);
	}
	
	onPause()
	{
		audio.pause();
		clearInterval(intervalID);
		this.setState({isPlaying: false});
	}
	
	onChange(value)
	{
		audio.currentTime = value;
		audio.play()
		
		this.state.sliderValue = 0;
	}
	
	getTimeStr(time)
	{
		//分钟
		var minute = time / 60;
		var minutes = parseInt(minute);
		if(minutes < 10)
		{
			minutes = "0" + minutes;
		}
		//秒
		var second = time % 60;
		var seconds = parseInt(second);
		if(seconds < 10)
		{
			seconds = "0" + seconds;
		}
		
		return "" + minutes + "" + ":" + "" + seconds + ""
	}
	
	onBeforeChange()
	{
		this.setState({sliderValue: this.state.currentTime});
	}
	
	render()
	{
		let {duration, currentTime, sliderValue, isPlaying} = this.state,
			valueProps = !sliderValue ? {value: currentTime} : {},
			{sliderStyle} = this.props;
		
		sliderStyle = sliderStyle || {};
		
		return (
			<div>
				{
					!isPlaying ? <input className="lz-play-btn" type="button" value="播放" onClick={this.onPlay}/> : null
				}
				{
					isPlaying ? <input className="lz-pause-btn" type="button" value="暂停" onClick={this.onPause}/> : null
				}
				<Slider ref={node => this.slider = node}
				        min={0} max={duration || 1} {...valueProps}
				        {...sliderStyle}
				        onBeforeChange={this.onBeforeChange.bind(this)}
				        onAfterChange={this.onChange.bind(this)}/>
				
				<i className="lz-current-time">{this.getTimeStr(currentTime || 0)}</i>
				<i className="lz-pause-btn">{"/"}</i>
				<i className="lz-duration">{this.getTimeStr(duration || 0)}</i>
			</div>
		);
	}
}

export default LZ_Audio;

export var audio = new Audio();

let fns = [];

function pauseOpration(fn)
{
	
	fns.forEach(value => {
		if(value !== fn && typeof value === "function")
		{
			value()
		}
	});
}

let intervalID = -1;


