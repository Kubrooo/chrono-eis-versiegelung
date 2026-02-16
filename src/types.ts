export interface Config {
  apiKey: string;
  model: string;
}

export interface CommitResult {
  title: string;
  description?: string;
}