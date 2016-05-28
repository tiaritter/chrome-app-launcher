import {
        SettingsService,
        DEFAULTS as DEFAULT_SETTINGS,
        SETTINGS } from './common/settings';

const ICON_SIZE_RADIO_SEL = `input[name=${ SETTINGS.IconSize }]`;
const SHOW_APP_NAMES_CHBOX_SEL = `input[name=${ SETTINGS.ShowAppNames }]`;
const LAUNCHER_ICON_COLOR_SEL = `input[name=${ SETTINGS.LauncherIconColor }]`;

const document = window.document;
const service = new SettingsService();

let currentSettings;

service.get()
.then(settings => {

    currentSettings = settings;

    setupOptionsUI(settings);

    let saveOptsButton = document.querySelector('.save');
    saveOptsButton.addEventListener('click', () => {
        saveSettings()
        .catch(console.error)
        .then(() => {
            chrome.runtime.sendMessage({
                type: 'settingsChange',
                settings: currentSettings
            });
        });
    });
});

function saveSettings() {
    let dirty = getDirtySettings();
    currentSettings = Object.assign(currentSettings, dirty);
    return service.set(currentSettings);
}

function setupOptionsUI (settings) {
    setIconSizeRadio(settings);
    setLauncherIconColor(settings);
    setShowAppNamesChbox(settings);
}

function getSettingValue (settings, key) {
    let setting = settings[key];
    if (typeof setting === 'undefined' ||
        setting === null) {
        return DEFAULT_SETTINGS[key];
    }

    return setting;
}

function setIconSizeRadio(settings) {
    let val = getSettingValue(settings, SETTINGS.IconSize);
    let radioSel = `${ ICON_SIZE_RADIO_SEL }[value=${ val }]`;
    let radio = document.querySelector(radioSel);
    radio.checked = true;
}

function setShowAppNamesChbox (settings) {
    let chbox = document.querySelector(SHOW_APP_NAMES_CHBOX_SEL);
    chbox.checked = getSettingValue(settings, SETTINGS.ShowAppNames);
}

function setLauncherIconColor(settings) {
    let color = getSettingValue(settings, SETTINGS.LauncherIconColor);
    document.querySelector(LAUNCHER_ICON_COLOR_SEL).value = color;
}

function getDirtySettings() {
    let settings = {};
    settings.iconSize = document.querySelector(`${ ICON_SIZE_RADIO_SEL }:checked`).value;
    settings.showAppNames = document.querySelector(`${ SHOW_APP_NAMES_CHBOX_SEL }`).checked;
    settings.launcherIconColor = document.querySelector(LAUNCHER_ICON_COLOR_SEL).value;
    return settings;
}
