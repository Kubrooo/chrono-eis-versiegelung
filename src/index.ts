import { intro, outro, spinner } from "@clack/prompts";
import { checkIsGitRepo, getStagedDiff } from "./core/git";
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

    console.log(`\nSaran commit: "${pc.cyan(aiMessage)}"`);;
  } catch (error) {
    handleError(error);
  }
}

main();
