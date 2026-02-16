#!/usr/bin/env node
import { intro, outro, spinner } from '@clack/prompts';
import { checkIsGitRepo, getStagedDiff } from './core/git';
import { handleError } from './utils/error-handler';
import pc from 'picocolors';

async function main() {
  intro(pc.bgCyan(pc.black(' chrono-eis-versiegelung ')));

  try {
    await checkIsGitRepo();
    
    const s = spinner();
    s.start('Membaca perubahan kodemu...');
    const diff = await getStagedDiff();
    s.stop('Berhasil membaca diff!');

    console.log(pc.dim(diff)); 
    
    outro(pc.green('Pondasi minggu pertama aman!'));
  } catch (error) {
    handleError(error);
  }
}

main();