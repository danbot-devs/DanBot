const url = require("url");
const path = require("path");
const Discord = require("discord.js");
const express = require("express");
const app = express();
const moment = require("moment");
require("moment-duration-format");
const passport = require("passport");
const session = require("express-session");
const LevelStore = require("level-session-store")(session);
const Strategy = require("passport-discord").Strategy;
const helmet = require("helmet");
const md = require("marked");


module.exports = (client) => {
  const dataDir = path.resolve(`${process.cwd()}${path.sep}dashboard`);
  const templateDir = path.resolve(`${dataDir}${path.sep}templates`);
  app.use('/public', express.static(path.resolve(`${dataDir}${path.sep}public`), { maxAge: '10d' }));
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
  passport.use(new Strategy({
    clientID: client.appInfo.id,
    clientSecret: client.config.dashboard.oauthSecret,
    callbackURL: client.config.dashboard.callbackURL,
    scope: ["identify", "guilds"]
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
  }));
  app.use(session({
    store: new LevelStore("./data/dashboard-session/"),
    secret: client.config.dashboard.sessionSecret,
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(helmet());
  app.locals.domain = client.config.dashboard.domain;
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  var bodyParser = require("body-parser");
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  })); 
  function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
  }
  const renderTemplate = (res, req, template, data = {}) => {
    const baseData = {
      bot: client,
      path: req.path,
      user: req.isAuthenticated() ? req.user : null
    };
    res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
  };
  app.get("/login", (req, res, next) => {
    if (req.session.backURL) {
      req.session.backURL = req.session.backURL;
    } else if (req.headers.referer) {
      const parsed = url.parse(req.headers.referer);
      if (parsed.hostname === app.locals.domain) {
        req.session.backURL = parsed.path;
      }
    } else {
      req.session.backURL = "/";
    }
    next();
  },
  passport.authenticate("discord"));
  app.get("/callback", passport.authenticate("discord", { failureRedirect: "/autherror" }), (req, res) => {
    if (req.user.id === client.appInfo.owner.id) {
      req.session.isAdmin = true;
    } else {
      req.session.isAdmin = false;
    }
    if (req.session.backURL) {
      const url = req.session.backURL;
      req.session.backURL = null;
      res.redirect(url);
    } else {
      res.redirect("/");
    }
  });
  
  app.get("/staff", (req, res) => {
    renderTemplate(res, req, "DanBot Staff.ejs");
  });
  app.get("/invite", (req, res) => {
    res.redirect("https://discordapp.com/oauth2/authorize?client_id=422433314347941896&scope=bot&permissions=2146958847");
  });
  app.get("/todo", (req, res) => {
    res.redirect("https://docs.google.com/document/d/154Xv9PFIJt4pD1uo-JjxuFFgAQm00qHPXbfQmzntMQ4/edit?usp=sharing")
  });
  app.get("/support", (req, res) => {
    res.redirect("https://discordapp.com/invite/PxE2gz6");
  });
  app.get("/autherror", (req, res) => {
    renderTemplate(res, req, "autherror.ejs");
  });
  app.get("/logout", function(req, res) {
    req.session.destroy(() => {
      req.logout();
      res.redirect("/");
    });
  });
  app.get("/", (req, res) => {
    const guilds = client.guilds.size;
    const members = client.guilds.reduce((p, c) => p + c.memberCount, 0);
    const execSync = require('child_process').execSync;
    const up = execSync('uptime -p').toString();
    const ups = execSync('uptime -s').toString();
    renderTemplate(res, req, "index.ejs", {
      indexstats: {
        up: up,
        ups: ups,
        servers: guilds,
        members: members
      }
    });
  });
  app.get("/commands", (req, res) => {
    renderTemplate(res, req, "commands.ejs", {md});
  });
  var cpuStat = require('cpu-stat');
  var memStat = require('mem-stat');
  var netStat = require('net-stat');
  var disk = require('diskusage');
  const si = require('systeminformation');
  const fs = require("fs");
  var os = require('os')
  var cpu = os.loadavg();
  app.get("/stats", (req, res) => {
    const execSync = require('child_process').execSync; 
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    const uptimetodhms = execSync("date +%s%3N").toString();
    const duration2 = moment.duration(uptimetodhms).format(" D [days], H [hrs], m [mins], s [secs]");
    const members = client.guilds.reduce((p, c) => p + c.memberCount, 0);
    const textChannels = client.channels.filter(c => c.type === "text").size;
    const voiceChannels = client.channels.filter(c => c.type === "voice").size;
    const guilds = client.guilds.size;
    const osuptime = execSync('uptime -p').toString();
    const lastboot = execSync('uptime -s').toString();
    const cpuusage = execSync(`grep 'cpu ' /proc/stat | awk '{usage=($2+$4)*100/($2+$4+$5)} END {print usage "%"}'`)
    disk.check('/', function(err, info) {
    renderTemplate(res, req, "stats.ejs", {
      stats: {
        servers: guilds,
        members: members,
        text: textChannels,
        voice: voiceChannels,
        uptime: duration,
        memoryUsage: Math.round(process.memoryUsage().rss / 1024 / 1024),
        dVersion: Discord.version,
        nVersion: process.version,
        ping: Math.round(client.ping),
        memoryused: Math.round(memStat.total('MiB') - memStat.free('MiB')),
        memorytotal: Math.round(memStat.total('GiB')),
        mempercent: Math.ceil(memStat.usedPercent() * 100) / 100 + "%",
        cpupercent: Math.ceil(cpu[1] * 100) / 10 + "%",
        OSdiskfree: Math.round(info.free / 1000000 / 1024),
        OSdisktotal: Math.round(info.total / 1000000 / 1024),
        netdown: Math.round(netStat.totalRx({ iface: 'ens18', units: 'GiB' })),
        netsent: Math.round(netStat.totalTx({ iface: 'ens18', units: 'GiB' })),
        osuptime: osuptime,
        lastboot: lastboot,
        cpuusagenew: cpuusage
      }
    });
  });
});

  app.get("/dashboard", checkAuth, (req, res) => {
    const perms = Discord.EvaluatedPermissions;
    renderTemplate(res, req, "dashboard.ejs", {perms});
  });
  app.get("/admin", checkAuth, (req, res) => {
    if (!req.session.isAdmin) return res.redirect("/");
    renderTemplate(res, req, "admin.ejs");
  });
  app.get("/dashboard/:guildID", checkAuth, (req, res) => {
    res.redirect(`/dashboard/${req.params.guildID}/manage`);
  });
  app.get("/dashboard/:guildID/manage", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    renderTemplate(res, req, "guild/manage.ejs", {guild});
  });
  app.post("/dashboard/:guildID/manage", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404); 
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    client.settings.set(guild.id, req.body);
    res.redirect("/dashboard/"+req.params.guildID+"/manage");
  });
  app.get("/dashboard/:guildID/members", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    renderTemplate(res, req, "guild/members.ejs", {
      guild: guild,
      members: guild.members.array()
    });
  });
  app.get("/dashboard/:guildID/msgleaderboard", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
  const SQLite = require("better-sqlite3");
  const sql = new SQLite('./SQL/messageleaderboard/msg.sqlite');

    for(const data of points) {
    renderTemplate(res, req, "guild/msgleaderboard.ejs", {
      id: data.user.id,
      displayName: data.user,
      points: data.points
    });
  }});

  app.get("/leaderboard", (req, res) => {
    const SQLite = require("better-sqlite3");
    const sql = new SQLite('./SQL/messageleaderboard/msg.sqlite');
    const top10 = sql.prepare("SELECT * FROM scores ORDER BY points;", (err, row) => {
      if (err) {
        return console.error(err.message);
    } if (!row) {
      for(const data of top10) {
      renderTemplate(res, req, "leaderboard.ejs", {
        username: data.user
      })
    }}
  })
})



  app.get("/dashboard/:guildID/members/list", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    if (req.query.fetch) {
      await guild.fetchMembers();
    }
    const totals = guild.members.size;
    const start = parseInt(req.query.start, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 50;
    let members = guild.members;
    if (req.query.filter && req.query.filter !== "null") {
      members = members.filter(m=> {
        m = req.query.filterUser ? m.user : m;
        return m["displayName"].toLowerCase().includes(req.query.filter.toLowerCase());
      });
    }
    if (req.query.sortby) {
      members = members.sort((a, b) => a[req.query.sortby] > b[req.query.sortby]);
    }
    const memberArray = members.array().slice(start, start+limit);
    const returnObject = [];
    for (let i = 0; i < memberArray.length; i++) {
      const m = memberArray[i];
      returnObject.push({
        id: m.id,
        status: m.user.presence.status,
        bot: m.user.bot,
        username: m.user.username,
        displayName: m.displayName,
        tag: m.user.tag,
        discriminator: m.user.discriminator,
        joinedAt: m.joinedTimestamp,
        createdAt: m.user.createdTimestamp,
        highestRole: {
          hexColor: m.highestRole.hexColor
        },
        memberFor: moment.duration(Date.now() - m.joinedAt).format(" D [days], H [hrs], m [mins], s [secs]"),
        roles: m.roles.map(r=>({
          name: r.name,
          id: r.id,
          hexColor: r.hexColor
        }))
      });
    }
    res.json({
      total: totals,
      page: (start/limit)+1,
      pageof: Math.ceil(members.size / limit),
      members: returnObject
    });
  });
  app.get("/dashboard/:guildID/stats", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    const member = client.guilds.reduce((p, c) => p + c.memberCount, 0);
    const textChannels = client.channels.filter(c => c.type === "text").size;
    const voiceChannels = client.channels.filter(c => c.type === "voice").size;
    const dateFormat = require('dateformat');
    const date = dateFormat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
    renderTemplate(res, req, "guild/stats.ejs", {guild}, {
      indexstats: {
        dateformat: date(msg.guild.createdAt),
        members: member,
        text: textChannels,
        voice: voiceChannels
      }})
  });
  app.get("/dashboard/:guildID/leave", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    await guild.leave();
    res.redirect("/dashboard");
  });
  app.get("/dashboard/:guildID/reset", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    client.settings.delete(guild.id);
    res.redirect("/dashboard/"+req.params.guildID);
  });
  client.site = app.listen(client.config.dashboard.port);
};
