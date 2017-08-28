import Api from 'framework/api/api';

export default class SettingsServiceStub {
    get() {
        return new Api().get('/custom/data/settings.json', null, (response) => {
            return response.body;
        });
    }
}