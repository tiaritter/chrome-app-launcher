import { IconService } from '../services';

export class AppElementBuilder {

    constructor(app) {
        this.app = app;
    }

    static create(app) {
        return new AppElementBuilder(app);
    }

    withIconSize(iconSize) {
        this.iconSize = iconSize;
        return this;
    }

    build() {
        let app = this.app,
        type = this.iconSize;

        let iconUrl = IconService.getIconUrl(app, type);
        let result = document.createElement('div');
        result.className = 'app';
        result.setAttribute('tabindex', '1');
        result.innerHTML = '<div class="app_content">' +
            `<div class="app_icon-wrap"><img class="app_icon" src="${ iconUrl }"/></div>` +
            `<div class="app_name">${ app.name }</div>` +
            '</div>';
        result.dataset.appId = app.id;
        return result;
    }
}
