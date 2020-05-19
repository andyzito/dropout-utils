window.DropoutUtilities = {};
DOU = window.DropoutUtilities;

DOU.initAttempts = 0;

DOU.getCookie = function(name) {
    return (name = (document.cookie + ';').match(new RegExp(name + '=.*;'))) && name[0].split(/=|;/)[1];
}

DOU.loadPlayer = function() {
    if (typeof window.VHX !== 'undefined' && typeof window.VHX.Player !== 'undefined') {
        window.VHXPlayer = new window.VHX.Player('watch-embed');
        return true;
    } else {
        return false;
    }
}

DOU.initializeA = function() {
    if (DOU.initAttempts > 100) {
        return false;
    }

    if( DOU.loadPlayer() ) {
        setTimeout(DOU.initializeB, 1000);
    } else {
        console.log("[DOUtils] Player not loaded, reinitializing...")
        setTimeout(DOU.initializeA, 1000);
    }

    DOU.initAttempts++;
}

DOU.initializeB = function() {
    if (window.VHXPlayer.currentTime() > 0) {
        console.log("[DOUtils] Initialized successfully");
        DOU.doTheStuff();
    } else {
        console.log("[DOUtils] Player loaded but not ready, reinitializing...");
        setTimeout(DOU.initializeA, 1000);
    }
}

DOU.doTheStuff = function() {
    DOU.initializeTime();
    // and other things when/if they exist...
}

DOU.storeTime = function() {
    let video = window.location.pathname.split('/').pop();

    document.cookie = "time-" + video + "=" + window.VHXPlayer.currentTime() + "; path=/; expires=Thu, 18 Dec 2079 12:00:00 UTC";
    setTimeout(DOU.storeTime, 5000);
}

DOU.setVideoTime = function() {
    let video = window.location.pathname.split('/').pop();

    var tstored = Number(DOU.getCookie('time-' + video));
    if (tstored && tstored > 10) {
        console.log("[DOUtils] Restoring video time to: " + tstored);
        window.VHXPlayer.currentTime(tstored);
    }
}

DOU.initializeTime = function() {
    DOU.setVideoTime();
    setTimeout(DOU.storeTime, 10000);
}

DOU.initializeA()