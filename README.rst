About
=====

Reusable initial state for an HTML5 game project based on phaserJS
and including helpful boilerplate code for common components like
controls, tiledmap and event handling.


Contents
=====

Basics:
^^^^^^^
- phaser template setup via generator-phaser-official
    https://github.com/codevinsky/generator-phaser-official

- replace template content + assets

Exmaples + Boilerplate:
^^^^^^^^^^^^^^^^^^^^^^^
- add example + boilerplate for sprites, animations, sound
- add example + helpers for tiled map loading
- sprite grouping, layering, physics + collision detection example code
- resize / fullscreen

Fonts + Image generation
^^^^^^^^^^^^^^^^^^^^^^^^
- add a bitmap font
- image tasks ( e.g. button generator, imagemagick spritemaps )
- bitmap write example (create sprite)
- widget controls (bar-meter), menu system

Controls
^^^^^^^^
- keyboard controller boilerplate
- controller helper + boilerplate
- controller abstraction, optionally event/FRP based
- boilerplate or library for menu / mousebuttons interaction


Configuration
^^^^^^^^^^^^^
- options screen
- behavior live-setup (change parameters during game runtime)


Reactive
^^^^^^^^
- add bacon.js
- bacon.js integration / UI


Multiplayer
^^^^^^^^^^^
 - node / socket.io master server
 - boilerplate , communications example


Misc
^^^^
- Coffe script (grunt tasks, project layout, ..)
- Presspackage (Presskit, readme generator, presentation generator)
- AI library + boilerplate



Build
=====

Yoman
-------

The project was created with the 'generator-phaser-official' yeoman generator
(see https://github.com/codevinsky/generator-phaser-official) .

::
    npm install -g generator-phaser-official
    yo phaser-official

Two subgenerators exist:

::

    yo phaser-official:state "stateName"
    yo phaser-official:prefab "prefabName"



Resources / Credits
===================

Credits:
jamjump(tm) team

bitmap fonts:
http://www.dafont.com/bitmap.php


