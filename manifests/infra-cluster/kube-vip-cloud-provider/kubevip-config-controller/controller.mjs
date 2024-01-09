import ip from 'ip';

const reconcile = async () => {
    const addrInfo = JSON.parse((await $`ip --json a show dev br0`).stdout)[0].addr_info
    console.log(addrInfo)
    const v6CIDR = addrInfo.filter((addr) => addr.family === "inet6" && addr.scope === "global")[0]
    console.log(v6CIDR)

    const buf = ip.toBuffer(v6CIDR.local);
    console.log(buf)
    buf[56 / 8] = 0xff;
    for (let i = 64 / 8; i < 128 / 8; i++) {
        buf[i] = 0x00;
    }

    const globalCIDR = ip.toString(buf) + "/64";
    console.log(globalCIDR);

    const patch = JSON.stringify({
        data: {
            "cidr-global": globalCIDR,
        },
    })

    await $`kubectl patch configmap/kubevip -n kube-system --type merge --patch-file ${patch}`;
}

const processor = () => {
    reconcile().catch((err) => {
        console.error(err);
    });
}

processor();
setInterval(processor, 60 * 1000);
