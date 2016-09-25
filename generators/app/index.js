/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

'use strict';
const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the mind-blowing ' + chalk.red('generator-polymer-init-custom-build') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'elementName',
      message: 'Would you like your element to be called?',
      default: 'my-element'
    },
    {
      type: 'confirm',
      name: 'firebaseInstall',
      message: 'Would you like to enable firebase?',
      default: false
    }
  ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.sourceRoot(path.join(path.dirname(this.resolved), 'polymer-starter-kit'));
    this.fs.copy([
      this.templatePath(),
      '!**/{sw-precache-config.js}'
    ], this.destinationPath());

    this.sourceRoot(path.join(path.dirname(this.resolved)));
    this.fs.copy([
      this.templatePath('gulp-tasks/**/*'),
      this.templatePath('{gulpfile.js,package.json}')
    ], this.destinationPath());

  },
  installingFirebaseCLI: function() {
    const firebaseInstall = this.props.firebaseInstall;
    if(firebaseInstall)
        this.npmInstall(['firebase-tools'], { 'saveDev': true });
  },
  initFirebase: function() {
    const firebaseInstall = this.props.firebaseInstall;
    if(firebaseInstall){

      var client = require('firebase-tools');
      client.list().then(function(data) {
        console.log(data);
      }).catch(function(err) {
        // handle error
      });

      client.init({
        project: 'myfirebase',
        token: process.env.FIREBASE_TOKEN        
      }).then(function() {
        console.log('Rules have been deployed!')
      }).catch(function(err) {
        // handle error
      });

    }
  },
  install: function () {
    this.installDependencies();
  },


});
