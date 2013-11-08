require.config
  paths:
    jquery: '/vendor/bower/jquery/jquery'
    underscore: '/vendor/bower/underscore-amd/underscore'
    backbone: '/vendor/bower/backbone-amd/backbone'
require ['jquery','backbone','underscore'], ($,b,_) ->
  $ ->
    console.log $
    console.log b
    console.log _
