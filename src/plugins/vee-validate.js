import VeeValidate from 'vee-validate';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
// @ts-ignore
import validationMessages from 'vee-validate/dist/locale/pt_BR';

Vue.use(VueI18n);

const i18n = new VueI18n();
i18n.locale = "en"; // set a default locale (without it, it won't work)

Vue.use(VeeValidate, {
   i18nRootKey: 'validations', // customize the root path for validation messages.
   i18n,
   dictionary: {
    en: validationMessages
   }
});
