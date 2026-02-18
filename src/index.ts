import { intro, outro, spinner, confirm, isCancel } from "@clack/prompts";
import { checkIsGitRepo, getStagedDiff, exectCommit } from "./core/git";
import { handleError } from "./utils/error-handler";
import { generateCommitMessage } from "./core/ai";
import pc from "picocolors";

async function main() {
  intro(pc.bgCyan(pc.black(" chrono-eis-versiegelung ")));

  try {
    await checkIsGitRepo();

    const s = spinner();
    
    s.start('Membaca perubahan kodemu...');
    const diff = await getStagedDiff();
    s.stop('Berhasil membaca diff!');

    s.start('AI sedang memikirkan pesan commit yang pas...');
    const aiMessage = await generateCommitMessage(diff);
    s.stop('AI sudah punya ide!');

    console.log(`\n${pc.dim('Saran commit:')} "${pc.cyan(aiMessage)}"`);

    const isConfirm = await confirm({
      message: 'Apakah kamu ingin menggunakan pesan commit ini?',
      initialValue: true,
    });

    if (isCancel(isConfirm) || !isConfirm) {
      outro(pc.yellow('Commit dibatalkan oleh user.'));
      return;
    }

    const sCommit = spinner();
    sCommit.start('Sedang melakukan commit otomatis...');
    
    await exectCommit(aiMessage); 
    
    sCommit.stop(pc.green('✔ Berhasil commit!'));
    outro(pc.bgGreen(pc.black(" SELESAI ")));

  } catch (error) {
    handleError(error);
  }
}

main();