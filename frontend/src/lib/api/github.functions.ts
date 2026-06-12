import { createServerFn } from "@tanstack/react-start";

export interface GitHubContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface GitHubRepoSummary {
  name: string;
  htmlUrl: string;
  description: string | null;
  language: string | null;
  stars: number;
  homepage: string | null;
}

export interface GitHubProfileData {
  username: string;
  name: string;
  avatarUrl: string;
  profileUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalContributions: number;
  contributions: GitHubContributionDay[];
  repos: GitHubRepoSummary[];
}

const GITHUB_HEADERS = {
  Accept: "application/vnd.github+json",
  "User-Agent": "Sasi-Portfolio",
};

// 24-hour in-memory cache to prevent hitting GitHub API rate limits
let cachedProfileData: GitHubProfileData | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours in milliseconds

export const getGitHubProfile = createServerFn({ method: "GET" }).handler(
  async (): Promise<GitHubProfileData> => {
    const now = Date.now();
    // Return statically cached data if it's less than 24 hours old
    if (cachedProfileData && now - lastFetchTime < CACHE_DURATION) {
      return cachedProfileData;
    }

    const username = "Sasi3011";

    const [userRes, contribRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: GITHUB_HEADERS,
      }),
      fetch(
        `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      ),
      fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=4`,
        {
          headers: GITHUB_HEADERS,
        },
      ),
    ]);

    if (!userRes.ok) {
      throw new Error(`GitHub user fetch failed (${userRes.status})`);
    }
    if (!contribRes.ok) {
      throw new Error(
        `GitHub contributions fetch failed (${contribRes.status})`,
      );
    }
    if (!reposRes.ok) {
      throw new Error(`GitHub repos fetch failed (${reposRes.status})`);
    }

    const user = (await userRes.json()) as {
      login: string;
      name: string | null;
      avatar_url: string;
      html_url: string;
      public_repos: number;
      followers: number;
      following: number;
    };

    const contribData = (await contribRes.json()) as {
      total: { lastYear?: number };
      contributions: GitHubContributionDay[];
    };

    const repos = (await reposRes.json()) as Array<{
      name: string;
      html_url: string;
      description: string | null;
      language: string | null;
      stargazers_count: number;
      homepage: string | null;
    }>;

    const newData: GitHubProfileData = {
      username: user.login,
      name: user.name ?? user.login,
      avatarUrl: user.avatar_url,
      profileUrl: user.html_url,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      totalContributions: contribData.total.lastYear ?? 0,
      contributions: contribData.contributions,
      repos: repos.map((repo) => ({
        name: repo.name,
        htmlUrl: repo.html_url,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        homepage: repo.homepage,
      })),
    };

    // Update cache
    cachedProfileData = newData;
    lastFetchTime = Date.now();

    return newData;
  },
);
