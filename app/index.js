'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var GitHubApi = require('github');
var github = new GitHubApi({
  version: '3.0.0'
});

var githubUserInfo = function (name, cb) {
  github.user.getFrom({
    user: name
  }, function (err, res) {
    if (err) {
      throw err;
    }
    cb(JSON.parse(JSON.stringify(res)));
  });
};

var TamurineGenerator = module.exports = function TamurineGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(TamurineGenerator, yeoman.generators.Base);

TamurineGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  // console.log(this.yeoman);

  var prompts = [{
    name: 'appName',
    message: 'What do you want to call your application',
	default: 'AwesomeWebApplication'
  }, {
    name: 'appDescription',
    message: 'Please give me a description of the application.',
	default: 'My Awesome Web Application!'
  }, {
    name: 'githubUser',
    message: 'Would you mind telling me your username on Github?',
    default: 'someuser'
  }];

  this.prompt(prompts, function (props) {
    this.appName = props.appName;
    this.appDescription = props.appDescription;
    this.githubUser = props.githubUser;

    cb();
  }.bind(this));
};

TamurineGenerator.prototype.userInfo = function userInfo() {
  var done = this.async();

  githubUserInfo(this.githubUser, function (res) {
    /*jshint camelcase:false */
    this.realname = res.name;
    this.email = res.email;
    this.githubUrl = res.html_url;
    done();
  }.bind(this));
};

TamurineGenerator.prototype.configuration = function conf() {
  this.template('configuration/package.json' , 'package.json');
  this.template('configuration/bower.json'   , 'bower.json');
  this.template('configuration/.gitignore'   , '.gitignore');
  this.copy('configuration/.bowerrc'  , '.bowerrc');
  this.copy('configuration/Gemfile'   , 'Gemfile');
};

TamurineGenerator.prototype.assets = function ass() {
  this.copy('application/assets/coffee/application.coffee'    , 'templates/assets/coffee/application.coffee');
  this.copy('application/assets/sass/application.sass'        , 'templates/assets/sass/application.sass');
  this.copy('application/assets/sass/variables/_color.sass'   , 'templates/assets/sass/variables/_color.sass');
  this.copy('application/assets/sass/lib/_zurui.sass'         , 'templates/assets/sass/lib/_zurui.sass');
  this.copy('application/assets/sass/_demo.sass'         , 'templates/assets/sass/_demo.sass');
};

TamurineGenerator.prototype.views = function view() {
  this.template('application/views/index.slim'  , 'templates/views/index.slim');
  this.template('application/views/layout.slim' , 'templates/layout.slim');
};

TamurineGenerator.prototype.application = function app() {
  this.copy('application/app.rb', 'app.rb');
  this.copy('application/Procfile', 'Procfile');
  this.copy('application/Gruntfile.coffee', 'Gruntfile.coffee');
};
