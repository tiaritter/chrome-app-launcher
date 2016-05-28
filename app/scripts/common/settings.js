const SETTINGS_KEY = 'settings';

export const SETTINGS = {
    IconSize: 'iconSize',
    ShowAppNames: 'showAppNames',
    LauncherIconColor: 'launcherIconColor',
    SearchBar: 'searchBar'
};

const chromeStorage = chrome.storage.local;

export const DEFAULTS = {
  [SETTINGS.IconSize]: 'large',
  [SETTINGS.ShowAppNames]: true,
  [SETTINGS.LauncherIconColor]: '#000000'
};

export class SettingsService {

  get () {
    return new Promise((resolve) =>
        chromeStorage.get(SETTINGS_KEY, (response) => resolve(response)))
    .then(response => response[SETTINGS_KEY] || DEFAULTS);
  }

  set (settings) {
    let storageObject = {};
    storageObject[SETTINGS_KEY] = settings;
    return new Promise((resolve) => chromeStorage.set(storageObject, () => resolve(true)));
  }
}
