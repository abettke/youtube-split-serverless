import fs from 'fs';
import ffmpeg from 'ffmpeg.js/ffmpeg-mp4.js';
import { validateYoutubeURL, fetchYoutubeAudio } from '../src/youtube.service.js';

test('can validate YouTube URLs', () => {
	expect(validateYoutubeURL('bogusurl')).toBe(false);
	expect(validateYoutubeURL('watch?v=ABCDEFGHIJ')).toBe(false);
	expect(validateYoutubeURL('watch?v=ABCDEFGHIJK')).toBe(true);
	expect(validateYoutubeURL('watch?v=kgHqSj8pFgU')).toBe(true);
});

test('can fetch YouTube audio', () => {
	return fetchYoutubeAudio('https://www.youtube.com/watch?v=7CVtTOpgSyY').then(data => {
		const result = ffmpeg({
			MEMFS: [{name: 'test.mp4', data: data }],
			arguments: ['-i', 'test.mp4', '-c:v', 'libvpx', '-an', 'out.mp4']
		});
        
		const out = result.MEMFS[0];
		fs.writeFileSync(out.name, Buffer(out.data));
	});
}, 100000);