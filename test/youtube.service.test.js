import fs from 'fs';
import ffmpeg from 'ffmpeg.js/ffmpeg-mp4.js';
import { validateYoutubeURL } from '../src/youtube.service.js';

test('can validate YouTube URLs', () => {
	expect(validateYoutubeURL('bogusurl')).toBe(false);
	expect(validateYoutubeURL('watch?v=ABCDEFGHIJ')).toBe(false);
	expect(validateYoutubeURL('watch?v=ABCDEFGHIJK')).toBe(true);
	expect(validateYoutubeURL('watch?v=kgHqSj8pFgU')).toBe(true);
});