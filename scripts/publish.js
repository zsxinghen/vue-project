const args = require('minimist')(process.argv.slice(2))
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const currentVersion = require('../package.json').version
const {
  prompt
} = require('enquirer')
const execa = require('execa')

const run = (bin, args, opts = {}) =>
  execa(bin, args, {
    stdio: 'inherit',
    ...opts
  })
const dryRun = (bin, args, opts = {}) =>
  console.log(chalk.blue(`[dryrun] ${bin} ${args.join(' ')}`), opts)

const isDryRun = args.dry
const runIfNotDry = isDryRun ? dryRun : run
const step = msg => console.log(chalk.cyan(msg))

const repository = 'https://github.com/zsxinghen/vue-project.git'
async function main() {
  // 选择推送地址
  const {
    stdout: remoteRepository
  } = await run('git', ['remote', '-v'], {
    stdio: 'pipe'
  })
  // 当项目的远端仓库不是目标仓库时，切换远程仓库
  if (!remoteRepository.includes(repository)) {
    await runIfNotDry('git', ['remote', 'rm', 'origin'])
    await runIfNotDry('git', ['remote', 'add', 'origin', repository])
  }
  //   remote rm origin
  //   git remote add  origin https://github.com/zsxinghen/vue-project.git
  //   git branch -a
  //   git remote -v
  //   git stash
  //   git pull origin master --allow-unrelated-histories
  //   git push --set-upstream origin master

  const {
    stdout: branches
  } = await run('git', ['branch', '-a'], {
    stdio: 'pipe'
  })
  branchesStr = `${branches} \n创建新分支`.replace(/[*]|(\s+)/g, ' ').trim()
  step('\n推送分支确认...')
  let {
    remoteBranch
  } = await prompt({
    type: 'select',
    name: 'remoteBranch',
    message: 'Select release type',
    choices: branchesStr.split(' ')
  })

  if (remoteBranch == '创建新分支') {
    step('\n创建新分支...')
    const {
      branchName
    } = await prompt({
      type: 'input',
      name: 'branchName',
      message: '请输入分支名称'
    })
    await runIfNotDry('git', ['branch', branchName])
    await runIfNotDry('git', ['checkout', branchName])
    remoteBranch = branchName
  } else {
    step('\n拉取远程分支代码...')
    await runIfNotDry('git', ['stash'])
    await runIfNotDry('git', [
      'pull',
      'origin',
      remoteBranch,
      '--allow-unrelated-histories'
    ])
  }
  // 输入更新的内容
  step('\n输入更改的内容...')
  const {
    commitText
  } = await prompt({
    type: 'input',
    name: 'commitText',
    message: '请输入你的更新的内容'
  })

  const {
    stdout
  } = await run('git', ['diff'], {
    stdio: 'pipe'
  })
  if (stdout) {
    step('\n提交更改的内容...')
    await runIfNotDry('git', ['add', '-A'])
    await runIfNotDry('git', ['commit', '-m', `更新内容：${commitText}}`])
  } else {
    console.log('No changes to commit.')
  }
  // 推送到远端分支
  await runIfNotDry('git', [
    'push',
    '--set-upstream',
    'origin',
    `${remoteBranch}`
  ])
}

main().catch(err => {
  console.error(err)
})