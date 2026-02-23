#!/usr/bin/env node
import { intro, outro, spinner, select, text, isCancel } from "@clack/prompts";
import { checkIsGitRepo, getStagedDiff, exectCommit } from "./core/git.js";
import { handleError } from "./utils/error-handler.js";
import { generateCommitMessage } from "./core/ai.js";
import pc from "picocolors";

async function main() {
  intro(pc.bgCyan(pc.black(" chrono-eis-versiegelung ")));

  try {
    await checkIsGitRepo();

    const s = spinner();
    
    s.start('Reading your changes...');
    const diff = await getStagedDiff();
    s.stop('Diff retrieved successfully!');

    s.start('AI is thinking of a commit message...');
    const aiMessage = await generateCommitMessage(diff);
    s.stop('AI suggestion ready!');

    console.log(`\n${pc.dim('Suggested message:')} "${pc.cyan(aiMessage)}"`);

    const action = await select({
      message: 'What would you like to do?',
      options: [
        { value: 'yes', label: 'Use as is', hint: 'Commit immediately' },
        { value: 'edit', label: 'Edit message', hint: 'Modify suggestion manually' },
        { value: 'no', label: 'Cancel', hint: 'Abort commit' },
      ],
    });

    if (isCancel(action) || action === 'no') {
      outro(pc.yellow('Commit aborted.'));
      return;
    }

    let finalMessage = aiMessage;

    if (action === 'edit') {
      const edited = await text({
        message: 'Edit your commit message:',
        placeholder: aiMessage,
        initialValue: aiMessage,
        validate(value) {
          if (value.length === 0) return `Message cannot be empty!`;
        },
      });

      if (isCancel(edited)) {
        outro(pc.yellow('Editing aborted.'));
        return;
      }
      finalMessage = edited as string;
    }

    const sCommit = spinner();
    sCommit.start('Executing commit...');
    await exectCommit(finalMessage); 
    sCommit.stop(pc.green('✔ Commit successful!'));
    
    outro(pc.bgGreen(pc.black(" DONE ")));

  } catch (error) {
    handleError(error);
  }
}

main();