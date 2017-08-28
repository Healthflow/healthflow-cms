import jsdom from 'jsdom';

const mockDocument = jsdom.jsdom('<!DOCTYPE html><html><body></body></html>');
const mockWindow = mockDocument.defaultView;

global.document = mockDocument;
global.window = mockWindow;

Object.keys(window).forEach((key) => {
	if(!(key in global)) {
		global[key] = window[key];
	}
});