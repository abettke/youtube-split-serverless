import fs from 'fs';
import path from 'path';
import { fetchYoutubeAudio, splitAudioByTracks } from '../src/audioSplit.job';

test('fetchYoutubeAudio', async () => {
	const audioData = await fetchYoutubeAudio('https://www.youtube.com/watch?v=zOWJqNPeifU');
	expect(audioData instanceof Buffer).toBe(true);
});

test('splitAudioToTracks', () => {
	const audioData = fs.readFileSync(path.join(__dirname, '/samples/sampleVideo.mp4'));
	const trackInfo = [
		{
			start: '00:00',
			end: '00:02',
			title: 'track01'
		},
		{
			start: '00:02',
			end: '00:04',
			title: 'track02'
		},
		{
			start: '00:04',
			end: '00:06',
			title: 'track03'
		}
	];
	const tracks = splitAudioByTracks(audioData, trackInfo);
	tracks.map(track => {
		fs.writeFileSync(track.name, Buffer(track.data));
	});
});