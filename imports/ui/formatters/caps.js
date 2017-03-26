import { Template } from 'meteor/templating';

Template.registerHelper('caps', query => query.toUpperCase());
