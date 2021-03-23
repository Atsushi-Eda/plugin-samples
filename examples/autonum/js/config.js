/*
 * Auto Number plug-in
 * Copyright (c) 2016 Cybozu
 *
 * Licensed under the MIT License
 */

(function(PLUGIN_ID, $) {
    'use strict';
    var kintonePluginConfigAutonum = {
        lang: {
            ja: {
                preview: 'プレビュー',
                targetField: '自動採番フィールド選択',
                selectFormat: '採番書式選択',
                typeOfFormat: {
                    numbering: '連番',
                    dateNumbering: '日付 + 連番',
                    dateTextNumbering: '日付 + テキスト + 連番',
                    textNumbering: 'テキスト + 連番',
                    textDateNumbering: 'テキスト + 日付 + 連番'
                },
                dateFormat: '日付書式選択（採番書式に日付が含まれる場合のみ）',
                typeOfDateFormat: {
                    YYYYMMDD: '年月日(YYYYMMDD)',
                    YYYYMM: '年月(YYYYMM)',
                    MMDD: '月日(MMDD)',

                    MMDDYYYY: '月日年[西暦4桁](MMDDYYYY)',
                    MMDDYY: '月日年[西暦2桁](MMDDYY)',
                    MMYYYY: '月年[西暦4桁](MMYYYY)',
                    MMYY: '月年[西暦2桁](MMYY)',

                    YYYY: '年[西暦4桁](YYYY)',
                    YY: '年[西暦2桁](YY)'
                },
                textFormat: 'テキスト入力（採番書式にテキストが含まれる場合のみ）',
                connective: '接続語設定',
                typeOfConnective: {
                    hyphen: { 'value': '-', 'text': 'ハイフン( - )' },
                    underscore: { 'value': '_', 'text': 'アンダースコア( _ )' }
                },
                numberingOfDigits: '採番の桁数',
                resetTiming: '連番リセットタイミング選択',
                typeOfResetTiming: {
                    none: 'なし',
                    yearly: '年毎',
                    monthly: '月毎',
                    daily: '日毎'
                },
                apiToken: 'APIトークン (レコードにアクセス権設定を行う場合)',
                saveButton: '保存',
                cancelButton: 'キャンセル',
                alertMessage: {
                    failedAutoNumbering: '自動採番の番号取得に失敗しました\n',
                    notSelectedNumberingField: '自動採番フィールドが選択されていません',
                    notSelectedFormat: '書式が選択されていません',
                    notSelectedConnectionChar: '接続語が選択されていません',
                    notSelectedDateFormat: '日付形式が選択されていません',
                    notInputTextFormat: 'テキストが入力されていません',
                    invalidNumberingOfDigits: '採番の桁数に正の整数を入力してください',
                    canNotUseConnectionCharForTextFormat: 'テキストに接続語(-, _)を\n入力することはできません',
                    canNotUseHTMLCharactersForTextFormat: 'テキストにHTML特殊文字(&, <, >, \', ")を\n入力することはできません',
                    apiTokenInvalid: 'APIトークンに正しい権限が設定されていません'
                }
            },
            en: {
                preview: 'Preview',
                targetField: 'Field to display Autonumber',
                selectFormat: 'Autonumber format',
                typeOfFormat: {
                    numbering: 'Numbering',
                    dateNumbering: 'Date + Numbering',
                    dateTextNumbering: 'Date + Text + Numbering',
                    textNumbering: 'Text + Numbering',
                    textDateNumbering: 'Text + Date + Numbering'
                },
                dateFormat: 'Date format (if included in Autonumber format)',
                typeOfDateFormat: {
                    YYYYMMDD: 'YYYYMMDD',
                    YYYYMM: 'YYYYMM',
                    MMDD: 'MMDD',

                    MMDDYYYY: 'MMDDYYYY',
                    MMDDYY: 'MMDDYY',
                    MMYYYY: 'MMYYYY',
                    MMYY: 'MMYY',

                    YYYY: 'YYYY',
                    YY: 'YY'
                },
                textFormat: 'Text format (if included in Autonumber format)',
                connective: 'Connector',
                typeOfConnective: {
                    hyphen: { 'value': '-', 'text': 'Hyphen ( - )' },
                    underscore: { 'value': '_', 'text': 'Underscore ( _ )' }
                },
                numberingOfDigits: 'Number of digits for Numbering',
                resetTiming: 'Reset timing for Numbering',
                typeOfResetTiming: {
                    none: 'Never',
                    yearly: 'Yearly',
                    monthly: 'Monthly',
                    daily: 'Daily'
                },
                apiToken: 'API Token (recommended if records have access permissions)',
                saveButton: 'Save',
                cancelButton: 'Cancel',
                alertMessage: {
                    failedAutoNumbering: 'Failed to retrieve number for Autonumbering\n',
                    notSelectedNumberingField: 'Select a Field to display Autonumber',
                    notSelectedFormat: 'Select an Autonumber format',
                    notSelectedConnectionChar: 'Select a Connector',
                    notSelectedDateFormat: 'Select a Date format',
                    notInputTextFormat: 'Input a Text format',
                    invalidNumberingOfDigits: 'Input a positive number for Number of digits',
                    canNotUseConnectionCharForTextFormat: 'Connectors(-, _) cannot be used for Text format',
                    canNotUseHTMLCharactersForTextFormat: '&, <, >, \', " cannot be used for Text format',
                    apiTokenInvalid: 'The API token does not have the correct permission'
                }
            },
            zh: {
                preview: '编号预览',
                targetField: '显示自动编号的字段',
                selectFormat: '自动编号的格式',
                typeOfFormat: {
                  numbering: '编号',
                  dateNumbering: '日期 + 编号',
                  dateTextNumbering: '日期 + 文本 + 编号',
                  textNumbering: '文本 + 编号',
                  textDateNumbering: '文本 + 日期 + 编号'
                },
                dateFormat: '日期格式 (当选择的自动编号格式内包含了日期时可设置此项)',
                typeOfDateFormat: {
                  YYYYMMDD: '年月日(YYYYMMDD)',
                  YYYYMM: '年月(YYYYMM)',
                  MMDD: '月日(MMDD)',
                  MMDDYYYY: '月日年[阳历4位](MMDDYYYY)',
                  MMDDYY: '月日年[阳历2位](MMDDYY)',
                  MMYYYY: '月年[阳历4位](MMYYYY)',
                  MMYY: '月年[阳历2位](MMYY)',
                  YYYY: '年[阳历4位](YYYY)',
                  YY: '年[阳历2位](YY)'
                },
                textFormat: '文本格式 (当选择的自动编号格式内包含了文本时可设置此项)',
                connective: '连接符号',
                typeOfConnective: {
                  hyphen: {'value': '-', 'text': '连字符 ( - )'},
                  underscore: {'value': '_', 'text': '下划线 ( _ )'}
                },
                numberingOfDigits: '自动编号的长度',
                resetTiming: '何时重置编号',
                typeOfResetTiming: {
                  none: '从不',
                  yearly: '每年',
                  monthly: '每月',
                  daily: '每天'
                },
                apiToken: 'API令牌(如需记录的访问权限)',
                saveButton: '保存',
                cancelButton: '取消',
                alertMessage: {
                  failedAutoNumbering: '自动编号获取失败\n',
                  notSelectedNumberingField: '未选择[显示自动编号的字段]',
                  notSelectedFormat: '未选择格式',
                  notSelectedConnectionChar: '未选择连接符号',
                  notSelectedDateFormat: '未选择日期格式',
                  notInputTextFormat: '未输入文本',
                  invalidNumberingOfDigits: '自动编号的长度请输入正整数',
                  canNotUseConnectionCharForTextFormat: '文本不得含有连接符号(-, _)',
                  canNotUseHTMLCharactersForTextFormat: '文本中不可输入HTML的特殊符号(&, <, >, \', ")',
                  apiTokenInvalid: 'API令牌的权限设置不正确'
                }
              }
        },
        settings: {
            lang: 'en',
            i18n: {},
            config: {
                plugin: kintone.plugin.app.getConfig(PLUGIN_ID)
            },
            element: {
                form: '#kintoneplugin-setting',
                formSetting: '.kintoneplugin-setting-form',
                formSubmit: '.form-submit',
                input: {
                    fieldCode: null,
                    prefix: null,
                    timing: null,
                    preview: null,
                    apiToken: null,
                    numberOfDigit: null,
                    textFormatSelect: null,
                    dateFormatSelect: null,
                    connectiveSelect: null
                },
                saveButton: null,
                cancelButton: null,
                targetField: '.target-field',
                numberingOfDigits: '.numbering-of-digits',
                selectFormat: '.select-format',
                dateFormat: '.date-format',
                textFormat: '.text-format',
                connective: '.connective',
                numPreview: '.num-preview',
                resetTiming: '.reset-timing',
                apiToken: '.api-token'
            },
            apiURL: {
                formField: kintone.api.url('/k/v1/preview/app/form/fields', true)
            },
            CONST: {
                BOX_CONFIRM_HEIGHT_PX: 160,
                CLIENT_MIN_HEIGHT_PX: 750
            }
        },
        singleLineTextFields: [],
        init: function() {
            var self = this;
            this.settings.lang = kintone.getLoginUser().language;
            this.settings.i18n = this.settings.lang in this.lang ? this.lang[this.settings.lang] : this.lang['en'];

            if (this.settings.config.plugin.useProxy > 0) {
                var params = {
                    app: kintone.app.getId(),
                    fields: this.settings.config.plugin.autoNumberingFieldcode
                };
                var appUrl = kintone.api.urlForGet('/k/v1/records', params, true);
                this.settings.config.proxy = kintone.plugin.app.getProxyConfig(appUrl, 'GET');
            }
            kintone.api(this.settings.apiURL.formField, 'GET', { 'app': kintone.app.getId() },
                function(respone) {
                    for (var key in respone.properties) {
                        if (!Object.prototype.hasOwnProperty.call(respone.properties, key)) {
                            continue;
                        }

                        var prop = respone.properties[key];
                        if (prop.type === 'SINGLE_LINE_TEXT') {
                            self.singleLineTextFields.push(prop);
                        }
                    }
                    $(self.settings.element.form).removeClass('loading');
                    self.createElements();
                    self.listenAction();
                    self.appendElements();
                    self.checkAutonumFormat();
                    self.uiSetFormSubmitIsFixed();
                    self.listenWindowResize();
                });

        },
        listenWindowResize: function() {
            var timeoutResize;
            $(window).resize(function() {
                clearTimeout(timeoutResize);
                timeoutResize = setTimeout(function() {
                    self.uiSetFormSubmitIsFixed();
                }, 150);
            });
        },
        createElements: function() {
            this.settings.element.saveButton = new Kuc.Button({
                text: this.settings.i18n.saveButton,
                type: 'submit'
            });
            this.settings.element.cancelButton = new Kuc.Button({
                text: this.settings.i18n.cancelButton,
                type: 'normal'
            });
            this.settings.element.input.fieldCode = new Kuc.Dropdown({
                label: this.settings.i18n.targetField,
                requiredIcon: true,
                items: this.addEmptyItem($.map(this.singleLineTextFields, function(singleLineTextField) {
                    return {
                        label: singleLineTextField.label,
                        value: singleLineTextField.code
                    };
                })),
                value: this.settings.config.plugin.autoNumberingFieldcode
            });
            this.settings.element.input.numberOfDigit = new Kuc.Text({
                label: this.settings.i18n.numberingOfDigits,
                requiredIcon: true,
                textAlign: 'right',
                value: this.settings.config.plugin.numOfDigit
            });
            this.settings.element.input.textFormatSelect = new Kuc.Dropdown({
                label: this.settings.i18n.selectFormat,
                requiredIcon: true,
                items: this.addEmptyItem($.map(this.settings.i18n.typeOfFormat, function(typeOfFormatValue, typeOfFormatLabel) {
                    return {
                        label: typeOfFormatValue,
                        value: typeOfFormatLabel
                    };
                })),
                value: this.settings.config.plugin.format
            });
            this.settings.element.input.dateFormatSelect = new Kuc.Dropdown({
                label: this.settings.i18n.dateFormat,
                items: this.addEmptyItem($.map(this.settings.i18n.typeOfDateFormat, function(typeOfDateFormatValue, typeOfDateFormatLabel) {
                    return {
                        label: typeOfDateFormatValue,
                        value: typeOfDateFormatLabel
                    };
                })),
                value: this.settings.config.plugin.dateFormat
            });
            this.settings.element.input.prefix = new Kuc.Text({
                label: this.settings.i18n.textFormat,
                value: this.settings.config.plugin.text
            });
            this.settings.element.input.connectiveSelect = new Kuc.Dropdown({
                label: this.settings.i18n.connective,
                requiredIcon: true,
                items: this.addEmptyItem($.map(this.settings.i18n.typeOfConnective, function(typeOfConnectiveValue) {
                    return {
                        label: typeOfConnectiveValue.text,
                        value: typeOfConnectiveValue.value
                    };
                })),
                value: this.settings.config.plugin.connective
            });
            this.settings.element.input.preview = new Kuc.Text({
                label: this.settings.i18n.numPreview,
                value: this.settings.config.plugin.preview,
                disabled: true
            });
            this.settings.element.input.timing = new Kuc.RadioButton({
                label: this.settings.i18n.resetTiming,
                requiredIcon: true,
                items: $.map(this.settings.i18n.typeOfResetTiming, function(typeOfResetTimingValue, typeOfResetTimingLabel) {
                    return {
                        label: typeOfResetTimingValue,
                        value: typeOfResetTimingLabel
                    };
                }),
                value: this.settings.config.plugin.timing || 'none'
            });
            this.settings.element.input.apiToken = new Kuc.Text({
                label: this.settings.i18n.apiToken,
                value: this.settings.config.proxy ? this.settings.config.proxy.headers['X-Cybozu-API-Token'] : ''
            });
        },
        appendElements: function() {
            document.querySelector(this.settings.element.formSubmit).appendChild(this.settings.element.saveButton);
            document.querySelector(this.settings.element.formSubmit).appendChild(this.settings.element.cancelButton);
            document.querySelector(this.settings.element.targetField).appendChild(this.settings.element.input.fieldCode);
            document.querySelector(this.settings.element.numberingOfDigits).appendChild(this.settings.element.input.numberOfDigit);
            document.querySelector(this.settings.element.selectFormat).appendChild(this.settings.element.input.textFormatSelect);
            document.querySelector(this.settings.element.dateFormat).appendChild(this.settings.element.input.dateFormatSelect);
            document.querySelector(this.settings.element.textFormat).appendChild(this.settings.element.input.prefix);
            document.querySelector(this.settings.element.connective).appendChild(this.settings.element.input.connectiveSelect);
            document.querySelector(this.settings.element.numPreview).appendChild(this.settings.element.input.preview);
            document.querySelector(this.settings.element.resetTiming).appendChild(this.settings.element.input.timing);
            document.querySelector(this.settings.element.apiToken).appendChild(this.settings.element.input.apiToken);
        },
        listenAction: function() {
            var self = this;
            var elements = $([this.settings.element.input.fieldCode,
                this.settings.element.input.prefix,
                this.settings.element.input.numberOfDigit,
                this.settings.element.input.textFormatSelect,
                this.settings.element.input.dateFormatSelect,
                this.settings.element.input.connectiveSelect]);
            elements
                .change(function() {
                    elements.removeAttr('error');
                    var format = self.createPreview($(self.settings.element.input.textFormatSelect).val());
                    $(self.settings.element.input.preview).html(self.escapeHtml(format || ''));
                });
            $(this.settings.element.input.textFormatSelect).change(function() {
                self.checkAutonumFormat();
            });
            $(this.settings.element.input.dateFormatSelect).change(function() {
                self.propRadioTiming();
            });
            $(this.settings.element.saveButton).click(function() {
                self.settingSave();
            });
            $(this.settings.element.cancelButton).click(function() {
                history.back();
            });
        },
        createPreview: function(selectFormat) {
            var text = $(this.settings.element.input.prefix).val();
            if (!this.validateFormValue()) {
                return;
            }
            var numOfDigit = parseInt($(this.settings.element.input.numberOfDigit).val(), 10);
            var number = new Array(numOfDigit).join('0') + '1';
            var dateVal = $(this.settings.element.input.dateFormatSelect).val();
            var connective = $(this.settings.element.input.connectiveSelect).val() || '';
            var date = dateVal !== '' ? moment().format(dateVal) : '';

            switch (selectFormat) {
                case 'numbering':
                    return (number);

                case 'dateNumbering':
                    return (date + connective + number);

                case 'dateTextNumbering':
                    return (date + connective + text + connective + number);

                case 'textNumbering':
                    return (text + connective + number);

                case 'textDateNumbering':
                    return (text + connective + date + connective + number);

                default:
                    return '';
            }
        },
        settingSave: function() {
            var config = this.validateFormValue();
            if (config === false) {
                return;
            }
            if (parseInt(config['useProxy'], 10) > 0) {
                this.settingSaveProxy(function() {
                    kintone.plugin.app.setConfig(config);
                });
                return;
            }
            kintone.plugin.app.setConfig(config);
        },
        settingSaveProxy: function(callback) {
            var apiToken = $(this.settings.element.input.apiToken).val();
            var numberingFieldcode = $(this.settings.element.input.fieldCode).val();

            var params = {
                app: kintone.app.getId(),
                fields: numberingFieldcode
            };
            var headerProxy = {
                'X-Cybozu-API-Token': apiToken
            };
            var appUrl = kintone.api.urlForGet('/k/v1/records', params, true);
            var method = 'GET';
            this.validateProxy(appUrl, method, headerProxy, {}, function() {
                kintone.plugin.app.setProxyConfig(appUrl, method, headerProxy, {}, callback);
            });

        },
        validateProxy: function(url, method, header, data, callback) {
            var self = this;
            kintone.proxy(url, method, header, data, function(respdata) {
                var responeDataJson = JSON.parse(respdata);
                if (responeDataJson.records) {
                    callback();
                } else {
                    self.alert(self.settings.element.input.apiToken,
                        self.settings.i18n.alertMessage.apiTokenInvalid);
                    return;
                }

            }, function() {
                self.alert(self.settings.i18n.alertMessage.apiTokenInvalid);
            });
        },
        validateFormValue: function() {

            this.checkAutonumFormat();
            this.propRadioTiming();
            var config = {};
            var autoNumberingFieldcode = $(this.settings.element.input.fieldCode).val();
            var format = this.formatType($(this.settings.element.input.textFormatSelect).val());
            var preview = $(this.settings.element.input.preview).val();
            var prefix = $(this.settings.element.input.prefix).val();
            var dateformat = $(this.settings.element.input.dateFormatSelect).val();

            var timing = $(this.settings.element.input.timing).val();

            var connective = $(this.settings.element.input.connectiveSelect).val();
            var numOfDigit = $(this.settings.element.input.numberOfDigit).val();
            var validateResult = true;
            $('.kintoneplugin-alert').remove();

            if (autoNumberingFieldcode === '') {
                this.alert(this.settings.element.input.fieldCode,
                    this.settings.i18n.alertMessage.notSelectedNumberingField);
                validateResult = false;
            }
            if (!this.isNumberPositive(numOfDigit)) {
                this.alert(this.settings.element.input.numberOfDigit,
                    this.settings.i18n.alertMessage.invalidNumberingOfDigits);
                validateResult = false;
            } else {
                numOfDigit = parseInt(numOfDigit, 10);
                $(this.settings.element.input.numberOfDigit).val(numOfDigit);
            }
            // 採番書籍選択未選択チェック
            if (format[0] === 'null') {
                this.alert(this.settings.element.input.textFormatSelect,
                    this.settings.i18n.alertMessage.notSelectedFormat);
                validateResult = false;
            }
            // 「書式」と「日付形式」未選択チェック
            if ((format[0] === 'date' || format[1] === 'date') && dateformat === '') {
                this.alert(this.settings.element.input.dateFormatSelect,
                    this.settings.i18n.alertMessage.notSelectedDateFormat);
                validateResult = false;
            }
            // 「書式」と「テキスト設定」未入力チェック
            if ((format[0] === 'text' || format[1] === 'text') && prefix === '') {
                this.alert(this.settings.element.input.prefix, this.settings.i18n.alertMessage.notInputTextFormat);
                validateResult = false;
            }
            if (prefix.match(/&|<|>|'|'/g) !== null) {
                this.alert(this.settings.element.input.prefix,
                    this.settings.i18n.alertMessage.canNotUseHTMLCharactersForTextFormat);
                validateResult = false;
            }
            if (prefix.match(/-|_/g) !== null) {
                this.alert(this.settings.element.input.prefix,
                    this.settings.i18n.alertMessage.canNotUseConnectionCharForTextFormat);
                validateResult = false;
            }

            if (connective === '') {
                this.alert(this.settings.element.input.connectiveSelect,
                    this.settings.i18n.alertMessage.notSelectedConnectionChar);
                validateResult = false;
            }

            if (!validateResult) {
                return false;
            }

            // 設定文書の値を返す
            config['autoNumberingFieldcode'] = autoNumberingFieldcode;
            config['format'] = $(this.settings.element.input.textFormatSelect).val();
            config['format1'] = format[0]; // date
            config['format2'] = format[1]; // number
            config['format3'] = format[2]; // textの何れかが入る。
            config['dateFormat'] = dateformat;
            config['text'] = prefix;
            config['preview'] = preview;
            config['timing'] = timing;
            config['connective'] = connective;
            config['useProxy'] = $(this.settings.element.input.apiToken).val() !== '' ? '1' : '0';
            config['numOfDigit'] = numOfDigit.toString();
            return config;
        },
        alert: function(element, mess) {
            $(element).attr('error', mess);
        },
        formatType: function(selectformat) {

            switch (selectformat) {
                case 'numbering':
                    return ['number', '', ''];

                case 'dateNumbering':
                    return ['date', 'number', ''];

                case 'dateTextNumbering':
                    return ['date', 'text', 'number'];

                case 'textNumbering':
                    return ['text', 'number', ''];

                case 'textDateNumbering':
                    return ['text', 'date', 'number'];

                default:
                    return ['null', '', ''];
            }
        },
        checkAutonumFormat: function() {
            this.propRadioTiming();
            var autonumFormat = $(this.settings.element.input.textFormatSelect).val();
            switch (autonumFormat) {

                case 'numbering':
                    $(this.settings.element.input.dateFormatSelect).val('');
                    $(this.settings.element.input.prefix).val('');
                    this.propElement(this.settings.element.input.dateFormatSelect, true);
                    this.propElement(this.settings.element.input.prefix, true);
                    break;

                case 'dateNumbering':
                    $(this.settings.element.input.prefix).val('');
                    this.propElement(this.settings.element.input.dateFormatSelect, false);
                    this.propElement(this.settings.element.input.prefix, true);
                    break;

                case 'dateTextNumbering':
                    this.propElement(this.settings.element.input.dateFormatSelect, false);
                    this.propElement(this.settings.element.input.prefix, false);
                    break;

                case 'textNumbering':
                    $(this.settings.element.input.dateFormatSelect).val('');
                    this.propElement(this.settings.element.input.dateFormatSelect, true);
                    this.propElement(this.settings.element.input.prefix, false);
                    break;

                case 'textDateNumbering':
                    this.propElement(this.settings.element.input.dateFormatSelect, false);
                    this.propElement(this.settings.element.input.prefix, false);
                    break;

                default:
                    $(this.settings.element.input.dateFormatSelect).val('');
                    $(this.settings.element.input.prefix).val('');
                    this.propElement(this.settings.element.input.dateFormatSelect, true);
                    this.propElement(this.settings.element.input.prefix, true);
            }
        },
        propRadioTiming: function() {
            var dateformat = $(this.settings.element.input.dateFormatSelect).val();
            var timing = $(this.settings.element.input.timing).val();
            switch (dateformat) {
                case 'MMDDYYYY':
                case 'MMDDYY':
                case 'YYYYMMDD':
                    // TODO: itemごとのdisableが指定できるようになったら，対応する．
                    // this.propElement('#autonum-resetTiming-yearly', false);
                    // this.propElement('#autonum-resetTiming-monthly', false);
                    // this.propElement('#autonum-resetTiming-daily', false);
                    break;
                case 'MMYYYY':
                case 'MMYY':
                case 'YYYYMM':
                    // this.propElement('#autonum-resetTiming-yearly', false);
                    // this.propElement('#autonum-resetTiming-monthly', false);
                    // this.propElement('#autonum-resetTiming-daily', true);
                    if (timing === 'daily') {
                        $(this.settings.element.input.timing).val('none')
                    }
                    break;

                case 'MMDD':
                    // this.propElement('#autonum-resetTiming-yearly', true);
                    if (timing === 'yearly') {
                        $(this.settings.element.input.timing).val('none')
                    }

                    // this.propElement('#autonum-resetTiming-monthly', false);
                    // this.propElement('#autonum-resetTiming-daily', false);
                    break;

                case 'YYYY':
                case 'YY':
                    // this.propElement('#autonum-resetTiming-yearly', false);
                    //
                    // this.propElement('#autonum-resetTiming-monthly', true);
                    // this.propElement('#autonum-resetTiming-daily', true);
                    if (timing !== 'yearly') {
                        $(this.settings.element.input.timing).val('none')
                    }
                    break;
                default:
                    // this.propElement('#autonum-resetTiming-yearly', true);
                    // this.propElement('#autonum-resetTiming-monthly', true);
                    // this.propElement('#autonum-resetTiming-daily', true);
                    $(this.settings.element.input.timing).val('none')
                    break;
            }
        },
        propElement: function(element, isDisabled) {
            $(element).prop('disabled', isDisabled);
        },
        uiSetFormSubmitIsFixed: function() {
            if ($(window).height() < this.settings.CONST.CLIENT_MIN_HEIGHT_PX) {
                $(this.settings.element.form + ' .submit-bottom').show();
                $(this.settings.element.formSetting).css('max-height', 'none');
                return;
            }
            $(this.settings.element.form + ' .submit-bottom').hide();

            var parentHeight = $(this.settings.element.form).parents('td').offset().top;
            parentHeight += this.settings.CONST.BOX_CONFIRM_HEIGHT_PX;
            $(this.settings.element.formSetting).css('max-height', $(window).height() - parentHeight);
        },
        escapeHtml: function(htmlstr) {
            return htmlstr.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                .replace(/'/g, '&quot;').replace(/'/g, '&#39;');
        },
        isNumberPositive: function(number) {
            var regex = /^(?:[1-9]\d*|\d)$/;
            return regex.test(number.toString());
        },
        addEmptyItem: function(items) {
            return $.merge([{
                label: '-----',
                value: ''
            }], items);
        }
    };
    kintonePluginConfigAutonum.init();
})(kintone.$PLUGIN_ID, jQuery);
