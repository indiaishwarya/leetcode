/**
 * @param {number} numberOfUsers
 * @param {string[][]} events
 * @return {number[]}
 */
var countMentions = function(numberOfUsers, events) {
    const n = numberOfUsers;
    const parsed = events.map(e => {
        const type = e[0];
        const t = Number(e[1]);
        const arg = e[2];
        return { type, t, arg };
    });

    parsed.sort((a, b) => {
        if (a.t !== b.t) return a.t - b.t;
        const wa = a.type === "OFFLINE" ? 0 : 1;
        const wb = b.type === "OFFLINE" ? 0 : 1;
        return wa - wb;
    });

    const mentions = new Array(n).fill(0);
    const online = new Array(n).fill(true);
    const offlineUntil = new Array(n).fill(0);

    // backEvents: [time, userId], sorted by time because we process OFFLINE in sorted order
    const backEvents = [];
    let backIdx = 0;

    const processBackOnline = (currentTime) => {
        while (backIdx < backEvents.length && backEvents[backIdx][0] <= currentTime) {
            const [time, uid] = backEvents[backIdx];
            if (!online[uid] && offlineUntil[uid] <= time) {
                online[uid] = true;
            }
            backIdx++;
        }
    };

    for (const ev of parsed) {
        const t = ev.t;

        processBackOnline(t);

        if (ev.type === "OFFLINE") {
            const id = Number(ev.arg);
            if (online[id]) {
                online[id] = false;
            }
            const backTime = t + 60;
            offlineUntil[id] = backTime;
            backEvents.push([backTime, id]);
        } else if (ev.type === "MESSAGE") {
            const msg = ev.arg.trim();
            if (msg.length === 0) continue;
            const tokens = msg.split(/\s+/);

            for (const tk of tokens) {
                if (tk === "ALL") {
                    for (let u = 0; u < n; u++) {
                        mentions[u]++;
                    }
                } else if (tk === "HERE") {
                    for (let u = 0; u < n; u++) {
                        if (online[u]) mentions[u]++;
                    }
                } else if (tk.startsWith("id")) {
                    const id = Number(tk.slice(2));
                    if (id >= 0 && id < n) {
                        mentions[id]++;
                    }
                }
            }
        }
    }
    return mentions;
};
