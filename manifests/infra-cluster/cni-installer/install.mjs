const getArch = async () => {
    const arch = (await $`uname -m`).stdout.trim();

    switch (arch) {
    case "x86_64":
        return "amd64";
    case "aarch64":
        return "arm64";
    }

    throw "Unknown architecture: " + arch;
}

const getLatestTag = async () => {
    const latestRelease = await fetch("https://api.github.com/repos/containernetworking/plugins/releases/latest")
        .then(res => res.json());

    return latestRelease.tag_name;
}

(async () => {
    const arch = await getArch();
    const latestTag = await getLatestTag();

    await $`apt update && apt-get install -y curl`;
    await $`cd /tmp && curl -LO https://github.com/containernetworking/plugins/releases/download/${latestTag}/cni-plugins-linux-${arch}-${latestTag}.tgz`;
    await $`cd /opt/cni/bin && tar xf /tmp/cni-plugins-linux-${arch}-${latestTag}.tgz`;
})().catch(err => {
    throw err;
})
