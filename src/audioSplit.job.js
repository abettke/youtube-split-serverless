import ytdl from 'ytdl-core';
import ffmpeg from 'ffmpeg.js/ffmpeg-mp4.js';

const exec = async url => {
	const audioData = await fetchYoutubeAudio(url);
	const tracks = await splitAudioByTracks(audioData);
	const stored = await saveTracksToStorage(tracks);
};

const fetchYoutubeAudio = url => {
	const audioStream = ytdl(url, {quality: 'highestaudio'});
	const audioData = [];

	return new Promise((res, rej) => {
		audioStream
			.on('data', data => audioData.push(data))
			.on('error', err => rej(err))
			.on('end', () => res(Buffer.concat(audioData)));
	});
	
};

const splitAudioByTracks = (data, tracksInfo) => {
	return tracksInfo.map(track => {
		const audio = ffmpeg({
			MEMFS: [{name: 'source.mp4', data}],
			arguments: ['-loglevel', 'quiet', '-i', 'source.mp4', '-ss', `${track.start}`, '-to', `${track.end}`, '-f', 'mp4', `${track.title}.mp4`]
		});

		return audio.MEMFS[0];
	});
};

module.exports = { 
	exec, 
	fetchYoutubeAudio,
	splitAudioByTracks
};