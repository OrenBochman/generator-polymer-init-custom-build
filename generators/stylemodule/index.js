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
      'Welcome to the ' + chalk.red('style module') + ' sub-generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'elementName',
      message: 'Would you like your style module to be called?',
      default: 'shared-styles'
    }
  ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    const elementName = this.props.elementName;

    //grab all non _ prefixed fields
    this.fs.copyTpl(
      `${this.templatePath()}/**/!(_)*`,
      this.destinationPath(),
      this.props
    );

    //process _ prefixed files
    this.fs.copyTpl(
      this.templatePath(`src/_element.html`),
      this.destinationPath(`src/${elementName}.html`),
      this.props
    );
  },

  install: function () {
    this.installDependencies();
  }


});
