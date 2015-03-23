# Mod Help Player Guide

1. Make the player guide accessible accessible from the game lobby (`new_game`)
2. Add tabs to the player guide with mod articles.  Default articles are provided with the official modinfo fields, or mods can specify custom articles.

There are both client and server mods.  The lobby functionality is only provided to other players (or when using only the server mod yourself) after a UI refresh, which must occur after mod loading is complete. Sometimes players get lucky and mods load before the lobby is drawn, so no refresh will be required.

The official player guide is currently under development, so this mod may be volitile for a while.

The repo is the client mod.  A grunt task creates the server mod in `../../server_mods/`

## Custom Articles

The mod attempts to load an `<identifier>/mod_help.json` for each active mod.  The file should contain a key named `articles`, which is an object containing article-name:article-url pairs.

This mod currently has example files:

`com.wondible.pa.mod_help_player_guide.client/mod_help.json`

    {
      "articles": {
        "Mod Help Player Guide (Client)": "coui://ui/mods/mod_help_player_guide/article/mod_help_player_guide.html"
      }
    }
