var lastUrl;

function test() {
    var a = document.getElementById("site-fetch").value;
    if (/^(?:htt(?:p|ps):\/\/)?(www\.)?[-a-z0-9_.]+\.[a-z]{2,4}[-a-z0-9_.\/]*$/i.exec(a)) {
        document.getElementById("loader").className = "loader-hot";
        var d;
        d = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
        lastUrl = a;
        d.onreadystatechange = function() {
            4 == d.readyState && 200 == d.status && "" != d.responseText ? (document.getElementById("siteresult").innerHTML = d.responseText, testMeta(d.responseText), $("#resultscrollto").scrollView()) : 4 ==
                d.readyState && (document.getElementById("siteresult").innerHTML = "<h2 style='text-align:center;padding:32px'>Couldn't find the requested site!</h2>", document.getElementById("loader").className = "", document.getElementById("siteresult").style.background = "#fff", $("#resultscrollto").scrollView())
        };
        a = "url=" + encodeURIComponent(a);
        d.open("POST", "https://zuma.natant.com/MT/metatest.php", !0);
        d.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        d.send(a)
    }
}
var score, failScore;

function testMeta(a) {
    failScore = score = 0;
    var d = a.split("\n"),
        f = 0,
        g = 0,
        h = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0,
        L = 0,
        M = 0,
        N = 0,
        O = 0,
        P = 0,
        Q = 0,
        R = 0,
        S = 0,
        T = 0,
        U = 0,
        V = 0,
        W = 0,
        X = 0,
        Y = 0,
        Z = 0,
        aa = 0,
        ba = 0,
        ca = 0,
        da = 0,
        ea = 0;
    a = "<div id='result'><h2 style='padding:8px'>Tags, Properties and links we found implemented.</h2><br/>";
    for (var e = 0; e < d.length; e++) {
        var b = d[e];
        if (1 == f) break;
        var c = /<\/\s*head\s*>/i;
        c.exec(b) && (f = 1);

        //c = /<\s*html.*manifest\s*=\s*".*appcache"/i;
        //c.exec(b) &&
        //    (g = 1, a += addSuccess("<span class='success-mark'>\u2714</span> HTML Manifest, offline browser caching: ", b));

        c = /<\s*meta.*itemprop\s*=\s*"\s*name\s*"/i;
        c.exec(b) && (h = 1, a += addSuccess("<span class='success-mark'>\u2714</span> itemprop 'name' meta: ", b));
        c = /<\s*meta.*itemprop\s*=\s*"\s*url\s*"/i;
        c.exec(b) && (k = 1, a += addSuccess("<span class='success-mark'>\u2714</span> itemprop 'url' meta: ", b));
        c = /<\s*meta.*itemprop\s*=\s*"\s*description\s*"/i;
        c.exec(b) && (l = 1, a += addSuccess("<span class='success-mark'>\u2714</span> itemprop 'description' meta: ",
            b));
        c = /<\s*meta.*itemprop\s*=\s*"\s*image\s*"/i;
        c.exec(b) && (m = 1, a += addSuccess("<span class='success-mark'>\u2714</span> itemprop 'image' meta: ", b));
        c = /<\s*meta.*name\s*=\s*"\s*author\s*"/i;
        c.exec(b) && (n = 1, a += addSuccess("<span class='success-mark'>\u2714</span> Author meta: ", b));
        c = /<\s*meta.*name\s*=\s*"\s*description\s*"/i;
        c.exec(b) && (p = 1, a += addSuccess("<span class='success-mark'>\u2714</span> Description meta: ", b));
        c = /<\s*meta.*name\s*=\s*"\s*keywords\s*"/i;
        c.exec(b) && (q = 1, a += addSuccess("<span class='success-mark'>\u2714</span> Keywords meta. Make sure to keep these down to 10-15 keywords maximum and avoid using the site name again : ",
            b));
        c = /<\s*meta.*name\s*=\s*"\s*robots\s*"/i;
        c.exec(b) && (r = 1, a += addSuccess("<span class='success-mark'>\u2714</span> Robots meta: ", b));
        c = /<\s*meta.*name\s*=\s*"\s*viewport\s*"/i;
        c.exec(b) && (s = 1, a += addSuccess("<span class='success-mark'>\u2714</span> Viewport meta: ", b));
        c = /<\s*html.*lang\s*=\s*["'][^'"]+["']/i;
        c.exec(b) && (t = 1, a += addSuccess("<span class='success-mark'>\u2714</span> Document Language: ", b));
        c = /<\s*meta.*name\s*=\s*"\s*apple-mobile-web-app-capable\s*"/i;
        c.exec(b) && (u = 1, a += addSuccess("<span class='success-mark'>\u2714</span> Apple Mobile Web App Capable meta: ",
            b));
        c = /<\s*meta.*name\s*=\s*"\s*apple-mobile-web-app-status-bar-style\s*"/i;
        c.exec(b) && (v = 1, a += addSuccess("<span class='success-mark'>\u2714</span> Apple Mobile Web App Status Bar Style meta: ", b));
        c = /<\s*meta.*http-equiv\s*=\s*"\s*X-UA-Compatible\s*"/i;
        c.exec(b) && (w = 1, a += addSuccess("<span class='success-mark'>\u2714</span> X-UA (Chrome and IE) compatibility meta: ", b));
        c = /<\s*meta.*name\s*=\s*"\s*HandHeldFriendly\s*"/i;
        c.exec(b) && (x = 1, a += addSuccess("<span class='success-mark'>\u2714</span> HandHeld Friendly for Blackberry & Palm meta: ",
            b));
        c = /<\s*meta.*name\s*=\s*"\s*theme-color\s*"/i;
        c.exec(b) && (y = 1, a += addSuccess("<span class='success-mark'>\u2714</span> Theme Color meta: ", b));
        c = /<\s*meta.*name\s*=\s*"\s*msapplication-TileColor\s*"/i;
        c.exec(b) && (z = 1, a += addSuccess("<span class='success-mark'>\u2714</span> MS Tile Color meta: ", b));
        c = /<\s*meta.*name\s*=\s*"\s*msapplication-TileImage\s*"/i;
        c.exec(b) && (A = 1, a += addSuccess("<span class='success-mark'>\u2714</span> MS Tile Image meta: ", b));
        c = /<\s*meta.*name\s*=\s*"\s*twitter:card\s*"/i;
        c.exec(b) && (B = 1, a += addSuccess("<span class='success-mark'>\u2714</span> Twitter Card meta: ", b));
        c = /<\s*meta.*name\s*=\s*"\s*twitter:site\s*"/i;
        c.exec(b) && (C = 1, a += addSuccess("<span class='success-mark'>\u2714</span> Twitter Card Site (Twitter Handle) meta: ", b));
        c = /<\s*meta.*name\s*=\s*"\s*twitter:creator\s*"/i;
        c.exec(b) && (D = 1, a += addSuccess("<span class='success-mark'>\u2714</span> Twitter Card Creator (Twitter Handle) meta: ", b));
        c = /<\s*meta.*name\s*=\s*"\s*twitter:title\s*"/i;
        c.exec(b) && (E = 1, a +=
            addSuccess("<span class='success-mark'>\u2714</span> Twitter Card Title meta: ", b));
        c = /<\s*meta.*name\s*=\s*"\s*twitter:description\s*"/i;
        c.exec(b) && (F = 1, a += addSuccess("<span class='success-mark'>\u2714</span> Twitter Card Description meta: ", b));
        c = /<\s*meta.*name\s*=\s*"\s*twitter:image\s*"/i;
        c.exec(b) && (G = 1, a += addSuccess("<span class='success-mark'>\u2714</span> Twitter Card Image meta: ", b));
        c = /<\s*link.*rel\s*=\s*"\s*canonical\s*"/i;
        c.exec(b) && (H = 1, a += addSuccess("<span class='success-mark'>\u2714</span> Canonical Url: ",
            b));
        c = /<\s*link.*rel\s*=\s*"\s*author\s*"/i;
        c.exec(b) && (I = 1, a += addSuccess("<span class='success-mark'>\u2714</span> Google Author : ", b));
        c = /<\s*link.*rel\s*=\s*"\s*publisher\s*"/i;
        c.exec(b) && (J = 1, a += addSuccess("<span class='success-mark'>\u2714</span> Google Publisher : ", b));
        c = /<\s*link.*rel\s*=\s*"\s*dns-prefetch\s*"/i;
        c.exec(b) && (K = 1, a += addSuccess("<span class='success-mark'>\u2714</span> DNS Prefetch : ", b));
        c = /<\s*link.*rel\s*=\s*"\s*home\s*"/i;
        c.exec(b) && (L = 1, a += addSuccess("<span class='success-mark'>\u2714</span> Home Link : ",
            b));
        c = /<\s*link.*rel\s*=\s*"\s*alternate\s*"/i;
        c.exec(b) && (M = 1, a += addSuccess("<span class='success-mark'>\u2714</span> Alternate Link : ", b));
        c = /<\s*link.*rel\s*=\s*"\s*index\s*"/i;
        c.exec(b) && (N = 1, a += addSuccess("<span class='success-mark'>\u2714</span> Index Link: ", b));
        c = /<\s*link.*rel\s*=\s*"\s*apple-touch-icon\s*"\s*href\s*=\s*".*"/i;
        c.exec(b) && (O = 1, a += addSuccess("<span class='success-mark'>\u2714</span> Apple Touch Icon Flat: ", b));
        c = /<\s*link.*rel\s*=\s*"\s*apple-touch-icon\s*"\s*sizes\s*=\s*"76x76"/i;
        c.exec(b) && (P = 1, a += addSuccess("<span class='success-mark'>\u2714</span> Apple Touch Icon 76x76: ", b));
        c = /<\s*link.*rel\s*=\s*"\s*apple-touch-icon\s*"\s*sizes\s*=\s*"120x120"/i;
        c.exec(b) && (Q = 1, a += addSuccess("<span class='success-mark'>\u2714</span> Apple Touch Icon 120x120: ", b));
        c = /<\s*link.*rel\s*=\s*"\s*apple-touch-icon\s*"\s*sizes\s*=\s*"152x152"/i;
        c.exec(b) && (R = 1, a += addSuccess("<span class='success-mark'>\u2714</span> Apple Touch Icon 152x152: ", b));
        c = /<\s*link.*rel\s*=\s*"\s*apple-touch-startup-image\s*"/i;
        c.exec(b) && (S = 1, a += addSuccess("<span class='success-mark'>\u2714</span> Apple Splash Icon (320x460); ", b));
        c = /<\s*script.*type\s*=\s*"\s*application\/ld\+json\s*"\s*>\s*/i;
        c.exec(b) && (T = 1, a += addSuccess("<span class='success-mark'>\u2714</span> JSON-LD (Structured Data) : ", b));
        c = /<\s*html.*prefix\s*=\s*"\s*og:\s*http:\/\/ogp.me\/ns#\s*".*/i;
        c.exec(b) && (U = 1, a += addSuccess("<span class='success-mark'>\u2714</span> OG HTML Prefix : ", b));
        c = /<\s*meta.*property\s*=\s*"\s*og:title\s*"/i;
        c.exec(b) && (V = 1,
            a += addSuccess("<span class='success-mark'>\u2714</span> OG Title meta (should not be the same as your brand name or site name) : ", b));
        c = /<\s*meta.*property\s*=\s*"\s*og:type\s*"/i;
        c.exec(b) && (W = 1, a += addSuccess("<span class='success-mark'>\u2714</span> OG Type meta : ", b));
        c = /<\s*meta.*property\s*=\s*"\s*og:image\s*"/i;
        c.exec(b) && (X = 1, a += addSuccess("<span class='success-mark'>\u2714</span> OG Image meta : ", b));
        c = /<\s*meta.*property\s*=\s*"\s*og:url\s*"/i;
        c.exec(b) && (Y = 1, a += addSuccess("<span class='success-mark'>\u2714</span> OG Url meta : ",
            b));
        c = /<\s*meta.*property\s*=\s*"\s*og:site_name\s*"/i;
        c.exec(b) && (Z = 1, a += addSuccess("<span class='success-mark'>\u2714</span> OG Site Name meta, your actual site name : ", b));
        c = /<\s*meta.*property\s*=\s*"\s*og:description\s*"/i;
        c.exec(b) && (aa = 1, a += addSuccess("<span class='success-mark'>\u2714</span> OG Description meta : ", b));
        c = /<\s*meta.*property\s*=\s*"\s*article:author\s*"/i;
        c.exec(b) && (ba = 1, a += addSuccess("<span class='success-mark'>\u2714</span> Article Author meta (for fb articles) : ", b));
        c = /<\s*meta.*property\s*=\s*"\s*article:publisher\s*"/i;
        c.exec(b) && (ca = 1, a += addSuccess("<span class='success-mark'>\u2714</span> Article Publisher meta (for fb articles) : ", b));
        c = /<\s*meta.*property\s*=\s*"\s*og:locale\s*"/i;
        c.exec(b) && (da = 1, a += addSuccess("<span class='success-mark'>\u2714</span> OG Locale : ", b));
        c = /<\s*meta.*property\s*=\s*"\s*og:locale:alternate\s*"/i;
        c.exec(b) && (ea = 1, a += addSuccess("<span class='success-mark'>\u2714</span> OG Alternate Locale : ", b))
    }
    d = a;
    a = "";
    //0 == g && (a += addFailure("No HTML Manifest: Very optional, used for offline resource caching that ends in .appcache . Note that changes to your site will NOT be reflected unless you use the manifest file to signal that changes have been made"));
    0 == h && (a += addFailure("Missing itemprop 'name' meta: Structured data used by google to identify your site name."));
    0 == k && (a += addFailure("Missing itemprop 'url' meta: Structured data used by google to identify your site url."));
    0 == l && (a += addFailure("Missing itemprop 'description' meta: Structured data used by google to identify your site url."));
    0 == m && (a += addFailure("Missing itemprop 'image' meta: Structured data used by google to identify your site url."));
    0 == n && (a += addFailure("Missing Meta Author: Attribution is important, you can usually just put your site name down here."));
    0 == p && (a += addFailure("Missing Meta Description: Description is important utilized by search engines to show a quick summation of what your site is about"));
    0 == q && (a += addFailure("Missing Meta Keywords: Not critical, but should have some, but no more than 10-15 keywords, avoid using the site name redundantly here"));
    0 == r && (a += addFailure("Missing Robots Meta: Robots meta tags tell crawlers how to treat pages on your site explicitly, generally stating either to index or not."));
    0 == s && (a += addFailure('Missing Viewport Meta: Having the appropriate viewport meta tag sets the behavior of your site in terms of scale, particularly for mobile devices the following is used: <meta name="viewport" content="width=device-width, initial-scale=1.0">'));
    0 == t && (a += addFailure('No Document Language: Tells the browser the language of the document content, this allows browsers to display your language choice in proper markup, ex. <html lang="en">'));
    0 == u && (a += addFailure('No Apple Mobile Web App Capable: If your site is properly designed (mobilized), use this tag to allow your site to be displayed in a more native UI via Safari on mobile devices, ex. <meta name="apple-mobile-web-app-capable" content="yes">'));
    0 == v && (a += addFailure('No Apple Mobile Web App Status Bar Style: If your site is using the apple-mobile-web-app-capable meta tag, you may optionally use this tag to alter the nav bar theme. ex. <meta name="apple-mobile-web-app-status-bar-style" content="black">'));
    0 == w && (a += addFailure('No http-equiv X-UA-Compatible meta tag: The http-equiv attribute provides an HTTP header for the information/value of the content attribute, generally can be provided with content="IE=edge,chrome=1", forcing older versions of IE to use the latest possible version of IE, and chrome=1 to tell IE to render the page using Google Chrome Frame (if installed). ex. <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">'));
    0 == x && (a += addFailure('Missing HandHeld Friendly: Gives support for Palm & Blackberry devices. Simply add <meta name="HandheldFriendly" content="true">'));
    0 == y && (a += addFailure('Missing Theme Color: For various browsers and OSs to base the surrounding components off of. Such as <meta name="theme-color" content="#ffffff">'));
    0 == z && (a += addFailure('Missing MS Tile Color: Sets tile color for Windows Pinned Sites (8+), such as <meta name="msapplication-TileColor" content="#ffffff">'));
    0 == A && (a += addFailure('Missing MS Tile Image: Sets tile image for Windows Pinned Sites (8+), uses an image of 144x144 pixels and <meta name="msapplication-TileImage" content="images/ms-tile.png">'));
    0 == B && (a += addFailure('No Twitter Card: Sets type of twitter card, such as <meta name="twitter:card" content="summary_large_image">   https://dev.twitter.com/cards/overview'));
    0 == C && (a += addFailure('No Twitter Card Site (Twitter Handle); The twitter @username the card should be attributed to, your twitter handle for your site. Ex. <meta name="twitter:site" content="@flickr" />'));
    0 == D && (a += addFailure('No Twitter Card Creator (Twitter Handle); The twitter @username the card is created by, your twitter handle for whomever created this. Ex. <meta name="twitter:creator" content="@nickbilton" />'));
    0 == E && (a += addFailure('No Twitter Card Title: Sets title of twitter card, such as <meta name="twitter:title" content="Your Site Title"> https://dev.twitter.com/cards/overview. You MUST read and SUBMIT your cards to be functional'));
    0 == F && (a += addFailure('No Twitter Card Descrip: Sets description of twitter card, such as <meta name="twitter:description" content="Your site description"> https://dev.twitter.com/cards/overview. You MUST read and SUBMIT your cards to be functional'));
    0 == G && (a += addFailure("No Twitter Card Image: Sets image of twitter card, such as <meta name=\"twitter:image\" content=\"https://yoursite.com/twimage.png\">. 194x194 if you are using twitter:card 'summary', else use a minimum of 280x150 for twitter:card 'summary_large_image' (looks nicer)  https://dev.twitter.com/cards/overview. You MUST read and SUBMIT your cards to be functional"));
    0 == H && (a += addFailure("Missing Canonical URL (Optional); If content on your site can be reached by more than url use a canonical domain to indicate the preferred url, otherwise search engines may down rank your content as spammy."));
    0 == I && (a += addFailure('Missing Google Author: If you have a google plus page make sure to link to it via <link re="author" href=".../your-gplus-url/posts"/>, make sure to follow with posts.'));
    0 == J && (a += addFailure('Missing Google Publisher: If you have a google plus page make sure to link to it via <link re="publisher" href=".../your-gplus-url/"/>, and do not follow with posts,info,etc.'));
    0 == K && (a += addFailure('No DNS-Prefetch: If you link to content outside of your domain use the <link rel="dns-prefetch" href="EXTERNAL DOMAIN"/> to pre-fetch the dns, this is an effective speedup'));
    0 == L && (a += addFailure("Missing Home Link: Absolute URI to the homepage of your site, useful for navigation and understanding site structure"));
    0 == M && (a += addFailure('No Alternate Link: Optionally a link to some alternate representation or version of the current page. Has a variety of uses, in particular feeds such as <link rel="alternate" type="application/rss+xml" title="RSS" href="https://www.example.com/news.rss"/>'));
    0 == N && (a += addFailure("No Index Link: Optionally a link to a roadmap of your site, useful for navigation"));
    0 == O && (a += addFailure("Missing Apple Touch Icon Flat: Local saved copies of your site on mobile apple devices use a compressed snapshot of your site as a thumbnail if not provided"));
    0 == P && (a += addFailure("Missing Apple Touch Icon 76x76: Local saved copies of your site on mobile apple devices use a compressed snapshot of your site as a thumbnail if not provided"));
    0 == Q && (a += addFailure("Missing Apple Touch Icon 120x120: Local saved copies of your site on mobile apple devices use a compressed snapshot of your site as a thumbnail if not provided"));
    0 == R && (a += addFailure("Missing Apple Touch Icon 152x152: Local saved copies of your site on mobile apple devices use a compressed snapshot of your site as a thumbnail if not provided"));
    0 == S && (a += addFailure('Missing Apple Splash Icon 320x460: Local saved copies of your site on mobile apple devices use a compressed snapshot of your site as a thumbnail if not provided, this is the splash. ex. <link rel="apple-touch-startup-image" href="images/startup.png">'));
    0 == T && (a += addFailure("Missing JSON-LD: This is structured data that is read by google for helping to display your content."));
    0 == U && (a += addFailure('Missing OG Prefix: Sets up the open graph protocol namespace, and makes sure as the standard changes your shit doesn\'t break. Ex. <html prefix="og: http://ogp.me/ns#">'));
    0 == V && (a += addFailure("Missing OG Title: This is structured data that is read by facebook. This should NOT be a brand name or site name, just a relevant title."));
    0 == W && (a += addFailure('Missing OG Type: This is structured data that is read by facebook. Ex. <meta property="og:type" content="article">. Type of \'website\' is another, set the type to what you need'));
    0 == X && (a += addFailure("Missing OG Image: This is structured data that is read by facebook for creating a post image. User either 1200x630 or 600x315 px images."));
    0 == Y && (a += addFailure("Missing OG URL: This is structured data that is read by facebook."));
    0 == Z && (a += addFailure("Missing OG Site Name: This is structured data that is read by facebook. Put your site name here"));
    0 == aa && (a += addFailure("Missing OG Description: This is structured data that is read by facebook."));
    a += addFailure('No Facebook App Id: (Optional) This is structured data that is read by facebook, used for analytics only. ex. <meta property="fb:app_id" content="[FB_APP_ID]">');
    0 == ba && (a += addFailure('No Article Author: (Optional) This is structured data that is read by facebook, used for articles only. ex. <meta property="article:author" content="https://www.facebook.com/fareedzakaria">'));
    0 == ca && (a += addFailure('No Article Publisher: (Optional) This is structured data that is read by facebook, used for articles only. ex. <meta property="article:publisher" content="https://www.facebook.com/cnn">'));
    0 == da && (a += addFailure('No OG Locale: (Optional) This is structured data that is read by facebook. Default is en_US, use as <meta property="og:locale" content="en_US">'));
    0 == ea && (a += addFailure('No OG Locale Alt: (Optional) This is structured data that is read by facebook. Use as <meta property="og:locale:alternate" content="fr_FR">'));
    a = d + "<br/><h2 style='padding:8px'><span id='fail-count'>" + failScore + "</span> Items we did not find.</h2><br/>" + a;
    a += "<br/><br/><h2 style='padding:8px'>Additional Recommendations.</h2><br/><p class='failure-item'>";
    a += "If you make significant changes make sure to have your site recrawled by:<br/>";
    a += "\u2022Google<br/>";
    a += "\u2022Bing<br/>";
    a += "<br/><br/>";
    a += "Include href page links to Facebook, Twitter and Google + among others<br/>";
    a += "<br/><br/>";
    a += "If you have made open graph changes, use <a href='https://developers.facebook.com/tools/debug/' target='_blank' class='embedded-link'>https://developers.facebook.com/tools/debug/</a> to update how facebook & Google + shows your site<br/>";
    a += "If you made twitter card changes, use <a href='https://cards-dev.twitter.com/validator' target='_blank' class='embedded-link'>https://cards-dev.twitter.com/validator</a> to verify and update your site appearance in posts<br/>";
    a += "If you added or changed google JSON-LD data, use <a href='https://developers.google.com/structured-data/testing-tool/' target='_blank' class='embedded-link'>https://developers.google.com/structured-data/testing-tool/</a> to verify the data is good<br/>";
    a += "<br/><br/>";
    a += "Additionally Double check for syntax errors using the W3C Validator (to be taken with a grain of salt)<br/>";
    a += "<br/><br/>";
    a += "Make sure to use Google Analytics, Mixpanel, or another solution to get information to help you further assess your site.<br/>";
    a += "<br/><br/>";
    a += "In your analytics panels be sure to remove spam referral sites, such as get-free-social-traffic.com, floating-share-buttons.com and free-floating-buttons.com. These sites tend to give you false positives in your analytics data, making it hard to differentiate from actual traffic and spam.<br/>";
    a += "<br/><br/>";
    a += "Finally utilize SEO Suggestions from your analytics solution, generally this will involve link building but it can find additional issues as well.<br/>";
    a += "</p><br/><br/>";
    a += "</div>";
    a = generateScore() + a;
    document.getElementById("siteresult").innerHTML = a;
    document.getElementById("loader").className = "";
    document.getElementById("siteresult").style.background = "#fff"
}

function generateScore() {
    return "<div id='score-div' style='padding:8px'><h3 style='color:#000'><a href='" + lastUrl + "' class='embedded-link' target='_blank'>" + lastUrl + "</a></h3><p style='font-size:24px'>scored <span id='score'>" + score + "</span> points</p></div><br/><br/>"
}

function htmlEscape(a) {
    return String(a).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function addSuccess(a, d) {
    score++;
    return "<div class='success-item'><p>" + a + htmlEscape(d) + "</p></div>"
}

function addFailure(a) {
    failScore++;
    return "<div class='failure-item'><p><span class='failure-mark'>\u2718</span> " + htmlEscape(a) + "</p></div>"
}

$.fn.scrollView = function() {
    return this.each(function() {
        $("html, body").animate({
            scrollTop: $(this).offset().top
        }, 450)
    })
};