import ytdl from 'ytdl-core';

const validateYoutubeURL = url => ytdl.validateURL(url);

const fetchYoutubeAudio = url => {
	const audioStream = ytdl(url, { filter: (format) => format.container === 'mp4' });
	let audioData;

	return new Promise((res, rej) => {
		audioStream
			.on('data', data => audioData += data)
			.on('end', () => res(audioData))
			.on('error', err => rej(err));
	});
	
};

export {
	validateYoutubeURL,
	fetchYoutubeAudio
};