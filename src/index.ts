#!/usr/bin/env node
import { intro, outro, spinner, confirm, isCancel } from "@clack/prompts";
import { checkIsGitRepo, getStagedDiff, exectCommit } from "./core/git.js";
import { handleError } from "./utils/error-handler.js";
import { generateCommitMessage } from "./core/ai.js";
import pc from "picocolors";

async function main() {
  intro(pc.bgCyan(pc.black(" chrono-eis-versiegelung ")));

  try {
    await checkIsGitRepo();

    const s = spinner();
    
    s.start('reading your change...');
    const diff = await getStagedDiff();
    s.stop('succesfull reading the change!');

    s.start('AI still thinking...');
    const aiMessage = await generateCommitMessage(diff);
    s.stop('AI already have the idea!');

    console.log(`\n${pc.dim(' commit suggestion:')} "${pc.cyan(aiMessage)}"`);

    const isConfirm = await confirm({
      message: 'do you want to use this message?',
      initialValue: true,
    });

    if (isCancel(isConfirm) || !isConfirm) {
      outro(pc.yellow('Commit has been canceled by user.'));
      return;
    }

    const sCommit = spinner();
    sCommit.start('doing automatic comit...');
    
    await exectCommit(aiMessage); 
    
    sCommit.stop(pc.green('✔ commit success!'));
    outro(pc.bgGreen(pc.black(" FINISH ")));

  } catch (error) {
    handleError(error);
  }
}

main();