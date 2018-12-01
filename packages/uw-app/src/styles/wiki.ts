import {css} from "react-emotion"

export default css`
  body {
    color: #222222;
  }

  .wiki table {
    border-collapse: separate !important;
  }

  .wiki *,
  .wiki ::after,
  .wiki ::before {
    box-sizing: content-box;
  }

  .wiki {
    font-size: 18px;

    cite,
    dfn {
      font-style: inherit;
    }
    q {
      quotes: '"' '"' "'" "'";
    }
    blockquote {
      overflow: hidden;
      margin: 1em 0;
      padding: 0 40px;
    }
    strong.selflink {
      font-weight: 700;
    }
    small {
      font-size: 85%;
    }
    .mw-body-content sub,
    .mw-body-content sup,
    span.reference {
      font-size: 80%;
    }
    .ns-talk .mw-body-content dd {
      margin-top: 0.4em;
      margin-bottom: 0.4em;
    }
    #interwiki-completelist {
      font-weight: bold;
    }
    .client-js .mw-special-Watchlist #watchlist-message,
    .client-js .NavFrame.collapsed .NavContent,
    .client-js .collapsible:not(.mw-made-collapsible).collapsed > tbody > tr:not(:first-child) {
      display: none;
    }
    .mw-rcfilters-enabled .mw-specialpage-summary {
      margin-top: 1em;
    }
    #toolbar {
      margin-bottom: 6px;
    }
    #editpage-specialchars {
      display: none;
    }
    body.action-info .mw-body-content :target,
    .citation:target {
      background-color: #def;
      background-color: rgba(0, 127, 255, 0.133);
    }
    .citation {
      word-wrap: break-word;
    }
    @media screen, handheld {
      .citation .printonly {
        display: none;
      }
    }
    ol.references,
    div.reflist {
      font-size: 90%;
      margin-bottom: 0.5em;
    }
    div.reflist ol.references {
      font-size: 100%;
      margin-bottom: 0;
      list-style-type: inherit;
    }
    span.brokenref {
      display: none;
    }
    div.columns {
      margin-top: 0.3em;
    }
    div.columns dl,
    div.columns ol,
    div.columns ul {
      margin-top: 0;
    }
    .nocolbreak,
    div.columns li,
    div.columns dd dd {
      -webkit-column-break-inside: avoid;
      page-break-inside: avoid;
      break-inside: avoid-column;
    }
    .hlist dl,
    .hlist ol,
    .hlist ul {
      margin: 0;
      padding: 0;
    }
    .hlist dd,
    .hlist dt,
    .hlist li {
      margin: 0;
      display: inline;
    }
    .hlist.inline,
    .hlist.inline dl,
    .hlist.inline ol,
    .hlist.inline ul,
    .hlist dl dl,
    .hlist dl ol,
    .hlist dl ul,
    .hlist ol dl,
    .hlist ol ol,
    .hlist ol ul,
    .hlist ul dl,
    .hlist ul ol,
    .hlist ul ul {
      display: inline;
    }
    .hlist .mw-empty-li {
      display: none;
    }
    .hlist dt:after {
      content: ":";
    }
    .hlist dd:after,
    .hlist li:after {
      content: " · ";
      font-weight: bold;
    }
    .hlist dd:last-child:after,
    .hlist dt:last-child:after,
    .hlist li:last-child:after {
      content: none;
    }
    .hlist dd dd:first-child:before,
    .hlist dd dt:first-child:before,
    .hlist dd li:first-child:before,
    .hlist dt dd:first-child:before,
    .hlist dt dt:first-child:before,
    .hlist dt li:first-child:before,
    .hlist li dd:first-child:before,
    .hlist li dt:first-child:before,
    .hlist li li:first-child:before {
      content: " (";
      font-weight: normal;
    }
    .hlist dd dd:last-child:after,
    .hlist dd dt:last-child:after,
    .hlist dd li:last-child:after,
    .hlist dt dd:last-child:after,
    .hlist dt dt:last-child:after,
    .hlist dt li:last-child:after,
    .hlist li dd:last-child:after,
    .hlist li dt:last-child:after,
    .hlist li li:last-child:after {
      content: ")";
      font-weight: normal;
    }
    .hlist ol {
      counter-reset: listitem;
    }
    .hlist ol > li {
      counter-increment: listitem;
    }
    .hlist ol > li:before {
      content: " " counter(listitem) "\a0";
    }
    .hlist dd ol > li:first-child:before,
    .hlist dt ol > li:first-child:before,
    .hlist li ol > li:first-child:before {
      content: " (" counter(listitem) "\a0";
    }
    .plainlist ol,
    .plainlist ul {
      line-height: inherit;
      list-style: none none;
      margin: 0;
    }
    .plainlist ol li,
    .plainlist ul li {
      margin-bottom: 0;
    }
    .navbox {
      box-sizing: border-box;
      border: 1px solid #a2a9b1;
      width: 100%;
      clear: both;
      font-size: 88%;
      text-align: center;
      padding: 1px;
      margin: 1em auto 0;
    }
    .navbox .navbox {
      margin-top: 0;
    }
    .navbox + .navbox {
      margin-top: -1px;
    }
    .navbox-inner,
    .navbox-subgroup {
      width: 100%;
    }
    .navbox-group,
    .navbox-title,
    .navbox-abovebelow {
      padding: 0.25em 1em;
      line-height: 1.5em;
      text-align: center;
    }
    th.navbox-group {
      white-space: nowrap;
      text-align: right;
    }
    .navbox,
    .navbox-subgroup {
      background-color: #fdfdfd;
    }
    .navbox-list {
      line-height: 1.5em;
      border-color: #fdfdfd;
    }
    tr + tr > .navbox-abovebelow,
    tr + tr > .navbox-group,
    tr + tr > .navbox-image,
    tr + tr > .navbox-list {
      border-top: 2px solid #fdfdfd;
    }
    .navbox th,
    .navbox-title {
      background-color: #ccccff;
    }
    .navbox-abovebelow,
    th.navbox-group,
    .navbox-subgroup .navbox-title {
      background-color: #ddddff;
    }
    .navbox-subgroup .navbox-group,
    .navbox-subgroup .navbox-abovebelow {
      background-color: #e6e6ff;
    }
    .navbox-even {
      background-color: #f7f7f7;
    }
    .navbox-odd {
      background-color: transparent;
    }
    .navbox .hlist td dl,
    .navbox .hlist td ol,
    .navbox .hlist td ul,
    .navbox td.hlist dl,
    .navbox td.hlist ol,
    .navbox td.hlist ul {
      padding: 0.125em 0;
    }
    .navbar {
      display: inline;
      font-size: 88%;
      font-weight: normal;
    }
    .navbar ul {
      display: inline;
      white-space: nowrap;
    }
    .mw-body-content .navbar ul {
      line-height: inherit;
    }
    .navbar li {
      word-spacing: -0.125em;
    }
    .navbar.mini li abbr[title] {
      font-variant: small-caps;
      border-bottom: none;
      text-decoration: none;
      cursor: inherit;
    }
    .infobox .navbar {
      font-size: 100%;
    }
    .navbox .navbar {
      display: block;
      font-size: 100%;
    }
    .navbox-title .navbar {
      float: left;
      text-align: left;
      margin-right: 0.5em;
    }
    .collapseButton {
      float: right;
      font-weight: normal;
      margin-left: 0.5em;
      text-align: right;
      width: auto;
    }
    .mw-parser-output .mw-collapsible-toggle {
      font-weight: normal;
      text-align: right;
      padding-right: 0.2em;
      padding-left: 0.2em;
    }
    .mw-collapsible-leftside-toggle .mw-collapsible-toggle {
      float: left;
      text-align: left;
    }
    .infobox {
      border: 1px solid #a2a9b1;
      border-spacing: 3px;
      background-color: #f8f9fa;
      color: black;
      margin: 0.5em 0 0.5em 1em;
      padding: 0.2em;
      float: right;
      clear: right;
      font-size: 88%;
      line-height: 1.5em;
    }
    .infobox caption {
      font-size: 125%;
      font-weight: bold;
      padding: 0.2em;
      text-align: center;
    }
    .infobox td,
    .infobox th {
      vertical-align: top;
      text-align: left;
    }
    .infobox.bordered {
      border-collapse: collapse;
    }
    .infobox.bordered td,
    .infobox.bordered th {
      border: 1px solid #a2a9b1;
    }
    .infobox.bordered .borderless td,
    .infobox.bordered .borderless th {
      border: 0;
    }
    .infobox.sisterproject {
      width: 20em;
      font-size: 90%;
    }
    .infobox.standard-talk {
      border: 1px solid #c0c090;
      background-color: #f8eaba;
    }
    .infobox.standard-talk.bordered td,
    .infobox.standard-talk.bordered th {
      border: 1px solid #c0c090;
    }
    .infobox.bordered .mergedtoprow td,
    .infobox.bordered .mergedtoprow th {
      border: 0;
      border-top: 1px solid #a2a9b1;
      border-right: 1px solid #a2a9b1;
    }
    .infobox.bordered .mergedrow td,
    .infobox.bordered .mergedrow th {
      border: 0;
      border-right: 1px solid #a2a9b1;
    }
    .infobox.geography {
      border-collapse: collapse;
      line-height: 1.2em;
      font-size: 90%;
    }
    .infobox.geography td,
    .infobox.geography th {
      border-top: 1px solid #a2a9b1;
      padding: 0.4em 0.6em 0.4em 0.6em;
    }
    .infobox.geography .mergedtoprow td,
    .infobox.geography .mergedtoprow th {
      border-top: 1px solid #a2a9b1;
      padding: 0.4em 0.6em 0.2em 0.6em;
    }
    .infobox.geography .mergedrow td,
    .infobox.geography .mergedrow th {
      border: 0;
      padding: 0 0.6em 0.2em 0.6em;
    }
    .infobox.geography .mergedbottomrow td,
    .infobox.geography .mergedbottomrow th {
      border-top: 0;
      border-bottom: 1px solid #a2a9b1;
      padding: 0 0.6em 0.4em 0.6em;
    }
    .infobox.geography .maptable td,
    .infobox.geography .maptable th {
      border: 0;
      padding: 0;
    }
    .wikitable.plainrowheaders th[scope="row"] {
      font-weight: normal;
      text-align: left;
    }
    .wikitable td ul,
    .wikitable td ol,
    .wikitable td dl {
      text-align: left;
    }
    .toc.hlist ul,
    #toc.hlist ul,
    .wikitable.hlist td ul,
    .wikitable.hlist td ol,
    .wikitable.hlist td dl {
      text-align: inherit;
    }
    div.listenlist {
      background: url(//upload.wikimedia.org/wikipedia/commons/4/47/Sound-icon.svg) no-repeat scroll
        0 0 transparent;
      background-size: 30px;
      padding-left: 40px;
    }
    table.mw-hiero-table td {
      vertical-align: middle;
    }
    div.medialist {
      min-height: 50px;
      margin: 1em;
      background-position: top left;
      background-repeat: no-repeat;
    }
    div.medialist ul {
      list-style-type: none;
      list-style-image: none;
      margin: 0;
    }
    div.medialist ul li {
      padding-bottom: 0.5em;
    }
    div.medialist ul li li {
      font-size: 91%;
      padding-bottom: 0;
    }
    div#content a[href$=".pdf"].external,
    div#content a[href*=".pdf?"].external,
    div#content a[href*=".pdf#"].external,
    div#content a[href$=".PDF"].external,
    div#content a[href*=".PDF?"].external,
    div#content a[href*=".PDF#"].external,
    div#mw_content a[href$=".pdf"].external,
    div#mw_content a[href*=".pdf?"].external,
    div#mw_content a[href*=".pdf#"].external,
    div#mw_content a[href$=".PDF"].external,
    div#mw_content a[href*=".PDF?"].external,
    div#mw_content a[href*=".PDF#"].external {
      background: url(//upload.wikimedia.org/wikipedia/commons/2/23/Icons-mini-file_acrobat.gif)
        no-repeat right;
      padding-right: 18px;
    }
    .messagebox {
      border: 1px solid #a2a9b1;
      background-color: #f8f9fa;
      width: 80%;
      margin: 0 auto 1em auto;
      padding: 0.2em;
    }
    .messagebox.merge {
      border: 1px solid #c0b8cc;
      background-color: #f0e5ff;
      text-align: center;
    }
    .messagebox.cleanup {
      border: 1px solid #9f9fff;
      background-color: #efefff;
      text-align: center;
    }
    .messagebox.standard-talk {
      border: 1px solid #c0c090;
      background-color: #f8eaba;
      margin: 4px auto;
    }
    .mbox-inside .standard-talk,
    .messagebox.nested-talk {
      border: 1px solid #c0c090;
      background-color: #f8eaba;
      width: 100%;
      margin: 2px 0;
      padding: 2px;
    }
    .messagebox.small {
      width: 238px;
      font-size: 85%;
      float: right;
      clear: both;
      margin: 0 0 1em 1em;
      line-height: 1.25em;
    }
    .messagebox.small-talk {
      width: 238px;
      font-size: 85%;
      float: right;
      clear: both;
      margin: 0 0 1em 1em;
      line-height: 1.25em;
      background-color: #f8eaba;
    }
    th.mbox-text,
    td.mbox-text {
      border: none;
      padding: 0.25em 0.9em;
      width: 100%;
    }
    td.mbox-image {
      border: none;
      padding: 2px 0 2px 0.9em;
      text-align: center;
    }
    td.mbox-imageright {
      border: none;
      padding: 2px 0.9em 2px 0;
      text-align: center;
    }
    td.mbox-empty-cell {
      border: none;
      padding: 0;
      width: 1px;
    }
    table.ambox {
      margin: 0 10%;
      border: 1px solid #a2a9b1;
      border-left: 10px solid #36c;
      background-color: #fbfbfb;
      box-sizing: border-box;
    }
    table.ambox + table.ambox {
      margin-top: -1px;
    }
    .ambox th.mbox-text,
    .ambox td.mbox-text {
      padding: 0.25em 0.5em;
    }
    .ambox td.mbox-image {
      padding: 2px 0 2px 0.5em;
    }
    .ambox td.mbox-imageright {
      padding: 2px 0.5em 2px 0;
    }
    table.ambox-notice {
      border-left: 10px solid #36c;
    }
    table.ambox-speedy {
      border-left: 10px solid #b32424;
      background-color: #fee7e6;
    }
    table.ambox-delete {
      border-left: 10px solid #b32424;
    }
    table.ambox-content {
      border-left: 10px solid #f28500;
    }
    table.ambox-style {
      border-left: 10px solid #fc3;
    }
    table.ambox-move {
      border-left: 10px solid #9932cc;
    }
    table.ambox-protection {
      border-left: 10px solid #a2a9b1;
    }
    table.imbox {
      margin: 4px 10%;
      border-collapse: collapse;
      border: 3px solid #36c;
      background-color: #fbfbfb;
      box-sizing: border-box;
    }
    .imbox .mbox-text .imbox {
      margin: 0 -0.5em;
      display: block;
    }
    .mbox-inside .imbox {
      margin: 4px;
    }
    table.imbox-notice {
      border: 3px solid #36c;
    }
    table.imbox-speedy {
      border: 3px solid #b32424;
      background-color: #fee7e6;
    }
    table.imbox-delete {
      border: 3px solid #b32424;
    }
    table.imbox-content {
      border: 3px solid #f28500;
    }
    table.imbox-style {
      border: 3px solid #fc3;
    }
    table.imbox-move {
      border: 3px solid #9932cc;
    }
    table.imbox-protection {
      border: 3px solid #a2a9b1;
    }
    table.imbox-license {
      border: 3px solid #88a;
      background-color: #f7f8ff;
    }
    table.imbox-featured {
      border: 3px solid #cba135;
    }
    table.cmbox {
      margin: 3px 10%;
      border-collapse: collapse;
      border: 1px solid #a2a9b1;
      background-color: #dfe8ff;
      box-sizing: border-box;
    }
    table.cmbox-notice {
      background-color: #d8e8ff;
    }
    table.cmbox-speedy {
      margin-top: 4px;
      margin-bottom: 4px;
      border: 4px solid #b32424;
      background-color: #ffdbdb;
    }
    table.cmbox-delete {
      background-color: #ffdbdb;
    }
    table.cmbox-content {
      background-color: #ffe7ce;
    }
    table.cmbox-style {
      background-color: #fff9db;
    }
    table.cmbox-move {
      background-color: #e4d8ff;
    }
    table.cmbox-protection {
      background-color: #efefe1;
    }
    table.ombox {
      margin: 4px 10%;
      border-collapse: collapse;
      border: 1px solid #a2a9b1;
      background-color: #f8f9fa;
      box-sizing: border-box;
    }
    table.ombox-notice {
      border: 1px solid #a2a9b1;
    }
    table.ombox-speedy {
      border: 2px solid #b32424;
      background-color: #fee7e6;
    }
    table.ombox-delete {
      border: 2px solid #b32424;
    }
    table.ombox-content {
      border: 1px solid #f28500;
    }
    table.ombox-style {
      border: 1px solid #fc3;
    }
    table.ombox-move {
      border: 1px solid #9932cc;
    }
    table.ombox-protection {
      border: 2px solid #a2a9b1;
    }
    table.tmbox {
      margin: 4px 10%;
      border-collapse: collapse;
      border: 1px solid #c0c090;
      background-color: #f8eaba;
      min-width: 80%;
      box-sizing: border-box;
    }
    .tmbox.mbox-small {
      min-width: 0;
    }
    .mediawiki .mbox-inside .tmbox {
      margin: 2px 0;
      width: 100%;
    }
    .mbox-inside .tmbox.mbox-small {
      line-height: 1.5em;
      font-size: 100%;
    }
    table.tmbox-speedy {
      border: 2px solid #b32424;
      background-color: #fee7e6;
    }
    table.tmbox-delete {
      border: 2px solid #b32424;
    }
    table.tmbox-content {
      border: 2px solid #f28500;
    }
    table.tmbox-style {
      border: 2px solid #fc3;
    }
    table.tmbox-move {
      border: 2px solid #9932cc;
    }
    table.tmbox-protection,
    table.tmbox-notice {
      border: 1px solid #c0c090;
    }
    table.dmbox {
      clear: both;
      margin: 0.9em 1em;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      background-color: transparent;
    }
    table.fmbox {
      clear: both;
      margin: 0.2em 0;
      width: 100%;
      border: 1px solid #a2a9b1;
      background-color: #f8f9fa;
      box-sizing: border-box;
    }
    table.fmbox-system {
      background-color: #f8f9fa;
    }
    table.fmbox-warning {
      border: 1px solid #bb7070;
      background-color: #ffdbdb;
    }
    table.fmbox-editnotice {
      background-color: transparent;
    }
    div.mw-warning-with-logexcerpt,
    div.mw-lag-warn-high,
    div.mw-cascadeprotectedwarning,
    div#mw-protect-cascadeon,
    div.titleblacklist-warning,
    div.locked-warning {
      clear: both;
      margin: 0.2em 0;
      border: 1px solid #bb7070;
      background-color: #ffdbdb;
      padding: 0.25em 0.9em;
      box-sizing: border-box;
    }
    html body.mediawiki .mbox-small {
      clear: right;
      float: right;
      margin: 4px 0 4px 1em;
      box-sizing: border-box;
      width: 238px;
      font-size: 88%;
      line-height: 1.25em;
    }
    html body.mediawiki .mbox-small-left {
      margin: 4px 1em 4px 0;
      box-sizing: border-box;
      overflow: hidden;
      width: 238px;
      border-collapse: collapse;
      font-size: 88%;
      line-height: 1.25em;
    }
    .compact-ambox table .mbox-image,
    .compact-ambox table .mbox-imageright,
    .compact-ambox table .mbox-empty-cell {
      display: none;
    }
    .compact-ambox table.ambox {
      border: none;
      border-collapse: collapse;
      background-color: transparent;
      margin: 0 0 0 1.6em !important;
      padding: 0 !important;
      width: auto;
      display: block;
    }
    body.mediawiki .compact-ambox table.mbox-small-left {
      font-size: 100%;
      width: auto;
      margin: 0;
    }
    .compact-ambox table .mbox-text {
      padding: 0 !important;
      margin: 0 !important;
    }
    .compact-ambox table .mbox-text-span {
      display: list-item;
      line-height: 1.5em;
      list-style-type: square;
      list-style-image: url(//en.wikipedia.org/w/skins/MonoBook/resources/images/bullet.gif);
    }
    .skin-vector .compact-ambox table .mbox-text-span {
      list-style-type: disc;
      list-style-image: url(//en.wikipedia.org/w/skins/Vector/images/bullet-icon.svg);
      list-style-image: url(//en.wikipedia.org/w/skins/Vector/images/bullet-icon.png) \9;
    }
    .compact-ambox .hide-when-compact {
      display: none;
    }
    .visualhide {
      position: absolute;
      left: -10000px;
      top: auto;
      width: 1px;
      height: 1px;
      overflow: hidden;
    }
    .check-icon a.new {
      display: none;
    }
    .nounderlines a,
    .IPA a:link,
    .IPA a:visited {
      text-decoration: none !important;
    }
    div.NavFrame {
      margin: 0;
      padding: 4px;
      border: 1px solid #a2a9b1;
      text-align: center;
      border-collapse: collapse;
      font-size: 95%;
    }
    div.NavFrame + div.NavFrame {
      border-top-style: none;
      border-top-style: hidden;
    }
    div.NavPic {
      background-color: #fff;
      margin: 0;
      padding: 2px;
      float: left;
    }
    div.NavFrame div.NavHead {
      line-height: 1.6em;
      font-weight: bold;
      background-color: #ccf;
      position: relative;
    }
    div.NavFrame p,
    div.NavFrame div.NavContent,
    div.NavFrame div.NavContent p {
      font-size: 100%;
    }
    div.NavEnd {
      margin: 0;
      padding: 0;
      line-height: 1px;
      clear: both;
    }
    a.NavToggle {
      position: absolute;
      top: 0;
      right: 3px;
      font-weight: normal;
      font-size: 90%;
    }
    .hatnote {
      font-style: italic;
    }
    .hatnote i {
      font-style: normal;
    }
    div.hatnote {
      padding-left: 1.6em;
      margin-bottom: 0.5em;
    }
    div.hatnote + div.hatnote {
      margin-top: -0.5em;
    }
    .listify td {
      display: list-item;
    }
    .listify tr {
      display: block;
    }
    .listify table {
      display: block;
    }
    .geo-default,
    .geo-dms,
    .geo-dec {
      display: inline;
    }
    .geo-nondefault,
    .geo-multi-punct {
      display: none;
    }
    .longitude,
    .latitude {
      white-space: nowrap;
    }
    .toclimit-2 .toclevel-1 ul,
    .toclimit-3 .toclevel-2 ul,
    .toclimit-4 .toclevel-3 ul,
    .toclimit-5 .toclevel-4 ul,
    .toclimit-6 .toclevel-5 ul,
    .toclimit-7 .toclevel-6 ul {
      display: none;
    }
    div.user-block {
      padding: 5px;
      margin-bottom: 0.5em;
      border: 1px solid #a9a9a9;
      background-color: #ffefd5;
    }
    .nowrap,
    .nowraplinks a,
    .nowraplinks .selflink {
      white-space: nowrap;
    }
    .nowrap pre {
      white-space: pre;
    }
    .wrap,
    .wraplinks a {
      white-space: normal;
    }
    .template-documentation {
      clear: both;
      margin: 1em 0 0 0;
      border: 1px solid #a2a9b1;
      background-color: #ecfcf4;
      padding: 1em;
    }
    #wpUploadDescription {
      height: 13em;
    }
    .thumbinner {
      min-width: 100px;
    }
    #mw-subcategories,
    #mw-pages,
    #mw-category-media,
    #filehistory,
    #wikiPreview,
    #wikiDiff {
      clear: both;
    }
    .wpb .wpb-header {
      display: none;
    }
    .wpbs-inner .wpb .wpb-header {
      display: block;
    }
    .wpbs-inner .wpb .wpb-header {
      display: table-row;
    }
    .wpbs-inner .wpb-outside {
      display: none;
    }
    .mw-tag-markers {
      font-style: italic;
      font-size: 90%;
    }
    .sysop-show,
    .templateeditor-show,
    .extendedmover-show,
    .patroller-show,
    .autoconfirmed-show,
    .user-show {
      display: none;
    }
    .ve-ui-mwNoticesPopupTool-item .editnotice-redlink,
    .ve-ui-mwNoticesPopupTool-item .mbox-image,
    .ve-ui-mwNoticesPopupTool-item .mbox-imageright {
      display: none !important;
    }
    ul.permissions-errors > li {
      list-style: none none;
    }
    ul.permissions-errors {
      margin: 0;
    }
    .times-serif,
    span.texhtml {
      font-family: "Nimbus Roman No9 L", "Times New Roman", Times, serif;
      font-size: 118%;
      line-height: 1;
    }
    span.texhtml {
      white-space: nowrap;
    }
    span.texhtml span.texhtml {
      font-size: 100%;
    }
    span.mwe-math-mathml-inline {
      font-size: 118%;
    }
    .digits,
    .texhtml {
      -moz-font-feature-settings: "lnum", "tnum", "kern" 0;
      -webkit-font-feature-settings: "lnum", "tnum", "kern" 0;
      font-feature-settings: "lnum", "tnum", "kern" 0;
      font-variant-numeric: lining-nums tabular-nums;
      font-kerning: none;
    }
    .mwe-math-fallback-image-display,
    .mwe-math-mathml-display {
      margin-left: 1.6em !important;
      margin-top: 0.6em;
      margin-bottom: 0.6em;
    }
    .mwe-math-mathml-display math {
      display: inline;
    }
    table#mw-prefixindex-list-table,
    table#mw-prefixindex-nav-table {
      width: 98%;
    }
    .portal-column-left {
      float: left;
      width: 50%;
    }
    .portal-column-right {
      float: right;
      width: 49%;
    }
    .portal-column-left-wide {
      float: left;
      width: 60%;
    }
    .portal-column-right-narrow {
      float: right;
      width: 39%;
    }
    .portal-column-left-extra-wide {
      float: left;
      width: 70%;
    }
    .portal-column-right-extra-narrow {
      float: right;
      width: 29%;
    }
    @media only screen and (max-width: 800px) {
      .portal-column-left,
      .portal-column-right,
      .portal-column-left-wide,
      .portal-column-right-narrow,
      .portal-column-left-extra-wide,
      .portal-column-right-extra-narrow {
        float: inherit;
        width: inherit;
      }
    }
    #bodyContent .letterhead {
      background-image: url(//upload.wikimedia.org/wikipedia/commons/e/e0/Tan-page-corner.png);
      background-repeat: no-repeat;
      padding: 2em;
      background-color: #faf9f2;
    }
    td .sortkey,
    th .sortkey {
      display: none;
    }
    .inputbox-hidecheckboxes form .inputbox-element,
    .inputbox-hidecheckboxes .mw-ui-checkbox {
      display: none !important;
    }
    .k-player .k-attribution {
      visibility: hidden;
    }
    .PopUpMediaTransform a .play-btn-large {
      margin: 0;
      top: auto;
      right: auto;
      bottom: 0;
      left: 0;
    }
    .flaggedrevs_draft_synced,
    .flaggedrevs_stable_synced {
      display: none;
    }
    .bordered-images img {
      border: solid #ddd 1px;
    }
    @media screen {
      #content .gallerybox div.thumb {
        background-color: #f8f9fa;
      }
      .gallerybox .thumb img {
        background: #fff url(//upload.wikimedia.org/wikipedia/commons/5/5d/Checker-16x16.png) repeat;
      }
      .ns-0 .gallerybox .thumb img,
      .ns-2 .gallerybox .thumb img,
      .ns-100 .gallerybox .thumb img,
      .nochecker .gallerybox .thumb img {
        background-image: none;
      }
    }
    @media screen {
      #siteSub {
        display: block;
      }
    }
    .page-Main_Page #deleteconfirm,
    .page-Main_Page #t-cite,
    .page-Main_Page #footer-info-lastmod,
    .action-view.page-Main_Page #siteSub,
    .action-view.page-Main_Page #contentSub,
    .action-view.page-Main_Page .firstHeading {
      display: none !important;
    }
    #coordinates {
      position: absolute;
      top: 0;
      right: 0;
      float: right;
      margin: 0;
      padding: 0;
      line-height: 1.5em;
      text-align: right;
      text-indent: 0;
      font-size: 85%;
      text-transform: none;
      white-space: nowrap;
    }
    .ve-ce-surface-enabled #coordinates {
      margin-right: 2em;
      margin-top: -1em;
    }
    .mw-indicator #coordinates {
      position: absolute;
      top: 3em;
      right: 0;
      line-height: 1.6;
      text-align: right;
      font-size: 92%;
      white-space: nowrap;
    }
    div.flaggedrevs_short {
      position: absolute;
      top: -3em;
      right: 100px;
      z-index: 1;
    }
    #siteSub {
      font-size: 92%;
    }
    .mw-body .mw-indicators {
      padding-top: 0.4em;
    }
    @media print {
      .ns--1 .ambox,
      .ns-0 .ambox,
      .ns--1 .navbox,
      .ns-0 .navbox,
      .ns--1 .vertical-navbox,
      .ns-0 .vertical-navbox,
      .ns--1 .infobox.sisterproject,
      .ns-0 .infobox.sisterproject,
      .ns--1 .hatnote,
      .ns-0 .hatnote,
      .ns--1 .dablink,
      .ns-0 .dablink,
      .ns--1 .metadata,
      .ns-0 .metadata,
      .sistersitebox,
      .editlink,
      .navbar,
      a.NavToggle,
      span.collapseButton,
      span.mw-collapsible-toggle,
      th .sortkey,
      td .sortkey,
      #mw-revision-nav {
        display: none !important;
      }
      .nourlexpansion a.external.text:after,
      .nourlexpansion a.external.autonumber:after {
        display: none !important;
      }
      table.collapsible tr,
      div.NavPic,
      div.NavContent {
        display: block !important;
      }
      table.collapsible tr {
        display: table-row !important;
      }
      .mw-parser-output .mw-collapsed .mw-collapsible-content {
        display: block !important;
      }
      .mw-parser-output table.mw-collapsed > * > tr {
        display: table-row !important;
      }
      .mw-parser-output ol.mw-collapsed > li,
      .mw-parser-output ul.mw-collapsed > li {
        display: list-item !important;
      }
      #firstHeading {
        margin: 0;
      }
      #content a.external.text:after,
      #content a.external.autonumber:after {
        word-wrap: break-word;
      }
      .infobox {
        border: solid 1px #aaa;
        background-color: #fff;
        border-spacing: 0;
        border-collapse: collapse;
        width: 180pt !important;
      }
      .infobox > * > tr > td,
      .infobox > * > tr > th {
        padding: 2px 5px;
        border-bottom: 1px solid #eaecf0;
      }
      .infobox a,
      .infobox > * > tr:last-child > th,
      .infobox > * > tr:last-child > td {
        border: 0;
      }
      .refbegin a,
      .references a,
      .reference a {
        color: black !important;
      }
      sup,
      sub {
        line-height: 1;
      }
      sup.reference {
        font-family: sans-serif;
      }
      .reference a {
        border-bottom: 0;
      }
      ol.references,
      div.reflist,
      div.refbegin,
      cite * {
        font-size: inherit !important;
      }
      .refbegin li,
      .references li {
        color: #666;
        line-height: 14pt;
      }
      .printfooter {
        clear: both;
      }
    }
  }
`
