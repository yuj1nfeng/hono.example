import fs from 'node:fs/promises';
import path from 'node:path';

const projects = (await fs.readdir('packages', { withFileTypes: true })).map(p => path.join(p.parentPath, p.name));
for (const dir of projects) {
    const result = await Bun.$`cd ${dir} && bun publish`.text();
    console.log(result);

    const packageJsonPath = `${dir}/package.json`;
    const packageJson = await Bun.file(packageJsonPath).json();
    const [major, minor, patch] = packageJson.version.split('.').map(Number);
    const newVersion = `${major}.${minor}.${patch + 1}`;
    // 更新并写回文件
    packageJson.version = newVersion;
    await Bun.write(packageJsonPath, JSON.stringify(packageJson, null, 4));
    console.log(`版本号已自动递增为: ${newVersion}`);
}
