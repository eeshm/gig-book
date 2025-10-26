module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation
        "style", // Formatting, missing semi colons, etc
        "refactor", // Code restructuring
        "test", // Adding tests
        "chore", // Maintenance
        "perf", // Performance improvements
        "ci", // CI related changes
        "build", // Build system changes
        "revert", // Revert a previous commit
      ],
    ],
  },
};
